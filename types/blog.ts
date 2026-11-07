export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt?: string;
  featured?: boolean;
  content: string[];
  keyTakeaways?: string[];
  commentsCount?: number;
  sortOrder?: number;
  isActive?: number;
}

export type BlogSortOption = 'newest' | 'oldest' | 'readTime' | 'title';
