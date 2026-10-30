import pool from '@/lib/db';
import Link from 'next/link';
import DeleteAboutButton from '@/components/admin/DeleteAboutButton';

export const instant = false;

export default async function AdminAboutPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM about_content ORDER BY sort_order ASC, id DESC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏢</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">About Us Page Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage the About page hero banner, studio heritage story, metrics, and production details dynamically.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live About Page</span>
            <span>↗</span>
          </Link>
          {/* <Link
            href="/admin/about/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>+ Add About Entry</span>
            <span>⚡</span>
          </Link> */}
        </div>
      </div>

      {/* About Content Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Entries: {rows.length}</span>
          <span className="text-[11px] text-slate-400">The first active entry is rendered on the public /about page</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Hero Image</th>
                <th className="p-4">Story Image</th>
                <th className="p-4">Hero Title &amp; Eyebrow</th>
                <th className="p-4">Story Title</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No About page entries found. Click &quot;+ Add About Entry&quot; to create one.
                  </td>
                </tr>
              ) : (
                rows.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* ID */}
                    <td className="p-4 text-center font-mono font-bold text-slate-600">
                      #{item.id}
                    </td>

                    {/* Hero Image */}
                    <td className="p-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                        <img
                          src={item.hero_image || '/about/about-hero-banner.jpg'}
                          alt={item.hero_title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Story Image */}
                    <td className="p-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                        <img
                          src={item.story_image || '/about/roots-story.jpg'}
                          alt={item.story_title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Hero Title & Eyebrow */}
                    <td className="p-4 max-w-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                          {item.hero_eyebrow || 'About New Leaf Skills'}
                        </span>
                        <p className="font-extrabold text-slate-900 line-clamp-2">{item.hero_title}</p>
                      </div>
                    </td>

                    {/* Story Title */}
                    <td className="p-4 max-w-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 line-clamp-2">{item.story_title}</p>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.story_card_badge || '99.8% Pass'}
                        </span>
                      </div>
                    </td>

                    {/* Sort Order */}
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-mono text-[11px] font-bold">
                        {item.sort_order ?? 0}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/about/edit/${item.id}`}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1"
                        >
                          <span>Edit</span>
                          <span>✏️</span>
                        </Link>
                        {/* <DeleteAboutButton id={item.id} title={item.hero_title} /> */}
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
