'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ServiceItem, ServiceSubItem } from '@/types/service';

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function rowToServiceItem(row: any): ServiceItem & { dbId: number } {
  return {
    dbId: row.id,
    id: row.service_id || String(row.id),
    slug: row.slug,
    num: row.num || '01',
    title: row.title,
    tag: row.tag || '',
    badge: row.badge || '',
    category: row.category || 'Digitizing Services',
    image: row.image || '',
    secondaryImage: row.secondary_image || '',
    shortDesc: row.short_desc || '',
    fullDesc: safeParseJson<string[]>(row.full_desc, []),
    keyHighlights: safeParseJson<string[]>(row.key_highlights, []),
    subOfferings: safeParseJson<ServiceSubItem[]>(row.sub_offerings, []),
    fabrics: safeParseJson<string[]>(row.fabrics, []),
    machineFormats: safeParseJson<string[]>(row.machine_formats, []),
    turnaround: row.turnaround || '',
    revisions: row.revisions || '',
    targetIndustries: safeParseJson<string[]>(row.target_industries, []),
  };
}

// 1. Fetch all active services for UI
export async function getActiveServices(): Promise<(ServiceItem & { dbId: number })[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    return rows.map(rowToServiceItem);
  } catch (error) {
    console.error('Failed to fetch active services from DB:', error);
    return [];
  }
}

// 2. Fetch all services for Admin
export async function getAllServices(): Promise<any[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM services ORDER BY sort_order ASC, id ASC'
    );
    return rows;
  } catch (error) {
    console.error('Failed to fetch services for admin:', error);
    return [];
  }
}

// 3. Fetch single service by ID
export async function getServiceById(id: number | string): Promise<any | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM services WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch service by id:', error);
    return null;
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
  const filename = `${Date.now()}-${rawBase}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

// 4. Add Service
export async function createService(formData: FormData) {
  const title = (formData.get('title') as string) || '';
  const slugInput = (formData.get('slug') as string) || '';
  const slug = slugInput.trim()
    ? slugInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const service_id = slug + '-service';
  const num = (formData.get('num') as string) || '01';
  const tag = (formData.get('tag') as string) || '';
  const badge = (formData.get('badge') as string) || '';
  const category = (formData.get('category') as string) || 'Digitizing Services';
  const short_desc = (formData.get('short_desc') as string) || '';
  const turnaround = (formData.get('turnaround') as string) || '6–8 Hours';
  const revisions = (formData.get('revisions') as string) || '100% Free & Unlimited';
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);

  // Parse arrays
  const fullDescRaw = (formData.get('full_desc') as string) || '';
  const full_desc = fullDescRaw
    .split(/\r?\n\r?\n|\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const keyHighlightsRaw = (formData.get('key_highlights') as string) || '';
  const key_highlights = keyHighlightsRaw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const fabricsRaw = (formData.get('fabrics') as string) || '';
  const fabrics = fabricsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const formatsRaw = (formData.get('machine_formats') as string) || '';
  const machine_formats = formatsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const industriesRaw = (formData.get('target_industries') as string) || '';
  const target_industries = industriesRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  // Sub offerings (parsed from Title: Description per line)
  const subOfferingsRaw = (formData.get('sub_offerings') as string) || '';
  const sub_offerings: ServiceSubItem[] = subOfferingsRaw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(':');
      if (parts.length > 1) {
        return {
          title: parts[0].trim(),
          desc: parts.slice(1).join(':').trim(),
        };
      }
      return { title: line, desc: '' };
    });

  // Handle Image Uploads
  const imageFile = formData.get('image') as File | null;
  const secondaryImageFile = formData.get('secondary_image') as File | null;

  let image = await handleFileUpload(imageFile);
  if (!image) {
    image = '/services/embroidery-digitizing.png'; // default fallback if none uploaded
  }

  const secondary_image = (await handleFileUpload(secondaryImageFile)) || '';

  await pool.query(
    `INSERT INTO services 
     (service_id, slug, num, title, tag, badge, category, image, secondary_image, short_desc, full_desc, key_highlights, sub_offerings, fabrics, machine_formats, turnaround, revisions, target_industries, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      service_id,
      slug,
      num,
      title,
      tag,
      badge,
      category,
      image,
      secondary_image,
      short_desc,
      JSON.stringify(full_desc),
      JSON.stringify(key_highlights),
      JSON.stringify(sub_offerings),
      JSON.stringify(fabrics),
      JSON.stringify(machine_formats),
      turnaround,
      revisions,
      JSON.stringify(target_industries),
      sort_order,
    ]
  );

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

