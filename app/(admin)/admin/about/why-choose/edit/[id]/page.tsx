import { getWhyChooseById, saveAboutWhyChoose } from '@/lib/aboutSplitActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface EditWhyChooseProps {
  params: Promise<{ id: string }>;
}

export default async function EditWhyChoosePage({ params }: EditWhyChooseProps) {
  const { id } = await params;
  const p = await getWhyChooseById(id);

  if (!p) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Pillar: {p.title}</h1>
          <p className="text-slate-500 text-xs mt-1">Update pillar details and value proposition description.</p>
        </div>
        <Link href="/admin/about/why-choose" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
          ← Back
        </Link>
      </div>

      <form action={saveAboutWhyChoose} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <input type="hidden" name="id" value={p.id} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
            <input type="text" name="title" required defaultValue={p.title} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
            <input type="text" name="icon" defaultValue={p.icon || '🎖️'} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
            <input type="text" name="subtitle" defaultValue={p.subtitle || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
            <input type="text" name="badge" defaultValue={p.badge || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Pillar Description *</label>
          <textarea name="description" required rows={4} defaultValue={p.description || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order</label>
            <input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Active Status</label>
            <select name="is_active" defaultValue={p.is_active ? '1' : '0'} className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link href="/admin/about/why-choose" className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
            Update Pillar
          </button>
        </div>
      </form>
    </div>
  );
}

