import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [blogs] = await pool.query(
      'SELECT id, title, category, date, sort_order, is_active FROM blogs ORDER BY sort_order ASC, id ASC'
    );
    return NextResponse.json({ blogs, count: blogs.length }, { status: 200 });
  } catch (error) {
    console.error('Fetch Admin Blogs Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
