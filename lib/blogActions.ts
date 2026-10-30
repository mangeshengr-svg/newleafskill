'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import { blogPosts as fallbackBlogPosts } from '@/data/blogPosts';

function safeParseJson(value: any, defaultValue: any = []) {
  if (!value) return defaultValue;
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch (err) {
    if (typeof value === 'string') {
      return value.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    return defaultValue;
  }
}

function rowToBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    tags: safeParseJson(row.tags, []),
    author: row.author || 'Admin',
    authorRole: row.author_role || 'Master Digitizing Studio',
    date: row.date || 'October 20, 2026',
    readTime: row.read_time || '4 min read',
    image: row.image || '/blog/blog-hero-banner.jpg',
    featured: Boolean(row.featured),
    content: safeParseJson(row.content, []),
    keyTakeaways: safeParseJson(row.key_takeaways, []),
    commentsCount: row.comments_count || 0,
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? 1,
  };
}

// 1. Fetch active blog posts for public frontend (Home page & Blog page)
export async function getActiveBlogPosts(): Promise<BlogPost[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM blogs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    if (!rows || rows.length === 0) {
      return fallbackBlogPosts;
    }
    return rows.map(rowToBlogPost);
  } catch (error) {
    console.error('Failed to fetch active blog posts from DB:', error);
    return fallbackBlogPosts;
  }
}

// 2. Fetch all blog posts for Admin panel
export async function getAllBlogPostsAdmin(): Promise<any[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM blogs ORDER BY sort_order ASC, id ASC'
    );
    return rows;
  } catch (error) {
    console.error('Failed to fetch blog posts for admin:', error);
    return [];
  }
}

// 3. Fetch single blog post by ID
export async function getBlogPostById(id: number | string): Promise<any | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM blogs WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch blog post by id:', error);
    return null;
  }
}

// 4. Fetch single blog post by Slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM blogs WHERE slug = ? LIMIT 1', [slug]);
    if (!rows || rows.length === 0) {
      const fallback = fallbackBlogPosts.find((p) => p.slug === slug);
      return fallback || null;
    }
    return rowToBlogPost(rows[0]);
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error);
    const fallback = fallbackBlogPosts.find((p) => p.slug === slug);
    return fallback || null;
  }
}

// Helper to save uploaded file
async function handleFileUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || '.jpg';
  const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `blog-${Date.now()}-${rawBase}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 5. Create Blog Post
export async function createBlogPost(formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  let slug = ((formData.get('slug') as string) || '').trim();
  if (!slug) {
    slug = slugify(title) || `post-${Date.now()}`;
  } else {
    slug = slugify(slug);
  }

  const excerpt = ((formData.get('excerpt') as string) || '').trim();
  const category = ((formData.get('category') as string) || 'Embroidery Service').trim();
  const author = ((formData.get('author') as string) || 'Admin').trim();
  const author_role = ((formData.get('author_role') as string) || 'Master Digitizing Studio').trim();
  const date = ((formData.get('date') as string) || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })).trim();
  const read_time = ((formData.get('read_time') as string) || '4 min read').trim();
  const featured = formData.get('featured') === 'on' || formData.get('featured') === '1' ? 1 : 0;
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);

  // Tags: comma-separated or newline
  const rawTags = (formData.get('tags') as string) || '';
  const tags = rawTags
    .split(/[,,\n]+/)
    .map((t) => t.trim().replace(/^#/, ''))
    .filter(Boolean);

  // Key Takeaways: newline separated
  const rawTakeaways = (formData.get('key_takeaways') as string) || '';
  const key_takeaways = rawTakeaways
    .split('\n')
    .map((t) => t.trim().replace(/^[•\-\*]\s*/, ''))
    .filter(Boolean);

  // Content: paragraphs separated by double newline or single newline
  const rawContent = (formData.get('content') as string) || '';
  const content = rawContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // File Upload (image upload input required)
  const imageFile = formData.get('image') as File | null;
  let image = await handleFileUpload(imageFile);

  if (!image) {
    image = '/blog/blog-hero-banner.jpg';
  }

  await pool.query(
    `INSERT INTO blogs 
     (slug, title, excerpt, category, tags, author, author_role, date, read_time, image, featured, content, key_takeaways, comments_count, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 1)`,
    [
      slug,
      title,
      excerpt,
      category,
      JSON.stringify(tags),
      author,
      author_role,
      date,
      read_time,
      image,
      featured,
      JSON.stringify(content),
      JSON.stringify(key_takeaways),
      sort_order,
    ]
  );

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

// 6. Update Blog Post
export async function updateBlogPost(id: number, formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  let slug = ((formData.get('slug') as string) || '').trim();
  if (!slug) {
    slug = slugify(title) || `post-${id}`;
  } else {
    slug = slugify(slug);
  }

  const excerpt = ((formData.get('excerpt') as string) || '').trim();
  const category = ((formData.get('category') as string) || 'Embroidery Service').trim();
  const author = ((formData.get('author') as string) || 'Admin').trim();
  const author_role = ((formData.get('author_role') as string) || 'Master Digitizing Studio').trim();
  const date = ((formData.get('date') as string) || '').trim();
  const read_time = ((formData.get('read_time') as string) || '4 min read').trim();
  const featured = formData.get('featured') === 'on' || formData.get('featured') === '1' ? 1 : 0;
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  // Tags
  const rawTags = (formData.get('tags') as string) || '';
  const tags = rawTags
    .split(/[,,\n]+/)
    .map((t) => t.trim().replace(/^#/, ''))
    .filter(Boolean);

  // Key Takeaways
  const rawTakeaways = (formData.get('key_takeaways') as string) || '';
  const key_takeaways = rawTakeaways
    .split('\n')
    .map((t) => t.trim().replace(/^[•\-\*]\s*/, ''))
    .filter(Boolean);

  // Content
  const rawContent = (formData.get('content') as string) || '';
  const content = rawContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // File Upload
  const imageFile = formData.get('image') as File | null;
  const newImage = await handleFileUpload(imageFile);

  const updateFields: string[] = [
    'title = ?',
    'slug = ?',
    'excerpt = ?',
    'category = ?',
    'tags = ?',
    'author = ?',
    'author_role = ?',
    'date = ?',
    'read_time = ?',
    'featured = ?',
    'content = ?',
    'key_takeaways = ?',
    'sort_order = ?',
    'is_active = ?',
  ];

  const updateValues: any[] = [
    title,
    slug,
    excerpt,
    category,
    JSON.stringify(tags),
    author,
    author_role,
    date,
    read_time,
    featured,
    JSON.stringify(content),
    JSON.stringify(key_takeaways),
    sort_order,
    is_active,
  ];

  if (newImage) {
    updateFields.push('image = ?');
    updateValues.push(newImage);
  }

  updateValues.push(id);

  await pool.query(
    `UPDATE blogs SET ${updateFields.join(', ')} WHERE id = ?`,
    updateValues
  );

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

// 7. Delete Blog Post
export async function deleteBlogPost(id: number) {
  try {
    await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    throw error;
  }
}
