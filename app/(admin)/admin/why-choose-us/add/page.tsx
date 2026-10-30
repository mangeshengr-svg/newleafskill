import { createWhyChooseUs } from '@/lib/whyChooseUsActions';
import Link from 'next/link';

export default function AddWhyChooseUsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Why Choose Us Section</h1>
          <p className="text-slate-500 text-xs mt-1">
            Configure studio showcase photograph, telemetry badges, core value pillars, and capabilities.
          </p>
        </div>
        <Link
          href="/admin/why-choose-us"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Why Choose Us
        </Link>
      </div>

      {/* Add Form */}
      <form action={createWhyChooseUs} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Main Identity */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Section Identity &amp; Headings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Eyebrow Pill Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="eyebrow"
                required
                defaultValue="Why Choose Us:"
                placeholder="e.g. Why Choose Us:"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Heading Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue="New Leaf Skills"
                placeholder="e.g. New Leaf Skills"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subheading / Tagline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subtitle"
                required
                defaultValue="Global Embroidery Digitizing & Punching Excellence"
                placeholder="e.g. Global Embroidery Digitizing & Punching Excellence"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue="1"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published on Home)</option>
                <option value="0">Inactive (Draft / Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload (File input only - no path) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Studio Showcase Photograph (File Upload)
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Studio Feature Image <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Upload high-quality studio workshop or sewout photograph (Recommended size: 535x485 or 4:3 ratio).
            </p>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Studio Badge (Bottom overlay on photo)
              </label>
              <input
                type="text"
                name="studio_badge"
                defaultValue="Master Studio & Craftsmanship"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Studio Description Overlay
              </label>
              <input
                type="text"
                name="studio_desc"
                defaultValue="Dedicated digitization facility with live Tajima & Barudan testing beds."
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Floating Badges */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Floating Stats &amp; Trust Badges
          </h3>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Badge 1: Experience Chip (Top Right of Photo)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Years Count</label>
                <input
                  type="text"
                  name="experience_years"
                  defaultValue="22+"
                  placeholder="22+"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Title</label>
                <input
                  type="text"
                  name="experience_title"
                  defaultValue="Years Experience"
                  placeholder="Years Experience"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Subtitle</label>
                <input
                  type="text"
                  name="experience_sub"
                  defaultValue="Since 2002 • Pioneer Punchers"
                  placeholder="Since 2002 • Pioneer Punchers"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Badge 2: Quality Chip (Bottom Left of Photo)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon / Emoji</label>
                <input
                  type="text"
                  name="badge2_icon"
                  defaultValue="⚡"
                  placeholder="⚡"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Title</label>
                <input
                  type="text"
                  name="badge2_title"
                  defaultValue="Machine-Ready Files"
                  placeholder="Machine-Ready Files"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Subtitle</label>
                <input
                  type="text"
                  name="badge2_sub"
                  defaultValue="Zero thread breaks • 100% Tested"
                  placeholder="Zero thread breaks • 100% Tested"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Description Paragraphs */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            4. Description Paragraphs
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Paragraph 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description_1"
              required
              rows={3}
              defaultValue="With over 22 years of experience, New Leaf Skills delivers professional Embroidery Digitizing Services with a strong focus on quality, accuracy, and customer satisfaction. Our skilled digitizers create machine-ready embroidery files that ensure smooth production and excellent stitch results."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Paragraph 2
            </label>
            <textarea
              name="description_2"
              rows={3}
              defaultValue="We provide a wide range of services, including Custom Logo Digitizing, 3D Puff Digitizing, Cap Digitizing, Patch Digitizing, Applique Digitizing, Vestments Embroidery, and Irish Dance Dress Embroidery for clients across India and worldwide."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Paragraph 3
            </label>
            <textarea
              name="description_3"
              rows={3}
              defaultValue="Our commitment to fast turnaround, affordable pricing, error-free digitizing, and reliable support makes us a trusted choice for embroidery businesses, apparel brands, and designers looking for high-quality embroidery solutions."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Section 5: 4 Core Pillars */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            5. Core Pillars
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pillar 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Pillar 1</span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Icon</label>
                  <input
                    type="text"
                    name="pillar1_icon"
                    defaultValue="⏱️"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar1_title"
                    defaultValue="Fast Turnaround"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar1_desc"
                  rows={2}
                  defaultValue="6–8 hour standard turnaround with 2–4 hour rush dispatch available."
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Pillar 2</span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Icon</label>
                  <input
                    type="text"
                    name="pillar2_icon"
                    defaultValue="🎯"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar2_title"
                    defaultValue="Error-Free Digitizing"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar2_desc"
                  rows={2}
                  defaultValue="Calibrated stitch density, smart underlay, and zero thread breaks."
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Pillar 3</span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Icon</label>
                  <input
                    type="text"
                    name="pillar3_icon"
                    defaultValue="💰"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar3_title"
                    defaultValue="Affordable Pricing"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar3_desc"
                  rows={2}
                  defaultValue="Transparent flat rates from $10 / ₹350 without any hidden setup costs."
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Pillar 4</span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500">Icon</label>
                  <input
                    type="text"
                    name="pillar4_icon"
                    defaultValue="🤝"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar4_title"
                    defaultValue="Reliable 24/7 Support"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar4_desc"
                  rows={2}
                  defaultValue="100% free unlimited edits until your sewout runs perfectly on fabric."
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Featured Capabilities */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            6. Featured Capabilities Pills
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Capabilities (Comma or Newline separated)
            </label>
            <textarea
              name="capabilities"
              rows={3}
              defaultValue="Custom Logo Digitizing, 3D Puff Digitizing, Cap Digitizing, Patch Digitizing, Applique Digitizing, Vestments Embroidery, Irish Dance Dress Embroidery"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Each capability displays as an emerald badge on the frontend.
            </p>
          </div>
        </div>

        {/* Section 7: Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            7. Action Buttons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Primary Button</span>
              <input
                type="text"
                name="btn1_text"
                defaultValue="Request Free Digitizing Quote"
                placeholder="Button Text"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
              />
              <input
                type="text"
                name="btn1_link"
                defaultValue="#quote"
                placeholder="Button Link URL (e.g. #quote)"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white font-mono text-[11px]"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Secondary Button</span>
              <input
                type="text"
                name="btn2_text"
                defaultValue="View Our Work"
                placeholder="Button Text"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
              />
              <input
                type="text"
                name="btn2_link"
                defaultValue="/our-work"
                placeholder="Button Link URL (e.g. /our-work)"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Link
            href="/admin/why-choose-us"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Publish Why Choose Us Section ⚡
          </button>
        </div>

      </form>
    </div>
  );
}
