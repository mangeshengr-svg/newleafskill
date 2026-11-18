import { getAboutWhyChoose, deleteAboutWhyChoose } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminWhyChoosePage() {
  const pillars = await getAboutWhyChoose();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎖️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Why Choose Us Pillars</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage the core value proposition cards displayed on the About Us page.
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
            href="/admin/about/why-choose/add"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <span>+ Add Pillar</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Pillars: {pillars.length}</span>
          <span className="text-[11px] text-slate-400">Displayed in grid cards on /about</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">Order</th>
                <th className="p-4">Title &amp; Subtitle</th>
                <th className="p-4">Badge</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {pillars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No pillars found.
                  </td>
                </tr>
              ) : (
                pillars.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 text-center font-mono font-bold text-slate-600">
                      #{p.sort_order ?? 0}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{p.icon || '🎖️'}</span>
                        <span>{p.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{p.subtitle}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.badge || 'Standard'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 line-clamp-2 max-w-sm">
                      {p.description}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/about/why-choose/edit/${p.id}`}
                          className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
                        >
                          Edit
                        </Link>
                        <form action={deleteAboutWhyChoose.bind(null, p.id)}>
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

