'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { GoogleReview } from '@/types/googleReview';

export interface GoogleReviewsSettings {
  display_mode: 'limited' | 'all';
  display_count: number;
}

// 0. Get Display Settings for Frontend
export async function getGoogleReviewsSettings(): Promise<GoogleReviewsSettings> {
  try {
    const [rows]: any = await pool.query('SELECT display_mode, display_count FROM google_reviews_settings WHERE id = 1');
    if (rows && rows.length > 0) {
      return {
        display_mode: rows[0].display_mode || 'all',
        display_count: Number(rows[0].display_count) || 10,
      };
    }
  } catch (error) {
    console.error('Failed to fetch google reviews settings:', error);
  }
  return { display_mode: 'all', display_count: 10 };
}

// 0. Update Display Settings from Admin
export async function updateGoogleReviewsSettings(display_mode: 'limited' | 'all', display_count: number = 10) {
  try {
    await pool.query(
      `INSERT INTO google_reviews_settings (id, display_mode, display_count) 
       VALUES (1, ?, ?) 
       ON DUPLICATE KEY UPDATE display_mode = VALUES(display_mode), display_count = VALUES(display_count)`,
      [display_mode, display_count]
    );
    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating google reviews settings:', error);
    return { success: false, error: error.message };
  }
}

// 1. Fetch active Google reviews for public pages based on display setting
export async function getActiveGoogleReviews(limit: number = 10, offset: number = 0): Promise<GoogleReview[]> {
  try {
    const settings = await getGoogleReviewsSettings();
    let effectiveLimit = limit;
    
    // Check total permitted by settings if limited mode
    if (settings.display_mode === 'limited' && settings.display_count > 0) {
      if (offset >= settings.display_count) {
        return [];
      }
      effectiveLimit = Math.min(limit, settings.display_count - offset);
    }

    const query = 'SELECT * FROM google_reviews WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?';
    const [rows]: any = await pool.query(query, [effectiveLimit, offset]);
    return rows as GoogleReview[];
  } catch (error) {
    console.error('Failed to fetch active google reviews:', error);
    return [];
  }
}

// 1.1 Fetch paginated active reviews on client demand
export async function fetchPaginatedGoogleReviews(page: number = 1, pageSize: number = 10) {
  try {
    const safePage = Math.max(1, page);
    const safePageSize = Math.max(1, Math.min(50, pageSize));
    const offset = (safePage - 1) * safePageSize;

    const settings = await getGoogleReviewsSettings();
    const [countRows]: any = await pool.query(
      'SELECT COUNT(*) as total FROM google_reviews WHERE is_active = 1'
    );
    let total = countRows[0]?.total || 0;

    if (settings.display_mode === 'limited' && settings.display_count > 0) {
      total = Math.min(total, settings.display_count);
    }

    if (offset >= total) {
      return {
        reviews: [],
        total,
        page: safePage,
        pageSize: safePageSize,
        totalPages: Math.ceil(total / safePageSize),
        hasMore: false,
      };
    }

    const effectiveLimit = Math.min(safePageSize, total - offset);
    const [rows]: any = await pool.query(
      'SELECT * FROM google_reviews WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?',
      [effectiveLimit, offset]
    );

    const totalPages = Math.ceil(total / safePageSize);

    return {
      reviews: rows as GoogleReview[],
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages,
      hasMore: safePage < totalPages,
    };
  } catch (error: any) {
    console.error('Error fetching paginated google reviews:', error);
    return {
      reviews: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      hasMore: false,
      error: error.message,
    };
  }
}

// 2. Fetch all Google reviews for Admin
export async function getAllGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM google_reviews ORDER BY sort_order ASC, id DESC'
    );
    return rows as GoogleReview[];
  } catch (error) {
    console.error('Failed to fetch all google reviews for admin:', error);
    return [];
  }
}

// 3. Toggle review status (active / inactive)
export async function toggleGoogleReviewStatus(id: number, currentStatus: number) {
  try {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await pool.query('UPDATE google_reviews SET is_active = ? WHERE id = ?', [newStatus, id]);
    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true, newStatus };
  } catch (error: any) {
    console.error('Error toggling review status:', error);
    return { success: false, error: error.message };
  }
}

// 4. Delete review
export async function deleteGoogleReview(id: number) {
  try {
    await pool.query('DELETE FROM google_reviews WHERE id = ?', [id]);
    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }
}

