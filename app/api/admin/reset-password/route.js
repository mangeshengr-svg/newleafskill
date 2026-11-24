import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// 1. Password update by logged-in admin (Settings / Profile)
export async function PUT(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment.');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid or expired session' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Fetch admin details
    const [admins] = await pool.query('SELECT * FROM admins WHERE id = ?', [decoded.id]);

    if (admins.length === 0) {
      return NextResponse.json({ message: 'Admin account not found' }, { status: 404 });
    }

    const admin = admins[0];

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await pool.query('UPDATE admins SET password = ? WHERE id = ?', [hashedNewPassword, admin.id]);

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Change Password Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Reset by Authenticated Admin for a User in Users Management
export async function POST(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment.');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid or expired session' }, { status: 401 });
    }

    const { email, userId, newPassword } = await request.json();

    if ((!email && !userId) || !newPassword) {
      return NextResponse.json(
        { message: 'Email/User ID and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find admin by id or email
    let admins;
    if (userId) {
      [admins] = await pool.query('SELECT * FROM admins WHERE id = ?', [userId]);
    } else {
      [admins] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    }

    if (!admins || admins.length === 0) {
      return NextResponse.json({ message: 'Admin account not found' }, { status: 404 });
    }

    const targetAdmin = admins[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query('UPDATE admins SET password = ? WHERE id = ?', [
      hashedPassword,
      targetAdmin.id,
    ]);

    return NextResponse.json(
      {
        message: `Password has been reset successfully for ${targetAdmin.email}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

