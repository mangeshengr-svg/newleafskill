import pool from '@/lib/db';
import { getGoogleReviewsSettings } from '@/lib/googleReviewsActions';
import GoogleReviewsClientView from '@/components/admin/GoogleReviewsClientView';
import { GoogleReview } from '@/types/googleReview';

export const instant = false;

export default async function AdminGoogleReviewsPage() {
  let reviews: GoogleReview[] = [];
  let settings = { display_mode: 'all' as 'limited' | 'all', display_count: 10 };

  try {
    const [rows]: any = await pool.query('SELECT * FROM google_reviews ORDER BY id DESC');
    reviews = (rows || []) as GoogleReview[];
    settings = await getGoogleReviewsSettings();
  } catch (error) {
    console.error('Failed to fetch reviews for admin:', error);
  }

  return (
    <GoogleReviewsClientView
      initialReviews={reviews}
      settings={settings}
    />
  );
}
