import { addStitchCategory } from '@/lib/stitchActions';
import Link from 'next/link';

export default function AddStitchCategoryPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Add Stitch Category</h1>
        <Link href="/admin/home/stitch-categories" className="text-xs font-bold text-slate-600 hover:underline">
          ← Back to List
        </Link>
      </div>

      <form action={addStitchCategory} className="bg-white p-6 rounded-2xl shadow border border-slate-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Category Key (e.g. cap, puff)</label>
          <input type="text" name="key" required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tab Label</label>
          <input type="text" name="tabLabel" required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
          <input type="text" name="title" required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
          <input type="text" name="badge" required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea name="desc" rows={3} required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Typical Stitches</label>
            <input type="text" name="stitches" required className="w-full p-2.5 border rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Turnaround Time</label>
            <input type="text" name="time" required className="w-full p-2.5 border rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Features (Comma Separated)</label>
          <input type="text" name="features" placeholder="Feature 1, Feature 2, Feature 3" required className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        {/* IMAGE UPLOAD INPUT */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Upload Image</label>
          <input type="file" name="image" accept="image/*" required className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order</label>
          <input type="number" name="sortOrder" defaultValue="0" className="w-full p-2.5 border rounded-xl text-xs" />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow hover:bg-emerald-700 cursor-pointer">
          Save Category 🚀
        </button>
      </form>
    </div>
  );
}