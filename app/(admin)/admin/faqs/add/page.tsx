import { getAllFlatCategories } from '@/lib/categoryActions';
import { createFaq } from '@/lib/faqActions';
import FaqForm from '@/components/admin/FaqForm';
import Link from 'next/link';

export const instant = false;

export default async function AddFaqPage() {
  const categories = await getAllFlatCategories();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">➕</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New FAQ</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Create an FAQ categorized by Page, Category, and Subcategory to display across the site.
          </p>
        </div>
        <Link
          href="/admin/faqs"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to FAQs
        </Link>
      </div>

      {/* Add Form Component */}
      <FaqForm
        categories={categories}
        formAction={createFaq}
        submitLabel="Save & Publish FAQ"
      />
    </div>
  );
}
