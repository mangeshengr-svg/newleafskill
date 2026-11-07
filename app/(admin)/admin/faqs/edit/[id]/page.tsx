import { getFaqById, updateFaq } from '@/lib/faqActions';
import { getAllFlatCategories } from '@/lib/categoryActions';
import FaqForm from '@/components/admin/FaqForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface EditFaqPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  const { id } = await params;
  const [faq, categories] = await Promise.all([
    getFaqById(id),
    getAllFlatCategories(),
  ]);

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
            Update the question, answer, page location, category, subcategory, or visibility.
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
      <FaqForm
        categories={categories}
        initialData={faq}
        formAction={updateActionWithId}
        submitLabel="Update FAQ"
      />
    </div>
  );
}
