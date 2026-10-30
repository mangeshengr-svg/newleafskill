import { createService } from '@/lib/serviceActions';
import Link from 'next/link';

export default function AddServicePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Service</h1>
          <p className="text-slate-500 text-xs mt-1">
            Fill in the details to publish a new commercial service to the website and modal popup.
          </p>
        </div>
        <Link
          href="/admin/services"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Services
        </Link>
      </div>

      {/* Add Form */}
      <form action={createService} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Core Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Core Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. 3D Puff Digitizing (Raised Foam Relief)"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Slug (Optional, auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. 3d-puff-digitizing"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="num"
                defaultValue="07"
                required
                placeholder="e.g. 01, 02, 07"
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
                <option value="Cap & Curved Visor">Cap &amp; Curved Visor</option>
                <option value="3D Foam Puff">3D Foam Puff</option>
                <option value="Jacket Back">Jacket Back</option>
                <option value="Left Chest Uniform">Left Chest Uniform</option>
                <option value="Embroidered Patches">Embroidered Patches</option>
                <option value="Vector Art">Vector Art</option>
              </select>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge Pill Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="badge"
                required
                placeholder="e.g. Worldwide Favorite • 22+ Years"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tagline / Banner Tag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tag"
                required
                placeholder="e.g. Master Hand-Punched Files"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image Uploads (File inputs only - No text path!) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Service Images (File Upload)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary Showcase Image */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Primary Showcase Image <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-slate-500">
                Main card image shown on Home and Services page (Portrait 7:10 recommended).
              </p>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>

            {/* Secondary Production Sewout Image */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Secondary Production Sewout Image (Optional)
              </label>
              <p className="text-[11px] text-slate-500">
                Secondary sewout preview shown in the detailed popup modal.
              </p>
              <input
                type="file"
                name="secondary_image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white hover:file:bg-slate-800 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Descriptions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Descriptions &amp; Detailed Content
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short Summary Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="short_desc"
              rows={2}
              required
              placeholder="Concise 1-2 sentence overview shown directly on the service card..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Description Paragraphs (Separate paragraphs with an empty line)
            </label>
            <textarea
              name="full_desc"
              rows={4}
              placeholder="Paragraph 1...&#10;&#10;Paragraph 2...&#10;&#10;Paragraph 3..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Key Technical Highlights (One per line or comma-separated)
            </label>
            <textarea
              name="key_highlights"
              rows={3}
              placeholder="Over 22 years of veteran manual digitizing expertise&#10;Standard turnaround within 6 to 8 hours&#10;100% Free and unlimited minor revisions"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sub-Offerings &amp; Applications (One per line in &quot;Title: Description&quot; format)
            </label>
            <textarea
              name="sub_offerings"
              rows={4}
              placeholder="Left Chest &amp; Polo: Sized perfectly for corporate shirts&#10;Cap &amp; Hat Digitizing: Calibrated for curved 6-panel headwear&#10;Custom Patch: Merrowed border with tear-away backing"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Section 4: Technical Specifications */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            4. Production Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Turnaround Time
              </label>
              <input
                type="text"
                name="turnaround"
                defaultValue="6–8 Hours (2h Rush Available)"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Revisions Policy
              </label>
              <input
                type="text"
                name="revisions"
                defaultValue="100% Free &amp; Unlimited"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supported Machine Formats (Comma-separated)
            </label>
            <input
              type="text"
              name="machine_formats"
              defaultValue="DST (Tajima), PES (Brother), EXP (Melco), JEF (Janome), DSB (Barudan), EMB (Wilcom)"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Calibrated Fabrics (Comma-separated)
            </label>
            <input
              type="text"
              name="fabrics"
              defaultValue="Cotton, Pique Polo, Fleece & Hoodies, Twill Caps, Performance Polyester, Denim & Canvas"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target Industries (Comma-separated)
            </label>
            <input
              type="text"
              name="target_industries"
              defaultValue="Embroidery Shops, Apparel Decorators, Corporate Merchandisers, Sports Teams"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/services"
            className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-emerald-600/20 hover:scale-[1.01] transition cursor-pointer"
          >
            Save &amp; Publish Service 🚀
          </button>
        </div>

      </form>
    </div>
  );
}
