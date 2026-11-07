import { getAllFlatCategories, createSubcategory } from '@/lib/categoryActions';
import Link from 'next/link';

export const instant = false;

interface AddSubcategoryPageProps {
  searchParams?: Promise<{ parent_id?: string }>;
}

export default async function AddSubcategoryPage({ searchParams }: AddSubcategoryPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialParentId = resolvedParams.parent_id || '';
  
  const allCategories = await getAllFlatCategories();
  const parentCandidates = allCategories.filter((c) => !c.parent_id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">↳ 🏷️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Subcategory</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Create a specialized subcategory and attach it under an existing main category.
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
      <form action={createSubcategory} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Parent Main Category <span className="text-red-500">*</span>
          </label>
          <select
            name="parent_id"
            defaultValue={initialParentId}
            required
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">-- Select Parent Main Category --</option>
            {parentCandidates.map((parent) => (
              <option key={parent.id} value={parent.id}>
                📁 {parent.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Choose which main service category this subcategory will belong to.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Subcategory Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. 3D Puff Digitizing, Hat / Cap Digitizing, Vector Tracing"
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            URL Slug (Optional, auto-generated from Name)
          </label>
          <input
            type="text"
            name="slug"
            placeholder="e.g. 3d-puff-digitizing"
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Short overview about this subcategory..."
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              defaultValue="0"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Status
            </label>
            <select
              name="is_active"
              defaultValue="1"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            Save Subcategory 🚀
          </button>
        </div>
      </form>
    </div>
  );
}

