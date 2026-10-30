import pool from '@/lib/db';
import Link from 'next/link';
import DeleteContactButton from '@/components/admin/DeleteContactButton';

export const instant = false;

export default async function AdminContactPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM contact_content ORDER BY sort_order ASC, id DESC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📞</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Contact Page &amp; Home Quote Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage contact details, studio showcase images, direct channel cards, address, map, and home quote section dynamically.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live Contact Page</span>
            <span>↗</span>
          </Link>
          {/* <Link
            href="/admin/contact/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>+ Add Contact Entry</span>
            <span>⚡</span>
          </Link> */}
        </div>
      </div>

      {/* Contact Content Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Entries: {rows.length}</span>
          <span className="text-[11px] text-slate-400">The first active entry is rendered across Home Quote &amp; /contact page</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Studio Image</th>
                <th className="p-4">Hero &amp; Home Heading</th>
                <th className="p-4">Phone &amp; Email</th>
                <th className="p-4">Office City</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No Contact content records found. Click &quot;+ Add Contact Entry&quot; to configure your contact page.
                  </td>
                </tr>
              ) : (
                rows.map((item: any) => (
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
                          src={item.studio_image_1 || item.hero_bg_image || '/contact/studio-hero.jpg'}
                          alt={item.hero_title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Info */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-xs sm:text-sm">
                        {item.hero_title} {item.hero_title_accent ? `/ ${item.hero_title_accent}` : ''}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        Home Quote: {item.home_heading}
                      </div>
                    </td>

                    {/* Phone & Email */}
                    <td className="p-4">
                      <div className="font-bold text-slate-700 font-mono text-xs">
                        {item.office_phone_formatted || item.office_phone || item.home_support_phone}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.office_email || item.home_support_email}
                      </div>
                    </td>

                    {/* Office City */}
                    <td className="p-4 text-slate-600 font-medium">
                      {item.office_city_state || item.office_country || 'Nagpur, India'}
                    </td>

                    {/* Sort Order */}
                    <td className="p-4 text-center font-mono text-slate-600">
                      {item.sort_order ?? 0}
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/contact/edit/${item.id}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                        >
                          Edit
                        </Link>
                        {/* <DeleteContactButton id={item.id} title={item.hero_title || `Entry #${item.id}`} /> */}
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

