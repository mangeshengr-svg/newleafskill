import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [projects] = await pool.query(
      'SELECT id, title, category, tag, stitches, fabric, machine, sort_order, is_active FROM our_work ORDER BY sort_order ASC, id ASC'
    );
    return NextResponse.json({ projects, count: projects.length }, { status: 200 });
  } catch (error) {
    console.error('Fetch Admin Work Projects Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
