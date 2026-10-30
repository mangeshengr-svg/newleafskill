import { createWorkProject } from '@/lib/workActions';
import Link from 'next/link';

export default function AddWorkProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Work Project</h1>
          <p className="text-slate-500 text-xs mt-1">
            Fill in the telemetry and sewout details to publish a new embroidery sample to the portfolio.
          </p>
        </div>
        <Link
          href="/admin/our-work"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Our Work
        </Link>
      </div>

      {/* Add Form */}
      <form action={createWorkProject} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Core Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Royal Crest Gold Monogram"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Caps & 3D Puff">Caps &amp; 3D Puff</option>
                <option value="Apparel & Corporate">Apparel &amp; Corporate</option>
                <option value="Patches & Crests">Patches &amp; Crests</option>
                <option value="Jacket Backs">Jacket Backs</option>
                <option value="Vestments & Borders">Vestments &amp; Borders</option>
                <option value="Fine Art & Floral">Fine Art &amp; Floral</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge / Tag Pill <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tag"
                required
                placeholder="e.g. Fine Thread Detail, Metallic Thread Run, High Density Tatami"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                defaultValue="0"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Sewout Image Upload (File Input Only) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Sewout Photo Upload
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Project Sewout Image <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Upload genuine machine sewout or digitized artwork sample (Square or 4:3 aspect recommended).
            </p>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>
        </div>

        {/* Section 3: Technical Telemetry Specifications */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Production Telemetry &amp; Specs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stitches Count <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stitches"
                required
                placeholder="e.g. 16,200"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Colors / Threads <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="colors"
                required
                placeholder="e.g. 5 Poly Colors, Gold Metallic + Black"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Fabric <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fabric"
                required
                placeholder="e.g. Silk & Linen Blend, Pique Polo Knit, Velvet"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tested Machine <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="machine"
                required
                defaultValue="Tajima 1,000 SPM"
                placeholder="e.g. Tajima 1,000 SPM, Barudan Elite, Melco EMT16X"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Turnaround Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="turnaround"
                required
                defaultValue="6 Hours"
                placeholder="e.g. 6 Hours, 4-6 Hours"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Descriptions & Punching Notes */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            4. Descriptions &amp; Digitizer Notes
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Precision floral branch punch with multi-layered satin petals and delicate filigree curve tracking..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Veteran Digitizer Punching Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              name="punching_notes"
              rows={3}
              required
              placeholder="Edge-walk underlay foundations prevent thread sinkage into fine weave linens while maintaining feather-soft drape..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/our-work"
            className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-emerald-600/20 hover:scale-[1.01] transition cursor-pointer"
          >
            Publish Work Project 🚀
          </button>
        </div>

      </form>
    </div>
  );
}
