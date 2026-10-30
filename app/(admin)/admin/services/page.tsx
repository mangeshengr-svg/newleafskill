import pool from '@/lib/db';
import Link from 'next/link';
import { deleteService } from '@/lib/serviceActions';

export const instant = false;

export default async function AdminServicesPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM services ORDER BY sort_order ASC, id ASC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💼</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Services Catalog Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage commercial digitizing and embroidery services shown across Home and Services pages.
          </p>
        </div>
        <Link
          href="/admin/services/add"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>+ Add New Service</span>
          <span>⚡</span>
        </Link>
      </div>

      {/* Services Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Services: {rows.length}</span>
          <span className="text-[11px] text-slate-400">Synchronized with Home Page &amp; Detailed Specs Popup</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Title &amp; Slug</th>
                <th className="p-4">Category &amp; Tag</th>
                <th className="p-4">Turnaround</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No services found. Click &quot;+ Add New Service&quot; to create your first service.
                  </td>
                </tr>
              ) : (
                rows.map((service: any) => (
                  <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Number Badge */}
                    <td className="p-4 text-center">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs inline-flex items-center justify-center border border-slate-200">
                        {service.num || '01'}
                      </span>
                    </td>

                    {/* Image Preview */}
                    <td className="p-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                        <img
                          src={service.image || '/services/embroidery-digitizing.png'}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-slate-900 text-sm">{service.title}</p>
                        <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                          /{service.slug}
                        </p>
                      </div>
                    </td>

                    {/* Category & Tag */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-300/60 uppercase tracking-wider">
                          {service.category}
                        </span>
                        <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs">
                          {service.tag}
                        </p>
                      </div>
                    </td>

                    {/* Turnaround */}
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{service.turnaround || '6–8 Hours'}</p>
                      <p className="text-[11px] text-slate-400">{service.revisions || '100% Free Edits'}</p>
                    </td>

                    {/* Sort Order */}
                    <td className="p-4 text-center font-bold text-slate-600">
                      {service.sort_order ?? 0}
                    </td>

                    {/* Active Status */}
                    <td className="p-4 text-center">
                      {service.is_active ? (
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
                        href={`/admin/services/edit/${service.id}`}
                        className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                      >
                        Edit
                      </Link>
                      <form action={deleteService.bind(null, service.id)} className="inline">
                        <button
                          type="submit"
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer"
                          aria-label={`Delete ${service.title}`}
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
