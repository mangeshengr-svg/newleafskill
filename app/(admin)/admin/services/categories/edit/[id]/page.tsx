import pool from '@/lib/db';
import { updateMainCategory } from '@/lib/categoryActions';
import Link from 'next/link';

export const instant = false;

export default async function EditMainCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  const [rows]: any = await pool.query('SELECT * FROM service_categories WHERE id = ? LIMIT 1', [numId]);
  const category = rows[0];

  if (!category) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Category Not Found</h2>
        <p className="text-xs text-slate-500">The requested category ID #{id} does not exist.</p>
        <Link
          href="/admin/services/categories"
          className="inline-block bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          ← Back to Categories List
        </Link>
      </div>
    );
  }

  const updateActionWithId = updateMainCategory.bind(null, numId);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📁</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Main Category: {category.name}</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Update main parent category title, slug, description, or status.
          </p>
        </div>
        <Link
          href="/admin/services/categories"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Categories
        </Link>
      </div>

      {/* Form */}
      <form action={updateActionWithId} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-800">
          <strong>Type:</strong> Main Category (Top-level Parent). All subcategories linked to this category will automatically stay connected.
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Main Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={category.name}
            required
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            URL Slug
          </label>
          <input
            type="text"
            name="slug"
            defaultValue={category.slug}
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={category.description || ''}
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              name="sort_order"
              defaultValue={category.sort_order ?? 0}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Status
            </label>
            <select
              name="is_active"
              defaultValue={category.is_active ? '1' : '0'}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/services/categories"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            Update Main Category 🚀
          </button>
        </div>
      </form>
    </div>
  );
}
