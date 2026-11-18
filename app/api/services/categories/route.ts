import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, name, slug, parent_id, sort_order, is_active FROM service_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );

    // Also fetch all active services with their slugs and category/subcategory links
    const [services]: any = await pool.query(
      'SELECT id, title, slug, category_id, subcategory_id FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );

    const mainCategories: any[] = [];
    const subMap: Record<number, any[]> = {};

    for (const r of rows) {
      if (r.parent_id) {
        if (!subMap[r.parent_id]) subMap[r.parent_id] = [];
        // Find matching service for this subcategory
        const matchedService = services.find((s: any) => s.subcategory_id === r.id);
        subMap[r.parent_id].push({
          ...r,
          serviceSlug: matchedService ? matchedService.slug : null,
          serviceTitle: matchedService ? matchedService.title : null,
          directUrl: matchedService ? `/services/${matchedService.slug}` : `/services?category=${encodeURIComponent(r.slug)}&subcategory=${encodeURIComponent(r.slug)}`,
        });
      } else {
        const matchedService = services.find((s: any) => s.category_id === r.id && !s.subcategory_id);
        mainCategories.push({
          ...r,
          serviceSlug: matchedService ? matchedService.slug : null,
          serviceTitle: matchedService ? matchedService.title : null,
          directUrl: matchedService ? `/services/${matchedService.slug}` : `/services?category=${encodeURIComponent(r.name)}`,
          subcategories: [],
        });
      }
    }

    for (const main of mainCategories) {
      main.subcategories = subMap[main.id] || [];
    }

    return NextResponse.json({
      categories: mainCategories,
      all: rows,
      services: services,
    });
  } catch (error) {
    console.error('API service categories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



