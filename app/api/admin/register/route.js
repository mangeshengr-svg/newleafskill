import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    // Check if any admin already exists
    const [existingAdmins] = await pool.query('SELECT id FROM admins LIMIT 1');

    // If an admin exists, only an authenticated existing admin can register new accounts
    if (existingAdmins.length > 0) {
      const token = request.cookies.get('admin_token')?.value;
      if (!token) {
        return NextResponse.json(
          { message: 'Registration is restricted. Please login as an administrator.' },
          { status: 403 }
        );
      }

      if (!JWT_SECRET) {
        console.error('JWT_SECRET is missing in environment.');
        return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json(
          { message: 'Invalid or expired session. Please log in.' },
          { status: 401 }
        );
      }
    }

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // 1. Check if email already exists
    const [existingAdmin] = await pool.query(
      'SELECT id FROM admins WHERE email = ?',
      [email]
    );

    if (existingAdmin.length > 0) {
      return NextResponse.json({ message: 'Admin with this email already exists' }, { status: 400 });
    }

    // 2. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert new admin
    await pool.query(
      'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}