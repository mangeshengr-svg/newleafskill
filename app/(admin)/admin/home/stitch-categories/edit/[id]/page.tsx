import pool from '@/lib/db';
import { updateStitchCategory } from '@/lib/stitchActions';
import Link from 'next/link';

// Next.js ko batane ke liye ki uncached dynamic data/blocking allowed hai
export const instant = false;

export default async function EditStitchCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [rows]: any = await pool.query('SELECT * FROM stitch_categories WHERE id = ?', [resolvedParams.id]);
  const category = rows[0];

  if (!category) {
    return <div className="p-8">Category not found</div>;
  }

  let featuresString = '';
  try {
    const parsed = typeof category.features === 'string' ? JSON.parse(category.features) : category.features;
    featuresString = Array.isArray(parsed) ? parsed.join(', ') : '';
  } catch (e) {
    featuresString = category.features || '';
  }

  const updateActionWithId = updateStitchCategory.bind(null, category.id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Edit Stitch Category</h1>
        <Link href="/admin/home/stitch-categories" className="text-xs font-bold text-slate-600 hover:underline">
          ← Back to List
        </Link>
      </div>

      <form action={updateActionWithId} className="bg-white p-6 rounded-2xl shadow border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Category Key</label>
          <input type="text" name="key" defaultValue={category.category_key} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tab Label</label>
          <input type="text" name="tabLabel" defaultValue={category.tab_label} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
          <input type="text" name="title" defaultValue={category.title} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
          <input type="text" name="badge" defaultValue={category.badge} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea name="desc" rows={3} defaultValue={category.description} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Typical Stitches</label>
            <input type="text" name="stitches" defaultValue={category.stitches} required className="w-full p-2.5 border rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Turnaround Time</label>
            <input type="text" name="time" defaultValue={category.turnaround_time} required className="w-full p-2.5 border rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Features (Comma Separated)</label>
          <input type="text" name="features" defaultValue={featuresString} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Current Image</label>
          <img src={category.image_url} alt="Preview" className="w-20 h-20 object-cover rounded-lg mb-2 border" />
          <label className="block text-xs font-bold text-slate-700 mb-1">Upload New Image (Optional)</label>
          <input type="file" name="image" accept="image/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order</label>
          <input type="number" name="sortOrder" defaultValue={category.sort_order} className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow hover:bg-emerald-700 cursor-pointer">
          Update Category 🚀
        </button>
      </form>
    </div>
  );
}