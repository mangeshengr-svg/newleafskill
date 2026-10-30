'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 1. Add Category
export async function addStitchCategory(formData: FormData) {
  const key = formData.get('key') as string;
  const tabLabel = formData.get('tabLabel') as string;
  const title = formData.get('title') as string;
  const badge = formData.get('badge') as string;
  const desc = formData.get('desc') as string;
  const stitches = formData.get('stitches') as string;
  const time = formData.get('time') as string;
  const featuresRaw = formData.get('features') as string; // comma separated ya json
  const sortOrder = formData.get('sortOrder') as string;
  const imageFile = formData.get('image') as File;

  let imageUrl = '';

  // Image upload handle karna
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    imageUrl = `/uploads/${filename}`;
  }

  // Features ko JSON array me convert karna
  const features = JSON.stringify(featuresRaw.split(',').map(f => f.trim()));

  await pool.query(
    `INSERT INTO stitch_categories (category_key, tab_label, title, badge, description, stitches, turnaround_time, features, image_url, sort_order) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [key, tabLabel, title, badge, desc, stitches, time, features, imageUrl, sortOrder || 0]
  );

  revalidatePath('/');
  revalidatePath('/admin/home/stitch-categories');
  redirect('/admin/home/stitch-categories');
}

// 2. Delete Category
export async function deleteStitchCategory(id: number) {
  await pool.query('DELETE FROM stitch_categories WHERE id = ?', [id]);
  revalidatePath('/');
  revalidatePath('/admin/home/stitch-categories');
}

// 3. Update Category
export async function updateStitchCategory(id: number, formData: FormData) {
  const key = formData.get('key') as string;
  const tabLabel = formData.get('tabLabel') as string;
  const title = formData.get('title') as string;
  const badge = formData.get('badge') as string;
  const desc = formData.get('desc') as string;
  const stitches = formData.get('stitches') as string;
  const time = formData.get('time') as string;
  const featuresRaw = formData.get('features') as string;
  const sortOrder = formData.get('sortOrder') as string;
  const imageFile = formData.get('image') as File;

  let imageQueryPart = '';
  let queryParams: any[] = [key, tabLabel, title, badge, desc, stitches, time, JSON.stringify(featuresRaw.split(',').map(f => f.trim())), sortOrder || 0];

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    const imageUrl = `/uploads/${filename}`;

    imageQueryPart = ', image_url = ?';
    queryParams.push(imageUrl);
  }

  queryParams.push(id);

  await pool.query(
    `UPDATE stitch_categories SET category_key = ?, tab_label = ?, title = ?, badge = ?, description = ?, stitches = ?, turnaround_time = ?, features = ?, sort_order = ? ${imageQueryPart} WHERE id = ?`,
    queryParams
  );

  revalidatePath('/');
  revalidatePath('/admin/home/stitch-categories');
  redirect('/admin/home/stitch-categories');
}