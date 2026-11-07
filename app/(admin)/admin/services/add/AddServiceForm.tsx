'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { createService } from '@/lib/serviceActions';

interface AddServiceFormProps {
  categories: any[];
}

export default function AddServiceForm({ categories }: AddServiceFormProps) {
  // Main parent categories
  const mainCategories = useMemo(
    () => categories.filter((c) => !c.parent_id),
    [categories]
  );

  const [selectedParentId, setSelectedParentId] = useState<string>(
    mainCategories[0] ? String(mainCategories[0].id) : ''
  );
  const [selectedSubId, setSelectedSubId] = useState<string>('');

  // Available subcategories for the selected parent
  const availableSubcategories = useMemo(() => {
    if (!selectedParentId) return [];
    return categories.filter((c) => String(c.parent_id) === String(selectedParentId));
  }, [categories, selectedParentId]);

  return (
    <form action={createService} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      
      {/* Section 1: Core Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            1. Core Information
          </h3>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
            Database Linked
          </span>
        </div>

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

        {/* Dynamic Category & Subcategory Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/40 via-indigo-50/30 to-slate-50 border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-black text-slate-800">
                📁 Main Category <span className="text-red-500">*</span>
              </label>
              <Link
                href="/admin/services/categories/add"
                target="_blank"
                className="text-[10px] font-bold text-emerald-700 hover:underline"
              >
                + New Main
              </Link>
            </div>
            <select
              name="category_id"
              value={selectedParentId}
              onChange={(e) => {
                setSelectedParentId(e.target.value);
                setSelectedSubId('');
              }}
              required
              className="w-full p-2.5 border-2 border-emerald-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-xs"
            >
              <option value="">-- Choose Main Category --</option>
              {mainCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  📁 {c.name}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500 mt-1">Select main top-level service category.</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-black text-slate-800">
                ↳ 🏷️ Subcategory (Optional)
              </label>
              {selectedParentId && (
                <Link
                  href={`/admin/services/categories/subcategories/add?parent_id=${selectedParentId}`}
                  target="_blank"
                  className="text-[10px] font-bold text-indigo-700 hover:underline"
                >
                  + New Sub
                </Link>
              )}
            </div>
            <select
              name="subcategory_id"
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="w-full p-2.5 border-2 border-indigo-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-xs"
            >
              <option value="">
                {availableSubcategories.length === 0
                  ? (selectedParentId ? '-- No subcategories under this category --' : '-- Select Main Category First --')
                  : '-- Choose Subcategory (Optional) --'}
              </option>
              {availableSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  ↳ {sub.name}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500 mt-1">Auto-filtered based on selected main category.</p>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1">
              Display Number &amp; Sort
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="num"
                defaultValue="07"
                required
                placeholder="Num: 01"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <input
                type="number"
                name="sort_order"
                defaultValue="0"
                placeholder="Order: 0"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Catalog ordering index.</p>
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

      {/* Section 2: SEO Meta Fields & Alt Tags */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎯</span>
            <span>2. Search Engine Optimization (SEO) &amp; Meta Tags</span>
          </h3>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
            Recommended for Ranking
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Meta Title (Search Engine Title Tag)
            </label>
            <input
              type="text"
              name="meta_title"
              placeholder="e.g. Custom 3D Puff Embroidery Digitizing Services | NewLeaf Skills"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">Leaves blank to use auto service title.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Image Alt Tag (Accessibility &amp; Google Images)
            </label>
            <input
              type="text"
              name="image_alt"
              placeholder="e.g. Master commercial 3D puff cap embroidery digitizing sewout sample"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Meta Description (SERP Snippet Description)
          </label>
          <textarea
            name="meta_description"
            rows={2}
            placeholder="High-converting 150-160 characters summary displayed in Google search results..."
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Section 3: Image Uploads */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          3. Service Images (File Upload)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

      {/* Section 4: Descriptions */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          4. Descriptions &amp; Detailed Content
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

      {/* Section 5: Technical Specifications */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          5. Production Specifications
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
  );
}

