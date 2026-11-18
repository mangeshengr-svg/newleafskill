import { NextResponse } from 'next/server';
import { syncGoogleReviewsFromSerpApi } from '@/lib/googleReviewsActions';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { apiKey, placeId } = body;
    const result = await syncGoogleReviewsFromSerpApi(apiKey, placeId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
