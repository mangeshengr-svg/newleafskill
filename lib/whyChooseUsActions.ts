'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { WhyChooseUsItem, WhyChooseUsPillar } from '@/types/whyChooseUs';

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function rowToWhyChooseUs(row: any): WhyChooseUsItem {
  return {
    id: row.id,
    title: row.title || 'New Leaf Skills',
    subtitle: row.subtitle || 'Global Embroidery Digitizing & Punching Excellence',
    eyebrow: row.eyebrow || 'Why Choose Us:',
    image: row.image || '/why-choose-us.jpg',
    studioBadge: row.studio_badge || 'Master Studio & Craftsmanship',
    studioDesc: row.studio_desc || 'Dedicated digitization facility with live Tajima & Barudan testing beds.',
    experienceYears: row.experience_years || '22+',
    experienceTitle: row.experience_title || 'Years Experience',
    experienceSub: row.experience_sub || 'Since 2002 • Pioneer Punchers',
    badge2Icon: row.badge2_icon || '⚡',
    badge2Title: row.badge2_title || 'Machine-Ready Files',
    badge2Sub: row.badge2_sub || 'Zero thread breaks • 100% Tested',
    description1: row.description_1 || '',
    description2: row.description_2 || '',
    description3: row.description_3 || '',
    pillars: safeParseJson<WhyChooseUsPillar[]>(row.pillars, []),
    capabilities: safeParseJson<string[]>(row.capabilities, []),
    btn1Text: row.btn1_text || 'Request Free Digitizing Quote',
    btn1Link: row.btn1_link || '#quote',
    btn2Text: row.btn2_text || 'View Our Work',
    btn2Link: row.btn2_link || '/our-work',
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? 1,
  };
}

// 1. Fetch active Why Choose Us section for Home page
export async function getActiveWhyChooseUs(): Promise<WhyChooseUsItem | null> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM why_choose_us WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT 1'
    );
    if (!rows || rows.length === 0) return null;
    return rowToWhyChooseUs(rows[0]);
  } catch (error) {
    console.error('Failed to fetch active why choose us from DB:', error);
    return null;
  }
}

// 2. Fetch all Why Choose Us entries for Admin panel
export async function getAllWhyChooseUsAdmin(): Promise<any[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM why_choose_us ORDER BY sort_order ASC, id DESC'
    );
    return rows;
  } catch (error) {
    console.error('Failed to fetch why choose us for admin:', error);
    return [];
  }
}

// 3. Fetch single item by ID
export async function getWhyChooseUsById(id: number | string): Promise<any | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM why_choose_us WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch why choose us by id:', error);
    return null;
  }
}

// Helper: Handle file upload and save to public/uploads
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

