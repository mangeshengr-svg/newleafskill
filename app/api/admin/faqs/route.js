import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [items] = await pool.query(
      'SELECT id, question, answer, category, page_location, sort_order, is_active FROM faqs ORDER BY sort_order ASC, id DESC'
    );
    return NextResponse.json({ items, count: items.length }, { status: 200 });
  } catch (error) {
    console.error('Fetch Admin FAQs Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
