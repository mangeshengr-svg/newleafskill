import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, name, slug, parent_id, sort_order, is_active FROM service_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );

    const mainCategories: any[] = [];
    const subMap: Record<number, any[]> = {};

    for (const r of rows) {
      if (r.parent_id) {
        if (!subMap[r.parent_id]) subMap[r.parent_id] = [];
        subMap[r.parent_id].push(r);
      } else {
        mainCategories.push({ ...r, subcategories: [] });
      }
    }

    for (const main of mainCategories) {
      main.subcategories = subMap[main.id] || [];
    }

    return NextResponse.json({
      categories: mainCategories,
      all: rows,
    });
  } catch (error) {
    console.error('API service categories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

