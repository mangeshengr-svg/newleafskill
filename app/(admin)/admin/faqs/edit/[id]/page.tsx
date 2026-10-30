import { getFaqById, updateFaq } from '@/lib/faqActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface EditFaqPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) {
    notFound();
  }

  const updateActionWithId = updateFaq.bind(null, faq.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit FAQ #{faq.id}</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Update the question, answer, category, or visibility across website pages.
          </p>
        </div>
        <Link
          href="/admin/faqs"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to FAQs
        </Link>
      </div>

      {/* Edit Form */}
      <form action={updateActionWithId} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Question */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="question"
            required
            defaultValue={faq.question}
            className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            name="answer"
            required
            rows={5}
            defaultValue={faq.answer}
            className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category & Page Location & Sort Order */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={faq.category || 'General'}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Location</label>
            <select
              name="page_location"
              defaultValue={faq.page_location || 'all'}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Pages (Home, About, Contact, Services)</option>
              <option value="home">Home Page Only</option>
              <option value="about">About Page Only</option>
              <option value="contact">Contact Page Only</option>
              <option value="services">Services Page Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              defaultValue={faq.sort_order ?? 0}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked={Boolean(faq.is_active)}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <label htmlFor="is_active" className="text-xs font-bold text-slate-700 cursor-pointer">
            Published &amp; Active on website
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            href="/admin/faqs"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            Update FAQ
          </button>
        </div>
      </form>
    </div>
  );
}
