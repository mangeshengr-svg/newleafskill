'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FaqItem } from '@/types/faq';

// 1. Fetch active FAQs (filter by optional page location: 'home', 'contact', 'about', or 'all')
export async function getActiveFaqs(pageLocation?: string): Promise<FaqItem[]> {
  try {
    let query = 'SELECT * FROM faqs WHERE is_active = 1';
    const params: any[] = [];

    if (pageLocation && pageLocation !== 'all') {
      query += ' AND (page_location = ? OR page_location = "all")';
      params.push(pageLocation);
    }

    query += ' ORDER BY sort_order ASC, id ASC';

    const [rows]: any = await pool.query(query, params);
    return rows as FaqItem[];
  } catch (error) {
    console.error('Failed to fetch active FAQs from DB:', error);
    return [];
  }
}

// 2. Fetch all FAQs for Admin
export async function getAllFaqs(): Promise<FaqItem[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM faqs ORDER BY sort_order ASC, id DESC'
    );
    return rows as FaqItem[];
  } catch (error) {
    console.error('Failed to fetch all FAQs for admin:', error);
    return [];
  }
}

// 3. Fetch single FAQ by ID
export async function getFaqById(id: string | number): Promise<FaqItem | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
    if (rows && rows.length > 0) {
      return rows[0] as FaqItem;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch FAQ by ID:', error);
    return null;
  }
}

// 4. Create new FAQ
export async function createFaq(formData: FormData) {
  try {
    const question = (formData.get('question') as string)?.trim() || '';
    const answer = (formData.get('answer') as string)?.trim() || '';
    const category = (formData.get('category') as string)?.trim() || 'General';
    const page_location = (formData.get('page_location') as string)?.trim() || 'all';
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === 'on' || formData.get('is_active') === '1' ? 1 : 0;

    if (!question || !answer) {
      throw new Error('Question and Answer are required fields.');
    }

    await pool.query(
      `INSERT INTO faqs (question, answer, category, page_location, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [question, answer, category, page_location, sort_order, is_active]
    );

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/services');
    revalidatePath('/admin/faqs');
  } catch (error) {
    console.error('Failed to create FAQ:', error);
    throw error;
  }

  redirect('/admin/faqs');
}

// 5. Update FAQ
export async function updateFaq(id: number, formData: FormData) {
  try {
    const question = (formData.get('question') as string)?.trim() || '';
    const answer = (formData.get('answer') as string)?.trim() || '';
    const category = (formData.get('category') as string)?.trim() || 'General';
    const page_location = (formData.get('page_location') as string)?.trim() || 'all';
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === 'on' || formData.get('is_active') === '1' ? 1 : 0;

    if (!question || !answer) {
      throw new Error('Question and Answer are required fields.');
    }

    await pool.query(
      `UPDATE faqs 
       SET question = ?, answer = ?, category = ?, page_location = ?, sort_order = ?, is_active = ?
       WHERE id = ?`,
      [question, answer, category, page_location, sort_order, is_active, id]
    );

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/services');
    revalidatePath('/admin/faqs');
  } catch (error) {
    console.error('Failed to update FAQ:', error);
    throw error;
  }

  redirect('/admin/faqs');
}

// 6. Delete FAQ
export async function deleteFaq(id: number) {
  try {
    await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/services');
    revalidatePath('/admin/faqs');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete FAQ:', error);
    throw error;
  }
}
