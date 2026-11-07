import { getAllFlatCategories } from '@/lib/categoryActions';
import Link from 'next/link';
import AddServiceForm from './AddServiceForm';

export const instant = false;

export default async function AddServicePage() {
  const categories = await getAllFlatCategories();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Service</h1>
          <p className="text-slate-500 text-xs mt-1">
            Fill in the details to publish a new commercial service to the website, navigation menus, and detail pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/services/categories"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
          >
            🗂️ Categories
          </Link>
          <Link
            href="/admin/services"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
          >
            ← Back to Services
          </Link>
        </div>
      </div>

      {/* Add Form with Dynamic Categories */}
      <AddServiceForm categories={categories} />
    </div>
  );
}
