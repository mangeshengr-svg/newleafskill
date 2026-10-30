import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // MySQL se raw SQL query ke zariye users fetch karna
    // (Password column ko select nahi karenge security ke liye)
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM admins ORDER BY id DESC'
    );

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Fetch Users Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}