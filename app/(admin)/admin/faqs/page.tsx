import pool from '@/lib/db';
import Link from 'next/link';
import DeleteFaqButton from '@/components/admin/DeleteFaqButton';

export const instant = false;

export default async function AdminFaqsPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM faqs ORDER BY sort_order ASC, id DESC'
  );

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
            Manage FAQs dynamically across the website (Home page, About page, Contact section, Services).
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/#faq"
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

      {/* FAQs Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total FAQs: {rows.length}</span>
          <span className="text-[11px] text-slate-400">Synchronized across Home, Contact, About, and Services</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Question &amp; Answer</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Location</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No FAQs found. Click &quot;+ Add FAQ&quot; to add your first question and answer.
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

                    {/* Category */}
                    <td className="p-4">
                      <span className="inline-block bg-slate-100 text-slate-700 font-bold text-[11px] px-2.5 py-1 rounded-md border border-slate-200">
                        {faq.category || 'General'}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="p-4 text-center">
                      <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-200">
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
