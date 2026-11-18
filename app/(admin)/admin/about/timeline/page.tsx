import { getAboutTimeline, deleteAboutTimeline } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminTimelinePage() {
  const milestones = await getAboutTimeline();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏳</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Heritage Timeline Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage the 22-year chronological milestones from 2004 manual punching to international partnership today.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/about"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
          >
            ← Sections
          </Link>
          <Link
            href="/admin/about/timeline/add"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <span>+ Add Milestone</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Milestones: {milestones.length}</span>
          <span className="text-[11px] text-slate-400">Rendered in chronological tab sequence on /about</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">Order</th>
                <th className="p-4">Year</th>
                <th className="p-4">Title &amp; Tagline</th>
                <th className="p-4">Highlight Badge</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {milestones.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No timeline milestones found.
                  </td>
                </tr>
              ) : (
                milestones.map((m: any) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 text-center font-mono font-bold text-slate-600">
                      #{m.sort_order ?? 0}
                    </td>
                    <td className="p-4 font-mono font-black text-sm text-emerald-700">
                      {m.year}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{m.title}</div>
                      <div className="text-[11px] text-slate-500">{m.tagline}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {m.highlight || 'Milestone'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 line-clamp-2 max-w-sm">
                      {m.description}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {m.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/about/timeline/edit/${m.id}`}
                          className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
                        >
                          Edit
                        </Link>
                        <form action={deleteAboutTimeline.bind(null, m.id)}>
                          <button
                            type="submit"
                            className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
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

