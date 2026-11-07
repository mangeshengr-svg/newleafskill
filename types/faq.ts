export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  subcategory?: string;
  category_id?: number | null;
  subcategory_id?: number | null;
  page_location?: string;
  sort_order: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}
