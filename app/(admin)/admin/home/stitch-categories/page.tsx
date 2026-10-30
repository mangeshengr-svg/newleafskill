import pool from '@/lib/db';
import Link from 'next/link';
import { deleteStitchCategory } from '@/lib/stitchActions';

// Yeh configuration cacheComponents ke sath compatible hai
export const instant = false;

export default async function AdminStitchCategoriesPage() {
  const [rows]: any = await pool.query('SELECT * FROM stitch_categories ORDER BY sort_order ASC');

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-900">Manage Stitch Categories</h1>
        <Link
          href="/admin/home/stitch-categories/add"
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-emerald-700"
        >
          + Add New Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
              <th className="p-4">Image</th>
              <th className="p-4">Title & Key</th>
              <th className="p-4">Badge</th>
              <th className="p-4">Stitches / Time</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rows.map((cat: any) => (
              <tr key={cat.id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <img src={cat.image_url} alt={cat.title} className="w-12 h-12 object-cover rounded-lg border" />
                </td>
                <td className="p-4">
                  <p className="font-bold text-slate-900">{cat.title}</p>
                  <span className="text-slate-400">Key: {cat.category_key}</span>
                </td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">{cat.badge}</span>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-slate-700">{cat.stitches}</p>
                  <p className="text-slate-400">{cat.turnaround_time}</p>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href={`/admin/home/stitch-categories/edit/${cat.id}`}
                    className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100"
                  >
                    Edit
                  </Link>
                  <form action={deleteStitchCategory.bind(null, cat.id)} className="inline">
                    <button
                      type="submit"
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 cursor-pointer"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}