'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { WorkProject } from '@/types/work';

function rowToWorkProject(row: any): WorkProject & { sortOrder?: number; isActive?: number } {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image,
    tag: row.tag || '',
    stitches: row.stitches || '',
    colors: row.colors || '',
    fabric: row.fabric || '',
    machine: row.machine || '',
    turnaround: row.turnaround || '',
    description: row.description || '',
    punchingNotes: row.punching_notes || '',
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? 1,
  };
}

// 1. Fetch active work projects for public frontend (Home page & Our Work page)
export async function getActiveWorkProjects(): Promise<WorkProject[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM our_work WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    return rows.map(rowToWorkProject);
  } catch (error) {
    console.error('Failed to fetch active work projects from DB:', error);
    return [];
  }
}

// 2. Fetch all work projects for Admin panel
export async function getAllWorkProjectsAdmin(): Promise<any[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM our_work ORDER BY sort_order ASC, id ASC'
    );
    return rows;
  } catch (error) {
    console.error('Failed to fetch work projects for admin:', error);
    return [];
  }
}

// 3. Fetch single project by ID
export async function getWorkProjectById(id: number | string): Promise<any | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM our_work WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch work project by id:', error);
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

// 4. Create Work Project
export async function createWorkProject(formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  const category = ((formData.get('category') as string) || 'Caps & 3D Puff').trim();
  const tag = ((formData.get('tag') as string) || '').trim();
  const stitches = ((formData.get('stitches') as string) || '').trim();
  const colors = ((formData.get('colors') as string) || '').trim();
  const fabric = ((formData.get('fabric') as string) || '').trim();
  const machine = ((formData.get('machine') as string) || 'Tajima 1,000 SPM').trim();
  const turnaround = ((formData.get('turnaround') as string) || '6–8 Hours').trim();
  const description = ((formData.get('description') as string) || '').trim();
  const punching_notes = ((formData.get('punching_notes') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);

  // File Upload
  const imageFile = formData.get('image') as File | null;
  let image = await handleFileUpload(imageFile);

  if (!image) {
    // If no image uploaded, default fallback
    image = '/work/work-1.jpg';
  }

  await pool.query(
    `INSERT INTO our_work 
     (title, category, image, tag, stitches, colors, fabric, machine, turnaround, description, punching_notes, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      title,
      category,
      image,
      tag,
      stitches,
      colors,
      fabric,
      machine,
      turnaround,
      description,
      punching_notes,
      sort_order,
    ]
  );

  revalidatePath('/');
  revalidatePath('/our-work');
  revalidatePath('/admin/our-work');
  redirect('/admin/our-work');
}

// 5. Update Work Project
export async function updateWorkProject(id: number, formData: FormData) {
  const title = ((formData.get('title') as string) || '').trim();
  const category = ((formData.get('category') as string) || 'Caps & 3D Puff').trim();
  const tag = ((formData.get('tag') as string) || '').trim();
  const stitches = ((formData.get('stitches') as string) || '').trim();
  const colors = ((formData.get('colors') as string) || '').trim();
  const fabric = ((formData.get('fabric') as string) || '').trim();
  const machine = ((formData.get('machine') as string) || 'Tajima 1,000 SPM').trim();
  const turnaround = ((formData.get('turnaround') as string) || '6–8 Hours').trim();
  const description = ((formData.get('description') as string) || '').trim();
  const punching_notes = ((formData.get('punching_notes') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  // File Upload
  const imageFile = formData.get('image') as File | null;
  const newImage = await handleFileUpload(imageFile);

  const updateFields: string[] = [
    'title = ?',
    'category = ?',
    'tag = ?',
    'stitches = ?',
    'colors = ?',
    'fabric = ?',
    'machine = ?',
    'turnaround = ?',
    'description = ?',
    'punching_notes = ?',
    'sort_order = ?',
    'is_active = ?',
  ];

  const updateValues: any[] = [
    title,
    category,
    tag,
    stitches,
    colors,
    fabric,
    machine,
    turnaround,
    description,
    punching_notes,
    sort_order,
    is_active,
  ];

  if (newImage) {
    updateFields.push('image = ?');
    updateValues.push(newImage);
  }

  updateValues.push(id);

  await pool.query(
    `UPDATE our_work SET ${updateFields.join(', ')} WHERE id = ?`,
    updateValues
  );

  revalidatePath('/');
  revalidatePath('/our-work');
  revalidatePath('/admin/our-work');
  redirect('/admin/our-work');
}

// 6. Delete Work Project
export async function deleteWorkProject(id: number) {
  await pool.query('DELETE FROM our_work WHERE id = ?', [id]);
  revalidatePath('/');
  revalidatePath('/our-work');
  revalidatePath('/admin/our-work');
}
