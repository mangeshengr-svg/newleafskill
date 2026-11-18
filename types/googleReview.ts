export interface GoogleReview {
  id: number;
  review_id?: string | null;
  author_name: string;
  author_photo_url?: string | null;
  rating: number;
  relative_time?: string | null;
  review_text: string;
  is_active?: number;
  sort_order?: number;
  created_at?: string;
}