// 4. Create Why Choose Us Entry
export async function createWhyChooseUs(formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  const subtitle = ((formData.get('subtitle') as string) || '').trim();
  const eyebrow = ((formData.get('eyebrow') as string) || 'Why Choose Us:').trim();
  const studio_badge = ((formData.get('studio_badge') as string) || 'Master Studio & Craftsmanship').trim();
  const studio_desc = ((formData.get('studio_desc') as string) || '').trim();
  const experience_years = ((formData.get('experience_years') as string) || '22+').trim();
  const experience_title = ((formData.get('experience_title') as string) || 'Years Experience').trim();
  const experience_sub = ((formData.get('experience_sub') as string) || 'Since 2002 • Pioneer Punchers').trim();
  const badge2_icon = ((formData.get('badge2_icon') as string) || '⚡').trim();
  const badge2_title = ((formData.get('badge2_title') as string) || 'Machine-Ready Files').trim();
  const badge2_sub = ((formData.get('badge2_sub') as string) || 'Zero thread breaks • 100% Tested').trim();
  const description_1 = ((formData.get('description_1') as string) || '').trim();
  const description_2 = ((formData.get('description_2') as string) || '').trim();
  const description_3 = ((formData.get('description_3') as string) || '').trim();
  const btn1_text = ((formData.get('btn1_text') as string) || 'Request Free Digitizing Quote').trim();
  const btn1_link = ((formData.get('btn1_link') as string) || '#quote').trim();
  const btn2_text = ((formData.get('btn2_text') as string) || 'View Our Work').trim();
  const btn2_link = ((formData.get('btn2_link') as string) || '/our-work').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  // Handle Pillars (from 4 pillar form fields)
  const pillars: WhyChooseUsPillar[] = [
    {
      icon: (formData.get('pillar1_icon') as string) || '⏱️',
      title: (formData.get('pillar1_title') as string) || 'Fast Turnaround',
      description: (formData.get('pillar1_desc') as string) || '6–8 hour standard turnaround with 2–4 hour rush dispatch available.',
    },
    {
      icon: (formData.get('pillar2_icon') as string) || '🎯',
      title: (formData.get('pillar2_title') as string) || 'Error-Free Digitizing',
      description: (formData.get('pillar2_desc') as string) || 'Calibrated stitch density, smart underlay, and zero thread breaks.',
    },
    {
      icon: (formData.get('pillar3_icon') as string) || '💰',
      title: (formData.get('pillar3_title') as string) || 'Affordable Pricing',
      description: (formData.get('pillar3_desc') as string) || 'Transparent flat rates from $10 / ₹350 without any hidden setup costs.',
    },
    {
      icon: (formData.get('pillar4_icon') as string) || '🤝',
      title: (formData.get('pillar4_title') as string) || 'Reliable 24/7 Support',
      description: (formData.get('pillar4_desc') as string) || '100% free unlimited edits until your sewout runs perfectly on fabric.',
    },
  ];

  // Handle Capabilities (comma/newline separated string)
  const rawCaps = (formData.get('capabilities') as string) || '';
  const capabilities = rawCaps
    .split(/[\n,]+/)
    .map((c) => c.trim())
    .filter(Boolean);

  // File Upload (Mandatory on creation)
  const imageFile = formData.get('image') as File | null;
  let imageUrl = '/why-choose-us.jpg';

  if (imageFile && imageFile.size > 0) {
    const uploaded = await handleFileUpload(imageFile);
    if (uploaded) imageUrl = uploaded;
  }

  await pool.query(
    `INSERT INTO why_choose_us 
     (title, subtitle, eyebrow, image, studio_badge, studio_desc, experience_years, experience_title, experience_sub, badge2_icon, badge2_title, badge2_sub, description_1, description_2, description_3, pillars, capabilities, btn1_text, btn1_link, btn2_text, btn2_link, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title || 'New Leaf Skills',
      subtitle || 'Global Embroidery Digitizing & Punching Excellence',
      eyebrow,
      imageUrl,
      studio_badge,
      studio_desc,
      experience_years,
      experience_title,
      experience_sub,
      badge2_icon,
      badge2_title,
      badge2_sub,
      description_1,
      description_2,
      description_3,
      JSON.stringify(pillars),
      JSON.stringify(capabilities),
      btn1_text,
      btn1_link,
      btn2_text,
      btn2_link,
      sort_order,
      is_active,
    ]
  );

  revalidatePath('/');
  revalidatePath('/admin/why-choose-us');
  redirect('/admin/why-choose-us');
}

// 5. Update Why Choose Us Entry
export async function updateWhyChooseUs(id: number, formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  const subtitle = ((formData.get('subtitle') as string) || '').trim();
  const eyebrow = ((formData.get('eyebrow') as string) || 'Why Choose Us:').trim();
  const studio_badge = ((formData.get('studio_badge') as string) || 'Master Studio & Craftsmanship').trim();
  const studio_desc = ((formData.get('studio_desc') as string) || '').trim();
  const experience_years = ((formData.get('experience_years') as string) || '22+').trim();
  const experience_title = ((formData.get('experience_title') as string) || 'Years Experience').trim();
  const experience_sub = ((formData.get('experience_sub') as string) || 'Since 2002 • Pioneer Punchers').trim();
  const badge2_icon = ((formData.get('badge2_icon') as string) || '⚡').trim();
  const badge2_title = ((formData.get('badge2_title') as string) || 'Machine-Ready Files').trim();
  const badge2_sub = ((formData.get('badge2_sub') as string) || 'Zero thread breaks • 100% Tested').trim();
  const description_1 = ((formData.get('description_1') as string) || '').trim();
  const description_2 = ((formData.get('description_2') as string) || '').trim();
  const description_3 = ((formData.get('description_3') as string) || '').trim();
  const btn1_text = ((formData.get('btn1_text') as string) || 'Request Free Digitizing Quote').trim();
  const btn1_link = ((formData.get('btn1_link') as string) || '#quote').trim();
  const btn2_text = ((formData.get('btn2_text') as string) || 'View Our Work').trim();
  const btn2_link = ((formData.get('btn2_link') as string) || '/our-work').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;
  const existing_image = (formData.get('existing_image') as string) || '/why-choose-us.jpg';

  // Pillars
  const pillars: WhyChooseUsPillar[] = [
    {
      icon: (formData.get('pillar1_icon') as string) || '⏱️',
      title: (formData.get('pillar1_title') as string) || 'Fast Turnaround',
      description: (formData.get('pillar1_desc') as string) || '',
    },
    {
      icon: (formData.get('pillar2_icon') as string) || '🎯',
      title: (formData.get('pillar2_title') as string) || 'Error-Free Digitizing',
      description: (formData.get('pillar2_desc') as string) || '',
    },
    {
      icon: (formData.get('pillar3_icon') as string) || '💰',
      title: (formData.get('pillar3_title') as string) || 'Affordable Pricing',
      description: (formData.get('pillar3_desc') as string) || '',
    },
    {
      icon: (formData.get('pillar4_icon') as string) || '🤝',
      title: (formData.get('pillar4_title') as string) || 'Reliable 24/7 Support',
      description: (formData.get('pillar4_desc') as string) || '',
    },
  ];

  // Capabilities
  const rawCaps = (formData.get('capabilities') as string) || '';
  const capabilities = rawCaps
    .split(/[\n,]+/)
    .map((c) => c.trim())
    .filter(Boolean);

  // File upload: If new file uploaded, use it. Otherwise keep existing image!
  let imageUrl = existing_image;
  const imageFile = formData.get('image') as File | null;
  if (imageFile && imageFile.size > 0) {
    const uploaded = await handleFileUpload(imageFile);
    if (uploaded) imageUrl = uploaded;
  }

  await pool.query(
    `UPDATE why_choose_us 
     SET title = ?, subtitle = ?, eyebrow = ?, image = ?, studio_badge = ?, studio_desc = ?,
         experience_years = ?, experience_title = ?, experience_sub = ?,
         badge2_icon = ?, badge2_title = ?, badge2_sub = ?,
         description_1 = ?, description_2 = ?, description_3 = ?,
         pillars = ?, capabilities = ?,
         btn1_text = ?, btn1_link = ?, btn2_text = ?, btn2_link = ?,
         sort_order = ?, is_active = ?
     WHERE id = ?`,
    [
      title || 'New Leaf Skills',
      subtitle || 'Global Embroidery Digitizing & Punching Excellence',
      eyebrow,
      imageUrl,
      studio_badge,
      studio_desc,
      experience_years,
      experience_title,
      experience_sub,
      badge2_icon,
      badge2_title,
      badge2_sub,
      description_1,
      description_2,
      description_3,
      JSON.stringify(pillars),
      JSON.stringify(capabilities),
      btn1_text,
      btn1_link,
      btn2_text,
      btn2_link,
      sort_order,
      is_active,
      id,
    ]
  );

  revalidatePath('/');
  revalidatePath('/admin/why-choose-us');
  redirect('/admin/why-choose-us');
}

// 6. Delete Why Choose Us Entry
export async function deleteWhyChooseUs(id: number) {
  try {
    await pool.query('DELETE FROM why_choose_us WHERE id = ?', [id]);
    revalidatePath('/');
    revalidatePath('/admin/why-choose-us');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete why choose us item:', error);
    throw error;
  }
}
