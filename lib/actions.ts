// actions.ts
import db from '@/lib/db'; // Yeh default export ko 'db' naam se import karega

// 1. SHOW (Fetch all tabs data)
export async function getEmbroideryInspectors() {
  const [rows] = await db.query('SELECT * FROM embroidery_inspectors ORDER BY sort_order ASC');
  return rows;
}

// 2. ADD (Create new tab item)
export async function createEmbroideryItem(formData: FormData) {
  'use server';
  
  const tab_title = formData.get('tab_title');
  const badge_text = formData.get('badge_text');
  const title = formData.get('title');
  const description = formData.get('description');
  const design_size = formData.get('design_size');
  const stitch_count = formData.get('stitch_count');
  const underlay_pathing = formData.get('underlay_pathing');
  const pull_compensation = formData.get('pull_compensation');
  const thread_system = formData.get('thread_system');
  const formats_provided = formData.get('formats_provided');
  const button_text = formData.get('button_text');
  const button_url = formData.get('button_url');
  const before_image = formData.get('before_image');
  const after_image = formData.get('after_image');
  const sort_order = formData.get('sort_order') || 0;

  await db.query(
    `INSERT INTO embroidery_inspectors 
    (tab_title, badge_text, title, description, design_size, stitch_count, underlay_pathing, pull_compensation, thread_system, formats_provided, button_text, button_url, before_image, after_image, sort_order) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      tab_title, badge_text, title, description, design_size, stitch_count, 
      underlay_pathing, pull_compensation, thread_system, formats_provided, 
      button_text, button_url, before_image, after_image, sort_order
    ]
  );
}

// 3. EDIT / UPDATE
export async function updateEmbroideryItem(id: number, formData: FormData) {
  'use server';
  
  const tab_title = formData.get('tab_title');
  const badge_text = formData.get('badge_text');
  const title = formData.get('title');
  const description = formData.get('description');
  const design_size = formData.get('design_size');
  const stitch_count = formData.get('stitch_count');
  const underlay_pathing = formData.get('underlay_pathing');
  const pull_compensation = formData.get('pull_compensation');
  const thread_system = formData.get('thread_system');
  const formats_provided = formData.get('formats_provided');
  const button_text = formData.get('button_text');
  const button_url = formData.get('button_url');
  const before_image = formData.get('before_image');
  const after_image = formData.get('after_image');
  const sort_order = formData.get('sort_order') || 0;

  await db.query(
    `UPDATE embroidery_inspectors SET 
    tab_title = ?, badge_text = ?, title = ?, description = ?, design_size = ?, 
    stitch_count = ?, underlay_pathing = ?, pull_compensation = ?, thread_system = ?, 
    formats_provided = ?, button_text = ?, button_url = ?, before_image = ?, after_image = ?, sort_order = ? 
    WHERE id = ?`,
    [
      tab_title, badge_text, title, description, design_size, stitch_count, 
      underlay_pathing, pull_compensation, thread_system, formats_provided, 
      button_text, button_url, before_image, after_image, sort_order, id
    ]
  );
}

// 4. DELETE
export async function deleteEmbroideryItem(id: number) {
  'use server';
  await db.query('DELETE FROM embroidery_inspectors WHERE id = ?', [id]);
}