export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getGoogleReviewsSettings } from '@/lib/googleReviewsActions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10', 10)));
    const offset = (page - 1) * limit;

    const settings = await getGoogleReviewsSettings();

    // Total active count check
    const [countRows]: any = await pool.query(
      'SELECT COUNT(*) as total FROM google_reviews WHERE is_active = 1'
    );
    let totalCount = countRows[0]?.total || 0;

    // If admin set limited display mode, cap the total available reviews
    if (settings.display_mode === 'limited' && settings.display_count > 0) {
      totalCount = Math.min(totalCount, settings.display_count);
    }

    if (offset >= totalCount) {
      return NextResponse.json({
        reviews: [],
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: false,
      });
    }

    // Actual fetch limit
    const actualLimit = Math.min(limit, totalCount - offset);

    const [rows]: any = await pool.query(
      'SELECT * FROM google_reviews WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?',
      [actualLimit, offset]
    );

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      reviews: rows,
      total: totalCount,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (error: any) {
    console.error('Error fetching reviews API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}
