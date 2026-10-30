import { getWhyChooseUsById, updateWhyChooseUs } from '@/lib/whyChooseUsActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

export default async function EditWhyChooseUsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) notFound();

  const item = await getWhyChooseUsById(id);
  if (!item) notFound();

  let parsedPillars: any[] = [];
  try {
    parsedPillars = typeof item.pillars === 'string' ? JSON.parse(item.pillars) : item.pillars;
  } catch (e) {
    parsedPillars = [];
  }

  let parsedCapabilities: string[] = [];
  try {
    parsedCapabilities = typeof item.capabilities === 'string' ? JSON.parse(item.capabilities) : item.capabilities;
  } catch (e) {
    parsedCapabilities = [];
  }

  const p1 = parsedPillars[0] || { icon: '⏱️', title: 'Fast Turnaround', description: '6–8 hour standard turnaround with 2–4 hour rush dispatch available.' };
  const p2 = parsedPillars[1] || { icon: '🎯', title: 'Error-Free Digitizing', description: 'Calibrated stitch density, smart underlay, and zero thread breaks.' };
  const p3 = parsedPillars[2] || { icon: '💰', title: 'Affordable Pricing', description: 'Transparent flat rates from $10 / ₹350 without any hidden setup costs.' };
  const p4 = parsedPillars[3] || { icon: '🤝', title: 'Reliable 24/7 Support', description: '100% free unlimited edits until your sewout runs perfectly on fabric.' };

  const capabilitiesString = Array.isArray(parsedCapabilities)
    ? parsedCapabilities.join(', ')
    : '';

  const updateAction = updateWhyChooseUs.bind(null, item.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Why Choose Us Section #{item.id}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update studio photo, telemetry trust badges, core value pillars, and capabilities.
          </p>
        </div>
        <Link
          href="/admin/why-choose-us"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Why Choose Us
        </Link>
      </div>

      {/* Edit Form */}
      <form action={updateAction} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Hidden Existing Image */}
        <input type="hidden" name="existing_image" value={item.image || '/why-choose-us.jpg'} />

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
                defaultValue={item.eyebrow || 'Why Choose Us:'}
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
                defaultValue={item.title}
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
                defaultValue={item.subtitle}
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
                defaultValue={item.sort_order ?? 0}
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
                defaultValue={item.is_active ? '1' : '0'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published on Home)</option>
                <option value="0">Inactive (Draft / Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload (File input with preview - no path input) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Studio Showcase Photograph (File Upload)
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Studio Feature Image
            </label>

            {/* Current Image Preview */}
            {item.image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-16 object-cover rounded-lg border border-slate-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Photo</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{item.image}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Image (Optional - replaces current photo)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Studio Badge (Bottom overlay on photo)
              </label>
              <input
                type="text"
                name="studio_badge"
                defaultValue={item.studio_badge || 'Master Studio & Craftsmanship'}
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
                defaultValue={item.studio_desc || ''}
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
                  defaultValue={item.experience_years || '22+'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Title</label>
                <input
                  type="text"
                  name="experience_title"
                  defaultValue={item.experience_title || 'Years Experience'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Subtitle</label>
                <input
                  type="text"
                  name="experience_sub"
                  defaultValue={item.experience_sub || 'Since 2002 • Pioneer Punchers'}
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
                  defaultValue={item.badge2_icon || '⚡'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Title</label>
                <input
                  type="text"
                  name="badge2_title"
                  defaultValue={item.badge2_title || 'Machine-Ready Files'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Subtitle</label>
                <input
                  type="text"
                  name="badge2_sub"
                  defaultValue={item.badge2_sub || 'Zero thread breaks • 100% Tested'}
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
              defaultValue={item.description_1}
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
              defaultValue={item.description_2 || ''}
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
              defaultValue={item.description_3 || ''}
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
                    defaultValue={p1.icon}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar1_title"
                    defaultValue={p1.title}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar1_desc"
                  rows={2}
                  defaultValue={p1.description}
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
                    defaultValue={p2.icon}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar2_title"
                    defaultValue={p2.title}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar2_desc"
                  rows={2}
                  defaultValue={p2.description}
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
                    defaultValue={p3.icon}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar3_title"
                    defaultValue={p3.title}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar3_desc"
                  rows={2}
                  defaultValue={p3.description}
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
                    defaultValue={p4.icon}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500">Title</label>
                  <input
                    type="text"
                    name="pillar4_title"
                    defaultValue={p4.title}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500">Description</label>
                <textarea
                  name="pillar4_desc"
                  rows={2}
                  defaultValue={p4.description}
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
              defaultValue={capabilitiesString}
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
                defaultValue={item.btn1_text || 'Request Free Digitizing Quote'}
                placeholder="Button Text"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
              />
              <input
                type="text"
                name="btn1_link"
                defaultValue={item.btn1_link || '#quote'}
                placeholder="Button Link URL (e.g. #quote)"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white font-mono text-[11px]"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Secondary Button</span>
              <input
                type="text"
                name="btn2_text"
                defaultValue={item.btn2_text || 'View Our Work'}
                placeholder="Button Text"
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
              />
              <input
                type="text"
                name="btn2_link"
                defaultValue={item.btn2_link || '/our-work'}
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
            Update Why Choose Us Section ⚡
          </button>
        </div>

      </form>
    </div>
  );
}
