import pool from '@/lib/db';
import Link from 'next/link';
import DeleteWhyChooseUsButton from '@/components/admin/DeleteWhyChooseUsButton';

export const instant = false;

export default async function AdminWhyChooseUsPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM why_choose_us ORDER BY sort_order ASC, id DESC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Why Choose Us Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage studio sewout photograph, experience stats, core pillars, and service capabilities on the home page.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/#why-choose-us"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live Section</span>
            <span>↗</span>
          </Link>
          {/* <Link
            href="/admin/why-choose-us/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>+ Add Why Choose Us</span>
            <span>⚡</span>
          </Link> */}
        </div>
      </div>

      {/* Why Choose Us Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Entries: {rows.length}</span>
          <span className="text-[11px] text-slate-400">Synchronized with Home Page Why Choose Us Section</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Studio Image</th>
                <th className="p-4">Title &amp; Subtitle</th>
                <th className="p-4">Experience &amp; Badges</th>
                <th className="p-4">Pillars &amp; Caps</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No Why Choose Us records found. Click &quot;+ Add Why Choose Us&quot; to configure your section.
                  </td>
                </tr>
              ) : (
                rows.map((item: any) => {
                  let pillarsCount = 0;
                  let capsCount = 0;
                  try {
                    const parsedP = typeof item.pillars === 'string' ? JSON.parse(item.pillars) : item.pillars;
                    pillarsCount = Array.isArray(parsedP) ? parsedP.length : 0;
                  } catch (e) {
                    pillarsCount = 0;
                  }
                  try {
                    const parsedC = typeof item.capabilities === 'string' ? JSON.parse(item.capabilities) : item.capabilities;
                    capsCount = Array.isArray(parsedC) ? parsedC.length : 0;
                  } catch (e) {
                    capsCount = 0;
                  }

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* ID */}
                      <td className="p-4 text-center">
                        <span className="text-slate-400 font-mono text-xs">
                          #{item.id}
                        </span>
                      </td>

                      {/* Image Preview */}
                      <td className="p-4">
                        <div className="w-16 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                          <img
                            src={item.image || '/why-choose-us.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Title & Subtitle */}
                      <td className="p-4 max-w-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {item.eyebrow || 'Why Choose Us:'}
                            </span>
                          </div>
                          <p className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </td>

                      {/* Badges */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-800 text-[11px]">
                            🏆 {item.experience_years} {item.experience_title}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {item.badge2_icon} {item.badge2_title}
                          </p>
                        </div>
                      </td>

                      {/* Pillars & Capabilities */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-block bg-slate-100 text-slate-700 font-medium text-[10px] px-2 py-0.5 rounded">
                            {pillarsCount} Pillars
                          </span>
                          <span className="inline-block bg-emerald-50 text-emerald-800 font-medium text-[10px] px-2 py-0.5 rounded">
                            {capsCount} Capabilities
                          </span>
                        </div>
                      </td>

                      {/* Sort Order */}
                      <td className="p-4 text-center font-bold text-slate-600">
                        {item.sort_order ?? 0}
                      </td>

                      {/* Active Status */}
                      <td className="p-4 text-center">
                        {item.is_active ? (
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
                          href={`/admin/why-choose-us/edit/${item.id}`}
                          className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                        >
                          Edit
                        </Link>
                        {/* <DeleteWhyChooseUsButton id={item.id} title={item.title} /> */}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
