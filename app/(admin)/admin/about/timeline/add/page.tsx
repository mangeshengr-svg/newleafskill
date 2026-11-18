import { saveAboutTimeline } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default function AddTimelinePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Heritage Milestone</h1>
          <p className="text-slate-500 text-xs mt-1">Add a chronological year milestone to the heritage timeline.</p>
        </div>
        <Link href="/admin/about/timeline" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
          ← Back
        </Link>
      </div>

      <form action={saveAboutTimeline} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Year *</label>
            <input type="text" name="year" required placeholder="e.g. 2004" className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Highlight Badge</label>
            <input type="text" name="highlight" placeholder="e.g. Hand-coded stitch sequencing" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Headline *</label>
          <input type="text" name="title" required placeholder="e.g. Studio Foundation & Manual Punching" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
          <input type="text" name="tagline" placeholder="e.g. Crafting the Art of Machine Embroidery" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Description *</label>
          <textarea name="description" required rows={4} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order</label>
            <input type="number" name="sort_order" defaultValue={0} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Active Status</label>
            <select name="is_active" className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link href="/admin/about/timeline" className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
            Save Milestone
          </button>
        </div>
      </form>
    </div>
  );
}