// 5. Add / Create Manual Review
export async function addGoogleReview(formData: {
  author_name: string;
  author_photo_url?: string;
  rating: number;
  relative_time?: string;
  review_text: string;
  is_active?: number;
  sort_order?: number;
}) {
  try {
    const [result]: any = await pool.query(
      `INSERT INTO google_reviews 
      (author_name, author_photo_url, rating, relative_time, review_text, is_active, sort_order) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        formData.author_name,
        formData.author_photo_url || null,
        formData.rating || 5,
        formData.relative_time || 'Recent',
        formData.review_text,
        formData.is_active ?? 1,
        formData.sort_order ?? 0,
      ]
    );

    revalidatePath('/');
    revalidatePath('/admin/reviews');
    return { success: true, id: result.insertId };
  } catch (error: any) {
    console.error('Error adding google review:', error);
    return { success: false, error: error.message };
  }
}

// 6. Sync Google reviews via SerpAPI with automatic pagination to fetch ALL reviews
export async function syncGoogleReviewsFromSerpApi(apiKeyOverride?: string, placeIdOverride?: string) {
  const serpApiKey = apiKeyOverride || process.env.SERPAPI_KEY;
  const placeId = placeIdOverride || process.env.GOOGLE_PLACE_ID;

  if (!serpApiKey) {
    return { success: false, error: 'SERPAPI_KEY is not defined. Please add it to your .env.local file or provide it.' };
  }
  if (!placeId) {
    return { success: false, error: 'GOOGLE_PLACE_ID is not defined. Please add it to your .env.local file or provide it.' };
  }

  try {
    let allReviews: any[] = [];
    let nextPageToken: string | null = null;
    let page = 1;
    const maxPages = 10; // Safety limit (up to 100 reviews)

    while (page <= maxPages) {
      let url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${encodeURIComponent(
        placeId
      )}&api_key=${encodeURIComponent(serpApiKey)}`;

      if (nextPageToken) {
        url += `&next_page_token=${encodeURIComponent(nextPageToken)}`;
      }

      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`SerpApi responded with HTTP status ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const reviews = data.reviews || [];
      if (!Array.isArray(reviews) || reviews.length === 0) {
        break;
      }

      allReviews.push(...reviews);

      nextPageToken = data.serpapi_pagination?.next_page_token || null;
      if (!nextPageToken) {
        break;
      }
      page++;
    }

    if (allReviews.length === 0) {
      return { success: true, count: 0, message: 'No reviews found in SerpApi response.' };
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (const r of allReviews) {
      const reviewId = r.review_id || (r.user && r.user.link) || `${r.user?.name}_${r.date}`;
      const authorName = r.user?.name || 'Google User';
      const authorPhoto = r.user?.thumbnail || null;
      const rating = Math.round(Number(r.rating) || 5);
      const relativeTime = r.date || 'Recently';
      const reviewText = (r.snippet || r.extracted_snippet?.original || r.text || '').trim();

      // Check if already exists by review_id or author_name + review_text
      const [existing]: any = await pool.query(
        'SELECT id FROM google_reviews WHERE review_id = ? OR (author_name = ? AND review_text = ?)',
        [reviewId, authorName, reviewText]
      );

      if (existing && existing.length > 0) {
        // Update review
        await pool.query(
          `UPDATE google_reviews 
           SET author_photo_url = ?, rating = ?, relative_time = ?, review_text = ? 
           WHERE id = ?`,
          [authorPhoto, rating, relativeTime, reviewText, existing[0].id]
        );
        updatedCount++;
      } else {
        // Insert new review
        await pool.query(
          `INSERT INTO google_reviews 
           (review_id, author_name, author_photo_url, rating, relative_time, review_text, is_active, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?, 1, 0)`,
          [reviewId, authorName, authorPhoto, rating, relativeTime, reviewText]
        );
        insertedCount++;
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/reviews');

    return {
      success: true,
      totalFetched: allReviews.length,
      insertedCount,
      updatedCount,
      message: `Successfully fetched and synced all ${allReviews.length} reviews (${insertedCount} new, ${updatedCount} updated).`,
    };
  } catch (error: any) {
    console.error('Error syncing reviews from SerpApi:', error);
    return { success: false, error: error.message };
  }
}
