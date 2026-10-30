import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // 1. Check karein ki email pehle se exist toh nahi karta
    const [existingAdmin] = await pool.query(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    if (existingAdmin.length > 0) {
      return NextResponse.json({ message: 'Admin with this email already exists' }, { status: 400 });
    }

    // 2. Password ko hash karein
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Database me naya admin insert karein
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