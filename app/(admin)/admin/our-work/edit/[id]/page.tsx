import pool from '@/lib/db';
import { updateWorkProject } from '@/lib/workActions';
import Link from 'next/link';

export const instant = false;

export default async function EditWorkProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [rows]: any = await pool.query('SELECT * FROM our_work WHERE id = ? LIMIT 1', [id]);
  const project = rows[0];

  if (!project) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-xs text-slate-500">The requested work project ID #{id} does not exist in the database.</p>
        <Link
          href="/admin/our-work"
          className="inline-block bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          ← Back to Our Work List
        </Link>
      </div>
    );
  }

  const updateActionWithId = updateWorkProject.bind(null, project.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Work Project: {project.title}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update sewout telemetry, descriptions, or upload a new photo.
          </p>
        </div>
        <Link
          href="/admin/our-work"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Our Work
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
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={project.title}
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
                defaultValue={project.category}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge / Tag Pill <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tag"
                defaultValue={project.tag}
                required
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
                defaultValue={project.sort_order ?? 0}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue={project.is_active ? '1' : '0'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published)</option>
                <option value="0">Inactive (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload (File input only - No text path) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Sewout Photo Upload (File Input)
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Project Sewout Image
            </label>
            {project.image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Image</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{project.image}</span>
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
        </div>

        {/* Section 3: Telemetry Specifications */}
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
                defaultValue={project.stitches}
                required
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
                defaultValue={project.colors}
                required
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
                defaultValue={project.fabric}
                required
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
                defaultValue={project.machine}
                required
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
                defaultValue={project.turnaround}
                required
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
              defaultValue={project.description}
              required
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
              defaultValue={project.punching_notes}
              required
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
            Update Work Project 🚀
          </button>
        </div>

      </form>
    </div>
  );
}
