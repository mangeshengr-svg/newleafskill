import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export const instant = false;

export default function AddEmbroideryPage() {
  async function handleSubmit(formData: FormData) {
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

    // Helper function to handle file uploads
    async function saveFile(fileEntry: FormDataEntryValue | null, prefix: string) {
      if (!fileEntry || typeof fileEntry === 'string' || fileEntry.size === 0) return null;
      
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

    // Process uploaded images
    const beforeImageFile = formData.get('before_image');
    const afterImageFile = formData.get('after_image');

    const before_image_path = await saveFile(beforeImageFile, 'before');
    const after_image_path = await saveFile(afterImageFile, 'after');

    if (!before_image_path || !after_image_path) {
      throw new Error('Both Before and After images are required!');
    }

    await db.query(
      `INSERT INTO embroidery_inspectors 
      (tab_title, badge_text, title, description, design_size, stitch_count, underlay_pathing, pull_compensation, thread_system, formats_provided, button_text, button_url, before_image, after_image, sort_order) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tab_title, badge_text, title, description, design_size, stitch_count, 
        underlay_pathing, pull_compensation, thread_system, formats_provided, 
        button_text, button_url, before_image_path, after_image_path, sort_order
      ]
    );

    redirect('/admin/home/embroidery');
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Embroidery Tab Item</h1>
        <Link href="/admin/home/embroidery" className="text-gray-600 hover:text-gray-900 text-sm">
          ← Back to List
        </Link>
      </div>

      <form action={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tab Title (e.g., Majestic Sports Crest)</label>
            <input type="text" name="tab_title" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Badge Text (e.g., HIGH-DENSITY TATAMI)</label>
            <input type="text" name="badge_text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Main Card Title (e.g., Eagle Sports Crest)</label>
            <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Design Size</label>
            <input type="text" name="design_size" placeholder='3.8" W x 4.2" H' className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stitch Count</label>
            <input type="text" name="stitch_count" placeholder="14,850 Stitches" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Underlay Pathing</label>
            <input type="text" name="underlay_pathing" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pull Compensation</label>
            <input type="text" name="pull_compensation" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thread System</label>
            <input type="text" name="thread_system" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Formats Provided</label>
            <input type="text" name="formats_provided" placeholder="DST, PES, EXP, JEF + PDF" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="number" name="sort_order" defaultValue={0} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Before Image (Vector Art File)</label>
            <input type="file" name="before_image" accept="image/*" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">After Image (Stitched DST File)</label>
            <input type="file" name="after_image" accept="image/*" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/home/embroidery" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</Link>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Save Item</button>
        </div>
      </form>
    </div>
  );
}