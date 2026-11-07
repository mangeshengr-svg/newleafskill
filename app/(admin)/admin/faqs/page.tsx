import pool from '@/lib/db';
import Link from 'next/link';
import DeleteFaqButton from '@/components/admin/DeleteFaqButton';

export const instant = false;

interface AdminFaqsPageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function AdminFaqsPage({ searchParams }: AdminFaqsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const filterPage = resolvedSearchParams.page || 'all';
  const filterCategory = resolvedSearchParams.category || 'all';

  let query = 'SELECT * FROM faqs WHERE 1=1';
  const queryParams: any[] = [];

  if (filterPage !== 'all') {
    query += ' AND page_location = ?';
    queryParams.push(filterPage);
  }

  if (filterCategory !== 'all') {
    query += ' AND category = ?';
    queryParams.push(filterCategory);
  }

  query += ' ORDER BY page_location ASC, sort_order ASC, id DESC';

  const [rows]: any = await pool.query(query, queryParams);

  // Get distinct categories and counts for filter badges
  const [catRows]: any = await pool.query(
    'SELECT category, COUNT(*) as cnt FROM faqs WHERE category IS NOT NULL AND category != "" GROUP BY category'
  );

  const [pageCounts]: any = await pool.query(
    'SELECT page_location, COUNT(*) as cnt FROM faqs GROUP BY page_location'
  );

  const pageCountMap = pageCounts.reduce((acc: any, cur: any) => {
    acc[cur.page_location] = cur.cnt;
    return acc;
  }, {});

  const totalFaqsCount = Object.values(pageCountMap).reduce((a: any, b: any) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">❓</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ) Management
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage FAQs dynamically: Page-wise (Home, Services, About, Contact) and Category/Subcategory-wise.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/services#faq"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live Section</span>
            <span>↗</span>
          </Link>
          <Link
            href="/admin/faqs/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>+ Add FAQ</span>
            <span>⚡</span>
          </Link>
        </div>
      </div>

      {/* Page-wise Tabs Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
          Page Filter:
        </span>
        {[
          { key: 'all', label: 'All Pages', count: totalFaqsCount },
          { key: 'home', label: '🏠 Home', count: pageCountMap['home'] || 0 },
          { key: 'services', label: '🪡 Services', count: pageCountMap['services'] || 0 },
          { key: 'about', label: '🏢 About', count: pageCountMap['about'] || 0 },
          { key: 'contact', label: '📞 Contact', count: pageCountMap['contact'] || 0 },
        ].map((tab) => {
          const isActive = filterPage === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/admin/faqs?page=${tab.key}${filterCategory !== 'all' ? `&category=${encodeURIComponent(filterCategory)}` : ''}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      {catRows && catRows.length > 0 && (
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
            Categories:
          </span>
          <Link
            href={`/admin/faqs?page=${filterPage}`}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </Link>
          {catRows.map((cat: any) => {
            const isCatActive = filterCategory === cat.category;
            return (
              <Link
                key={cat.category}
                href={`/admin/faqs?page=${filterPage}&category=${encodeURIComponent(cat.category)}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  isCatActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.category}</span>
                <span className="text-[10px] opacity-75">({cat.cnt})</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* FAQs Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">
            Showing {rows.length} {rows.length === 1 ? 'FAQ' : 'FAQs'}
          </span>
          <span className="text-[11px] text-slate-400">
            Page: <strong className="text-slate-700 uppercase">{filterPage}</strong> | Category:{' '}
            <strong className="text-slate-700">{filterCategory}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Question &amp; Answer</th>
                <th className="p-4">Category &amp; Subcategory</th>
                <th className="p-4 text-center">Page Location</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No FAQs match the selected filters. Click &quot;+ Add FAQ&quot; to create one.
                  </td>
                </tr>
              ) : (
                rows.map((faq: any) => (
                  <tr key={faq.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* ID */}
                    <td className="p-4 text-center">
                      <span className="text-slate-400 font-mono text-xs">#{faq.id}</span>
                    </td>

                    {/* Question & Answer */}
                    <td className="p-4 max-w-md">
                      <div className="space-y-1">
                        <p className="font-extrabold text-slate-900 text-sm">{faq.question}</p>
                        <p className="text-slate-600 line-clamp-2 text-xs leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </td>

                    {/* Category & Subcategory */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="inline-block bg-slate-100 text-slate-800 font-bold text-[11px] px-2.5 py-1 rounded-md border border-slate-200">
                          {faq.category || 'General'}
                        </span>
                        {faq.subcategory && (
                          <div className="text-[11px] font-semibold text-emerald-700 pl-1">
                            ↳ {faq.subcategory}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Page Location */}
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block font-bold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider border ${
                          faq.page_location === 'home'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : faq.page_location === 'services'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : faq.page_location === 'about'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : faq.page_location === 'contact'
                            ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {faq.page_location || 'all'}
                      </span>
                    </td>

                    {/* Sort */}
                    <td className="p-4 text-center">
                      <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">
                        {faq.sort_order ?? 0}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      {faq.is_active ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/faqs/edit/${faq.id}`}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </Link>
                        <DeleteFaqButton id={faq.id} question={faq.question} />
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
