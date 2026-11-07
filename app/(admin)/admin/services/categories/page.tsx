import { getServiceCategoriesHierarchy, deleteServiceCategory } from '@/lib/categoryActions';
import Link from 'next/link';
import DeleteCategoryButton from './DeleteCategoryButton';

export const instant = false;

export default async function AdminServiceCategoriesPage() {
  const categories = await getServiceCategoriesHierarchy();

  const totalMainCategories = categories.length;
  const totalSubcategories = categories.reduce(
    (acc, c) => acc + (c.subcategories ? c.subcategories.length : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Separate Add Action Buttons */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗂️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Services Category &amp; Subcategory Hub</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage your service classification clearly: Main Categories on top, and Subcategories attached under each.
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
              <span>📁 Main Categories:</span>
              <span className="text-emerald-900 font-black">{totalMainCategories}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold border border-indigo-200">
              <span>↳ 🏷️ Subcategories:</span>
              <span className="text-indigo-900 font-black">{totalSubcategories}</span>
            </span>
          </div>
        </div>

        {/* Separate Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition"
          >
            <span>💼 View All Services</span>
          </Link>

          <Link
            href="/admin/services/categories/add"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition hover:scale-[1.02]"
          >
            <span>+ Add Main Category</span>
            <span>📁</span>
          </Link>

          <Link
            href="/admin/services/categories/subcategories/add"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition hover:scale-[1.02]"
          >
            <span>+ Add Subcategory</span>
            <span>🏷️</span>
          </Link>
        </div>
      </div>

      {/* Categories Hierarchy View with Clear Visual Distinction */}
      <div className="space-y-6">
        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            No categories created yet. Click &quot;+ Add Main Category&quot; to begin.
          </div>
        ) : (
          categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-emerald-300"
            >
              {/* SECTION A: MAIN CATEGORY HEADER */}
              <div className="p-5 bg-gradient-to-r from-emerald-50/70 via-slate-50/50 to-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start md:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        MAIN CATEGORY
                      </span>
                      <h3 className="font-black text-slate-900 text-base">{cat.name}</h3>
                      <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                        /{cat.slug}
                      </span>
                      {cat.isActive ? (
                        <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    {cat.description && (
                      <p className="text-xs text-slate-500 mt-1 max-w-2xl">{cat.description}</p>
                    )}
                  </div>
                </div>

                {/* Main Category Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <span className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                    Sort: {cat.sortOrder}
                  </span>
                  
                  {/* Quick Subcategory Add under this specific main category */}
                  <Link
                    href={`/admin/services/categories/subcategories/add?parent_id=${cat.id}`}
                    className="inline-flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                    title={`Add new subcategory under ${cat.name}`}
                  >
                    <span>+ Add Subcategory</span>
                  </Link>

                  <Link
                    href={`/admin/services/categories/edit/${cat.id}`}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                  >
                    ✏️ Edit Main
                  </Link>

                  <DeleteCategoryButton
                    id={cat.id}
                    name={cat.name}
                    type="main"
                    action={deleteServiceCategory}
                  />
                </div>
              </div>

              {/* SECTION B: SUBCATEGORIES LISTING UNDER THIS MAIN CATEGORY */}
              <div className="p-5 bg-slate-50/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <span>↳ Subcategories under &quot;{cat.name}&quot;</span>
                    <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-bold text-[10px]">
                      {cat.subcategories?.length || 0}
                    </span>
                  </span>
                </div>

                {(!cat.subcategories || cat.subcategories.length === 0) ? (
                  <div className="flex items-center justify-between text-xs text-slate-500 italic py-3 px-4 bg-white rounded-xl border border-dashed border-slate-300">
                    <span>ℹ️ No subcategories added yet under this main category.</span>
                    <Link
                      href={`/admin/services/categories/subcategories/add?parent_id=${cat.id}`}
                      className="not-italic font-bold text-indigo-600 hover:text-indigo-800 text-xs inline-flex items-center gap-1"
                    >
                      + Add first subcategory
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-xl border border-indigo-100 bg-white hover:border-indigo-300 transition-all shadow-xs flex items-center justify-between gap-2 group"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                              SUB
                            </span>
                            <span className="font-extrabold text-xs text-slate-800 truncate">{sub.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 truncate block">
                            /{sub.slug}
                          </span>
                        </div>

                        {/* Subcategory Edit / Delete Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Link
                            href={`/admin/services/categories/subcategories/edit/${sub.id}`}
                            className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-lg transition"
                          >
                            Edit
                          </Link>
                          <DeleteCategoryButton
                            id={sub.id}
                            name={sub.name}
                            type="sub"
                            action={deleteServiceCategory}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
