import { NextRequest, NextResponse } from 'next/server';
import { syncGoogleReviewsFromSerpApi } from '@/lib/googleReviewsActions';

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  try {
    if (!CRON_SECRET) {
      console.error('CRON_SECRET is not configured in the environment.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

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
