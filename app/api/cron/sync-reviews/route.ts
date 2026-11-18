export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { syncGoogleReviewsFromSerpApi } from '@/lib/googleReviewsActions';

// Secret cron key to prevent unauthorized access
const CRON_SECRET = process.env.CRON_SECRET || 'newleafskills_cron_secret_key_2026';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key') || req.headers.get('x-cron-key');

    if (key !== CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized: Invalid cron key' }, { status: 401 });
    }

    console.log('[Cron Job] Starting automated Google reviews sync...');
    const result = await syncGoogleReviewsFromSerpApi();

    if (!result.success) {
      console.error('[Cron Job Error]:', result.error);
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    console.log('[Cron Job Success]:', result.message);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (error: any) {
    console.error('[Cron Job Exception]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
