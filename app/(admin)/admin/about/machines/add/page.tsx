import { saveAboutMachine } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default function AddMachinePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Machine Brand Profile</h1>
          <p className="text-slate-500 text-xs mt-1">Configure format specs and calibration presets for a commercial embroidery brand.</p>
        </div>
        <Link href="/admin/about/machines" className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition">
          ← Back
        </Link>
      </div>

      <form action={saveAboutMachine} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brand Key (id) *</label>
            <input type="text" name="machine_id" required placeholder="e.g. tajima" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name *</label>
            <input type="text" name="brand" required placeholder="e.g. Tajima" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
          <input type="text" name="tagline" placeholder="e.g. Global Commercial Industry Leader" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Native Format *</label>
            <input type="text" name="native_format" required placeholder="e.g. .DST" className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">All Supported Formats (comma-separated)</label>
            <input type="text" name="all_formats" placeholder=".DST, .TCF, .TBF" className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tested Max Speed (SPM)</label>
            <input type="text" name="max_spm" defaultValue="1,200 SPM" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trimming System</label>
            <input type="text" name="trim_system" placeholder="e.g. High-speed automated jump trim & picker" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tension Calibration Preset</label>
            <input type="text" name="tension_preset" placeholder="e.g. 110–120g top tension / 25–30g bobbin" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Recommended Needle</label>
          <input type="text" name="needle_recommendation" placeholder="e.g. Organ DBxK5 #75/11 SES Ballpoint" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Best Use Application</label>
          <textarea name="best_use" rows={3} placeholder="e.g. High-speed multi-head production runs, left chest logos & corporate jackets" className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
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
          <Link href="/admin/about/machines" className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
            Save Machine
          </button>
        </div>
      </form>
    </div>
  );
}

