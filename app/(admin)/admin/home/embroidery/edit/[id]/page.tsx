import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export const instant = false;

export default async function EditEmbroideryPage({ params }: { params: Promise<{ id: string }> }) {
  // Yahan params ko await karna hoga
  const { id } = await params;
  
  const [rows]: any = await db.query('SELECT * FROM embroidery_inspectors WHERE id = ?', [id]);
  const item = rows[0];

  if (!item) {
    return <div className="p-8">Item not found.</div>;
  }

  async function handleUpdate(formData: FormData) {
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
    const sort_order = formData.get('sort_order') || 0;

    async function saveFile(fileEntry: FormDataEntryValue | null, prefix: string, existingPath: string) {
      if (!fileEntry || typeof fileEntry === 'string' || fileEntry.size === 0) {
        return existingPath;
      }
      
      const file = fileEntry as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${prefix}-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      await fs.writeFile(path.join(uploadDir, filename), buffer);
      return `/uploads/${filename}`;
    }

    const beforeImageFile = formData.get('before_image');
    const afterImageFile = formData.get('after_image');

    const before_image_path = await saveFile(beforeImageFile, 'before', item.before_image);
    const after_image_path = await saveFile(afterImageFile, 'after', item.after_image);

    await db.query(
      `UPDATE embroidery_inspectors SET 
      tab_title = ?, badge_text = ?, title = ?, description = ?, design_size = ?, 
      stitch_count = ?, underlay_pathing = ?, pull_compensation = ?, thread_system = ?, 
      formats_provided = ?, button_text = ?, button_url = ?, before_image = ?, after_image = ?, sort_order = ? 
      WHERE id = ?`,
      [
        tab_title, badge_text, title, description, design_size, stitch_count, 
        underlay_pathing, pull_compensation, thread_system, formats_provided, 
        button_text, button_url, before_image_path, after_image_path, sort_order, id
      ]
    );

    redirect('/admin/home/embroidery');
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Embroidery Tab Item</h1>
        <Link href="/admin/home/embroidery" className="text-gray-600 hover:text-gray-900 text-sm">
          ← Back to List
        </Link>
      </div>

      <form action={handleUpdate} className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tab Title</label>
            <input type="text" name="tab_title" defaultValue={item.tab_title} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Badge Text</label>
            <input type="text" name="badge_text" defaultValue={item.badge_text} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Main Card Title</label>
            <input type="text" name="title" defaultValue={item.title} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Design Size</label>
            <input type="text" name="design_size" defaultValue={item.design_size} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stitch Count</label>
            <input type="text" name="stitch_count" defaultValue={item.stitch_count} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Underlay Pathing</label>
            <input type="text" name="underlay_pathing" defaultValue={item.underlay_pathing} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pull Compensation</label>
            <input type="text" name="pull_compensation" defaultValue={item.pull_compensation} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thread System</label>
            <input type="text" name="thread_system" defaultValue={item.thread_system} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Formats Provided</label>
            <input type="text" name="formats_provided" defaultValue={item.formats_provided} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="number" name="sort_order" defaultValue={item.sort_order} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Before Image (Leave blank to keep current)</label>
            <input type="file" name="before_image" accept="image/*" className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            {item.before_image && <p className="text-xs text-gray-500 mt-1">Current: {item.before_image}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">After Image (Leave blank to keep current)</label>
            <input type="file" name="after_image" accept="image/*" className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            {item.after_image && <p className="text-xs text-gray-500 mt-1">Current: {item.after_image}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows={3} defaultValue={item.description} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/home/embroidery" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</Link>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Update Item</button>
        </div>
      </form>
    </div>
  );
}