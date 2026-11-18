import { getGlobalPresenceById, saveAboutGlobalPresence } from '@/lib/aboutSplitActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface EditGlobalPresenceProps {
  params: Promise<{ id: string }>;
}

export default async function EditGlobalPresencePage({ params }: EditGlobalPresenceProps) {
  const { id } = await params;
  const r = await getGlobalPresenceById(id);

  if (!r) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Region: {r.country}</h1>
          <p className="text-slate-500 text-xs mt-1">Update presence metrics for {r.country}.</p>
        </div>
        <Link href="/admin/about/global-presence" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
          ← Back
        </Link>
      </div>

      <form action={saveAboutGlobalPresence} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <input type="hidden" name="id" value={r.id} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Country / Region Name *</label>
            <input type="text" name="country" required defaultValue={r.country} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Flag Emoji</label>
            <input type="text" name="flag" defaultValue={r.flag || '🌍'} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Production Volume %</label>
            <input type="text" name="percentage" defaultValue={r.percentage || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Highlight Tag</label>
            <input type="text" name="highlight" defaultValue={r.highlight || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Key Metro Markets / Cities</label>
          <input type="text" name="cities" defaultValue={r.cities || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order</label>
            <input type="number" name="sort_order" defaultValue={r.sort_order ?? 0} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Active Status</label>
            <select name="is_active" defaultValue={r.is_active ? '1' : '0'} className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link href="/admin/about/global-presence" className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
            Update Region
          </button>
        </div>
      </form>
    </div>
  );
}

