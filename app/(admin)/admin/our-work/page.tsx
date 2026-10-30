import pool from '@/lib/db';
import Link from 'next/link';
import { deleteWorkProject } from '@/lib/workActions';

export const instant = false;

export default async function AdminOurWorkPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM our_work ORDER BY sort_order ASC, id ASC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Our Work &amp; Portfolio Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage commercial sewouts, digitizing portfolio samples, and telemetry specifications.
          </p>
        </div>
        <Link
          href="/admin/our-work/add"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>+ Add New Work Project</span>
          <span>⚡</span>
        </Link>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Projects: {rows.length}</span>
          <span className="text-[11px] text-slate-400">Synchronized with Home Page &amp; Our Work Page &amp; Lightbox Modal</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Title &amp; Category</th>
                <th className="p-4">Stitches &amp; Colors</th>
                <th className="p-4">Fabric &amp; Machine</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No work projects found. Click &quot;+ Add New Work Project&quot; to add your first portfolio item.
                  </td>
                </tr>
              ) : (
                rows.map((project: any) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* ID */}
                    <td className="p-4 text-center">
                      <span className="text-slate-400 font-mono text-xs">
                        #{project.id}
                      </span>
                    </td>

                    {/* Image Preview */}
                    <td className="p-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                        <img
                          src={project.image || '/work/work-1.jpg'}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Category */}
                    <td className="p-4 max-w-xs">
                      <div className="space-y-1">
                        <p className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
                          {project.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-200">
                            {project.category}
                          </span>
                          {project.tag && (
                            <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                              {project.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Stitches & Colors */}
                    <td className="p-4">
                      <p className="font-mono font-bold text-emerald-700">{project.stitches} Stitches</p>
                      <p className="text-[11px] text-slate-500">{project.colors}</p>
                    </td>

                    {/* Fabric & Machine */}
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{project.fabric}</p>
                      <p className="text-[11px] text-slate-400">{project.machine}</p>
                    </td>

                    {/* Sort Order */}
                    <td className="p-4 text-center font-bold text-slate-600">
                      {project.sort_order ?? 0}
                    </td>

                    {/* Active Status */}
                    <td className="p-4 text-center">
                      {project.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-slate-200">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/our-work/edit/${project.id}`}
                        className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                      >
                        Edit
                      </Link>
                      <form action={deleteWorkProject.bind(null, project.id)} className="inline">
                        <button
                          type="submit"
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer"
                          aria-label={`Delete ${project.title}`}
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
