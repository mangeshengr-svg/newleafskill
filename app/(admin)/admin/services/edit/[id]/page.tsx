import pool from '@/lib/db';
import { updateService } from '@/lib/serviceActions';
import Link from 'next/link';

export const instant = false;

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [rows]: any = await pool.query('SELECT * FROM services WHERE id = ? LIMIT 1', [id]);
  const service = rows[0];

  if (!service) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-xs text-slate-500">The requested service ID #{id} does not exist in the database.</p>
        <Link
          href="/admin/services"
          className="inline-block bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          ← Back to Services List
        </Link>
      </div>
    );
  }

  // Parse JSON data for form display
  const fullDescArr: string[] = safeParseJson(service.full_desc, []);
  const fullDescText = Array.isArray(fullDescArr) ? fullDescArr.join('\n\n') : '';

  const keyHighlightsArr: string[] = safeParseJson(service.key_highlights, []);
  const keyHighlightsText = Array.isArray(keyHighlightsArr) ? keyHighlightsArr.join('\n') : '';

  const subOfferingsArr: any[] = safeParseJson(service.sub_offerings, []);
  const subOfferingsText = Array.isArray(subOfferingsArr)
    ? subOfferingsArr.map((s: any) => `${s.title}: ${s.desc}`).join('\n')
    : '';

  const fabricsArr: string[] = safeParseJson(service.fabrics, []);
  const fabricsText = Array.isArray(fabricsArr) ? fabricsArr.join(', ') : '';

  const machineFormatsArr: string[] = safeParseJson(service.machine_formats, []);
  const machineFormatsText = Array.isArray(machineFormatsArr) ? machineFormatsArr.join(', ') : '';

  const targetIndustriesArr: string[] = safeParseJson(service.target_industries, []);
  const targetIndustriesText = Array.isArray(targetIndustriesArr) ? targetIndustriesArr.join(', ') : '';

  const updateActionWithId = updateService.bind(null, service.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Service: {service.title}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update service specifications, text, tags, or upload new images.
          </p>
        </div>
        <Link
          href="/admin/services"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Services
        </Link>
      </div>

      {/* Edit Form */}
      <form action={updateActionWithId} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
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
                defaultValue={service.title}
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                defaultValue={service.slug}
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="num"
                defaultValue={service.num}
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                defaultValue={service.category}
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
                defaultValue={service.sort_order ?? 0}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue={service.is_active ? '1' : '0'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published)</option>
                <option value="0">Inactive (Hidden)</option>
              </select>
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
                defaultValue={service.badge}
                required
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
                defaultValue={service.tag}
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image Uploads */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Service Images (File Upload)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary Showcase Image */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Primary Showcase Image
              </label>
              {service.image && (
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                  <img
                    src={service.image}
                    alt="Current Thumbnail"
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Image</span>
                    <span className="text-xs text-slate-500 truncate block max-w-[200px]">{service.image}</span>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Upload New Image (Optional - replaces current)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
                />
              </div>
            </div>

            {/* Secondary Image */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Secondary Production Sewout Image
              </label>
              {service.secondary_image ? (
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                  <img
                    src={service.secondary_image}
                    alt="Current Secondary Thumbnail"
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-700 block">Current Secondary Image</span>
                    <span className="text-xs text-slate-500 truncate block max-w-[200px]">{service.secondary_image}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic">No secondary image currently set.</p>
              )}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Upload New Secondary Image (Optional)
                </label>
                <input
                  type="file"
                  name="secondary_image"
                  accept="image/*"
                  className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white hover:file:bg-slate-800 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Descriptions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Descriptions &amp; Content
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short Summary Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="short_desc"
              rows={2}
              defaultValue={service.short_desc}
              required
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
              defaultValue={fullDescText}
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
              defaultValue={keyHighlightsText}
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
              defaultValue={subOfferingsText}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Section 4: Specifications */}
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
                defaultValue={service.turnaround}
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
                defaultValue={service.revisions}
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
              defaultValue={machineFormatsText}
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
              defaultValue={fabricsText}
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
              defaultValue={targetIndustriesText}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
            Update Service 🚀
          </button>
        </div>

      </form>
    </div>
  );
}
