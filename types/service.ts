export interface ServiceSubItem {
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  num: string;
  title: string;
  tag: string;
  badge: string;
  category: string;
  subcategory?: string;
  categoryId?: number | null;
  subcategoryId?: number | null;
  metaTitle?: string;
  metaDescription?: string;
  imageAlt?: string;
  image: string;
  secondaryImage?: string;
  shortDesc: string;
  fullDesc: string[];
  keyHighlights: string[];
  subOfferings: ServiceSubItem[];
  fabrics: string[];
  machineFormats: string[];
  turnaround: string;
  revisions: string;
  targetIndustries: string[];
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  description?: string;
  sortOrder: number;
  isActive: number;
  subcategories?: ServiceCategory[];
  servicesCount?: number;
}
