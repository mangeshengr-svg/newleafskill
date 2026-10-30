import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [services] = await pool.query(
      'SELECT id, num, title, slug, category, tag, is_active, sort_order FROM services ORDER BY sort_order ASC, id ASC'
    );
    return NextResponse.json({ services, count: services.length }, { status: 200 });
  } catch (error) {
    console.error('Fetch Admin Services Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
