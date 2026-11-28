import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_ATTEMPTS = 5;
const LOCK_TIME_HOURS = 24;

export async function POST(request) {
  try {
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment.');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // 1. Database se admin ko find karein
    const [admins] = await pool.query(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (admins.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const admin = admins[0];

    // 2. Check if account is currently locked
    if (admin.locked_until) {
      const lockExpiry = new Date(admin.locked_until);
      const currentTime = new Date();

      if (currentTime < lockExpiry) {
        const remainingMs = lockExpiry.getTime() - currentTime.getTime();
        const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
        return NextResponse.json(
          {
            message: `Account is locked due to too many failed login attempts. Try again in ${remainingHours} hours.`,
          },
          { status: 423 } // 423 Locked
        );
      } else {
        // Lock period has expired; reset lock
        await pool.query(
          'UPDATE admins SET failed_attempts = 0, locked_until = NULL WHERE id = ?',
          [admin.id]
        );
        admin.failed_attempts = 0;
        admin.locked_until = null;
      }
    }

    // 3. Password match karein
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      const currentAttempts = (admin.failed_attempts || 0) + 1;

      if (currentAttempts >= MAX_ATTEMPTS) {
        // Lock the account for 24 hours
        const lockExpiryDate = new Date(Date.now() + LOCK_TIME_HOURS * 60 * 60 * 1000);
        await pool.query(
          'UPDATE admins SET failed_attempts = ?, locked_until = ? WHERE id = ?',
          [currentAttempts, lockExpiryDate, admin.id]
        );

        return NextResponse.json(
          {
            message: `Maximum incorrect attempts reached. Your account has been locked for 24 hours.`,
          },
          { status: 423 }
        );
      } else {
        // Increment attempts count
        await pool.query(
          'UPDATE admins SET failed_attempts = ? WHERE id = ?',
          [currentAttempts, admin.id]
        );

        const remaining = MAX_ATTEMPTS - currentAttempts;
        return NextResponse.json(
          {
            message: `Invalid credentials. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before account is locked.`,
          },
          { status: 401 }
        );
      }
    }

    // 4. Successful login: Reset failed attempts & lock status
    await pool.query(
      'UPDATE admins SET failed_attempts = 0, locked_until = NULL WHERE id = ?',
      [admin.id]
    );

    // 5. JWT Token generate karein
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Response banayein aur Cookie set karein
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
