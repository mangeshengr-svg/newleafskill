'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ServiceCategory } from '@/types/service';

// 1. Fetch all categories with nested subcategories
export async function getServiceCategoriesHierarchy(): Promise<ServiceCategory[]> {
  try {
    const [rows]: any = await pool.query(
      `SELECT c.*, 
        (SELECT COUNT(*) FROM services s WHERE s.category_id = c.id OR s.subcategory_id = c.id) as services_count 
       FROM service_categories c 
       ORDER BY c.sort_order ASC, c.id ASC`
    );

    const mainCategories: ServiceCategory[] = [];
    const subMap = new Map<number, ServiceCategory[]>();

    for (const r of rows) {
      const item: ServiceCategory = {
        id: r.id,
        name: r.name,
        slug: r.slug,
        parentId: r.parent_id,
        description: r.description || '',
        sortOrder: r.sort_order ?? 0,
        isActive: r.is_active ?? 1,
        servicesCount: r.services_count || 0,
        subcategories: [],
      };

      if (r.parent_id) {
        if (!subMap.has(r.parent_id)) {
          subMap.set(r.parent_id, []);
        }
        subMap.get(r.parent_id)!.push(item);
      } else {
        mainCategories.push(item);
      }
    }

    for (const main of mainCategories) {
      main.subcategories = subMap.get(main.id) || [];
    }

    return mainCategories;
  } catch (error) {
    console.error('getServiceCategoriesHierarchy Error:', error);
    return [];
  }
}

// 2. Fetch all flat active categories for dropdowns
export async function getAllFlatCategories(): Promise<{ id: number; name: string; slug: string; parent_id: number | null }[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, name, slug, parent_id FROM service_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    return rows;
  } catch (error) {
    console.error('getAllFlatCategories Error:', error);
    return [];
  }
}

// 3. Create Main Category
export async function createMainCategory(formData: FormData) {
  const name = ((formData.get('name') as string) || '').trim();
  const slugInput = ((formData.get('slug') as string) || '').trim();
  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const description = ((formData.get('description') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (!name) {
    throw new Error('Category name is required');
  }

  await pool.query(
    `INSERT INTO service_categories (name, slug, parent_id, description, sort_order, is_active)
     VALUES (?, ?, NULL, ?, ?, ?)`,
    [name, slug, description, sort_order, is_active]
  );

  revalidatePath('/admin/services/categories');
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services/categories');
}

// 4. Update Main Category
export async function updateMainCategory(id: number, formData: FormData) {
  const name = ((formData.get('name') as string) || '').trim();
  const slugInput = ((formData.get('slug') as string) || '').trim();
  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const description = ((formData.get('description') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  await pool.query(
    `UPDATE service_categories 
     SET name = ?, slug = ?, parent_id = NULL, description = ?, sort_order = ?, is_active = ?
     WHERE id = ?`,
    [name, slug, description, sort_order, is_active, id]
  );

  revalidatePath('/admin/services/categories');
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services/categories');
}

// 5. Create Subcategory
export async function createSubcategory(formData: FormData) {
  const name = ((formData.get('name') as string) || '').trim();
  const slugInput = ((formData.get('slug') as string) || '').trim();
  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const parentIdRaw = (formData.get('parent_id') as string) || '';
  const parent_id = parentIdRaw ? parseInt(parentIdRaw, 10) : null;
  const description = ((formData.get('description') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (!name) {
    throw new Error('Subcategory name is required');
  }
  if (!parent_id) {
    throw new Error('Main parent category is required for subcategory');
  }

  await pool.query(
    `INSERT INTO service_categories (name, slug, parent_id, description, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, slug, parent_id, description, sort_order, is_active]
  );

  revalidatePath('/admin/services/categories');
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services/categories');
}

// 6. Update Subcategory
export async function updateSubcategory(id: number, formData: FormData) {
  const name = ((formData.get('name') as string) || '').trim();
  const slugInput = ((formData.get('slug') as string) || '').trim();
  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const parentIdRaw = (formData.get('parent_id') as string) || '';
  const parent_id = parentIdRaw ? parseInt(parentIdRaw, 10) : null;
  const description = ((formData.get('description') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (!parent_id) {
    throw new Error('Main parent category is required for subcategory');
  }

  await pool.query(
    `UPDATE service_categories 
     SET name = ?, slug = ?, parent_id = ?, description = ?, sort_order = ?, is_active = ?
     WHERE id = ?`,
    [name, slug, parent_id, description, sort_order, is_active, id]
  );

  revalidatePath('/admin/services/categories');
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
  redirect('/admin/services/categories');
}

// Legacy general create/update kept for backward compatibility
export async function createServiceCategory(formData: FormData) {
  return createMainCategory(formData);
}

export async function updateServiceCategory(id: number, formData: FormData) {
  return updateMainCategory(id, formData);
}

// 5. Delete Category
export async function deleteServiceCategory(id: number) {
  // Disconnect associated services first
  await pool.query(
    'UPDATE services SET category_id = NULL WHERE category_id = ?',
    [id]
  );
  await pool.query(
    'UPDATE services SET subcategory_id = NULL WHERE subcategory_id = ?',
    [id]
  );
  await pool.query('DELETE FROM service_categories WHERE id = ?', [id]);

  revalidatePath('/admin/services/categories');
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath('/');
}