// 5. Update Service
export async function updateService(id: number, formData: FormData) {
  const title = (formData.get('title') as string) || '';
  const slugInput = (formData.get('slug') as string) || '';
  const slug = slugInput.trim()
    ? slugInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const service_id = slug + '-service';
  const num = (formData.get('num') as string) || '01';
  const tag = (formData.get('tag') as string) || '';
  const badge = (formData.get('badge') as string) || '';
  const category = (formData.get('category') as string) || 'Digitizing Services';
  const short_desc = (formData.get('short_desc') as string) || '';
  const turnaround = (formData.get('turnaround') as string) || '6–8 Hours';
  const revisions = (formData.get('revisions') as string) || '100% Free & Unlimited';
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  // Parse arrays
  const fullDescRaw = (formData.get('full_desc') as string) || '';
  const full_desc = fullDescRaw
    .split(/\r?\n\r?\n|\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const keyHighlightsRaw = (formData.get('key_highlights') as string) || '';
  const key_highlights = keyHighlightsRaw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const fabricsRaw = (formData.get('fabrics') as string) || '';
  const fabrics = fabricsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const formatsRaw = (formData.get('machine_formats') as string) || '';
  const machine_formats = formatsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const industriesRaw = (formData.get('target_industries') as string) || '';
  const target_industries = industriesRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  // Sub offerings
  const subOfferingsRaw = (formData.get('sub_offerings') as string) || '';
  const sub_offerings: ServiceSubItem[] = subOfferingsRaw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(':');
      if (parts.length > 1) {
        return {
          title: parts[0].trim(),
          desc: parts.slice(1).join(':').trim(),
        };
      }
      return { title: line, desc: '' };
    });

  // Handle Image Uploads
  const imageFile = formData.get('image') as File | null;
  const secondaryImageFile = formData.get('secondary_image') as File | null;

  const newMainImage = await handleFileUpload(imageFile);
  const newSecondaryImage = await handleFileUpload(secondaryImageFile);

  const updateFields: string[] = [
    'service_id = ?',
    'slug = ?',
    'num = ?',
    'title = ?',
    'tag = ?',
    'badge = ?',
    'category = ?',
    'short_desc = ?',
    'full_desc = ?',
    'key_highlights = ?',
    'sub_offerings = ?',
    'fabrics = ?',
    'machine_formats = ?',
    'turnaround = ?',
    'revisions = ?',
    'target_industries = ?',
    'sort_order = ?',
    'is_active = ?',
  ];

  const updateValues: any[] = [
    service_id,
    slug,
    num,
    title,
    tag,
    badge,
    category,
    short_desc,
    JSON.stringify(full_desc),
    JSON.stringify(key_highlights),
    JSON.stringify(sub_offerings),
    JSON.stringify(fabrics),
    JSON.stringify(machine_formats),
    turnaround,
    revisions,
    JSON.stringify(target_industries),
    sort_order,
    is_active,
  ];

  if (newMainImage) {
    updateFields.push('image = ?');
    updateValues.push(newMainImage);
  }

  if (newSecondaryImage) {
    updateFields.push('secondary_image = ?');
    updateValues.push(newSecondaryImage);
  }

  updateValues.push(id);

  await pool.query(
    `UPDATE services SET ${updateFields.join(', ')} WHERE id = ?`,
    updateValues
  );

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath(`/services/${slug}`);
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

// 6. Delete Service
export async function deleteService(id: number) {
  await pool.query('DELETE FROM services WHERE id = ?', [id]);
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
}
