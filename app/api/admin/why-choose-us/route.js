import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [items] = await pool.query(
      'SELECT id, title, subtitle, eyebrow, image, experience_years, sort_order, is_active FROM why_choose_us ORDER BY sort_order ASC, id DESC'
    );
    return NextResponse.json({ items, count: items.length }, { status: 200 });
  } catch (error) {
    console.error('Fetch Admin Why Choose Us Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
