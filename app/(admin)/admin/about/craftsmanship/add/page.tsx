import { saveCraftsmanshipLayer } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default function AddCraftsmanshipPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Craftsmanship Layer</h1>
          <p className="text-slate-500 text-xs mt-1">Add a new layer to the interactive 5-layer stitch anatomy.</p>
        </div>
        <Link href="/admin/about/craftsmanship" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
          ← Back
        </Link>
      </div>

      <form action={saveCraftsmanshipLayer} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Unique Layer Key (id) *</label>
            <input type="text" name="layer_id" required placeholder="e.g. underlay" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Layer Number *</label>
            <input type="text" name="layer_number" required placeholder="e.g. Layer 01" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
            <input type="text" name="icon" defaultValue="🪡" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Layer Name *</label>
            <input type="text" name="name" required placeholder="e.g. Engineered Underlay Scaffolding" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
            <input type="text" name="badge" placeholder="e.g. Zero Puckering" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
          <input type="text" name="tagline" placeholder="e.g. The Hidden Foundation of Stitch Stability" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea name="description" rows={3} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Technical Specification Note</label>
          <input type="text" name="technical_spec" placeholder="e.g. Underlay stitch spacing: 2.2mm–3.5mm" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/60 space-y-2">
            <label className="block text-xs font-bold text-red-900">The Cheap Auto-Trace Flaw</label>
            <textarea name="auto_trace_problem" rows={3} placeholder="What goes wrong with automated digitizing..." className="w-full p-3 border border-red-200 rounded-xl text-xs bg-white" />
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
            <label className="block text-xs font-bold text-emerald-900">New Leaf Skills Manual Solution</label>
            <textarea name="our_manual_solution" rows={3} placeholder="How our master punchers engineer this..." className="w-full p-3 border border-emerald-200 rounded-xl text-xs bg-white" />
          </div>
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
          <Link href="/admin/about/craftsmanship" className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
            Save Layer
          </button>
        </div>
      </form>
    </div>
  );
}

