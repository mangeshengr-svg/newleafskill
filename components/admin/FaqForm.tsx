'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { createFaq } from '@/lib/faqActions';

interface FaqFormProps {
  categories: { id: number; name: string; slug: string; parent_id: number | null }[];
  initialData?: {
    id?: number;
    question: string;
    answer: string;
    category?: string;
    subcategory?: string;
    category_id?: number | null;
    subcategory_id?: number | null;
    page_location?: string;
    sort_order?: number;
    is_active?: number;
  };
  formAction: (formData: FormData) => void | Promise<void>;
  submitLabel?: string;
}

export default function FaqForm({
  categories,
  initialData,
  formAction,
  submitLabel = 'Save FAQ',
}: FaqFormProps) {
  // Main parent categories from DB
  const mainCategories = useMemo(
    () => categories.filter((c) => !c.parent_id),
    [categories]
  );

  // Initial category name matching or id matching
  const findInitialCatId = () => {
    if (initialData?.category_id) return String(initialData.category_id);
    if (initialData?.category) {
      const match = mainCategories.find(
        (c) => c.name.toLowerCase() === initialData.category?.toLowerCase()
      );
      if (match) return String(match.id);
    }
    return '';
  };

  const [selectedParentId, setSelectedParentId] = useState<string>(findInitialCatId);
  const [customCategory, setCustomCategory] = useState<string>(
    initialData?.category && !findInitialCatId() ? initialData.category : ''
  );

  // Available subcategories for the selected parent
  const availableSubcategories = useMemo(() => {
    if (!selectedParentId) return [];
    return categories.filter((c) => String(c.parent_id) === String(selectedParentId));
  }, [categories, selectedParentId]);

  const findInitialSubId = () => {
    if (initialData?.subcategory_id) return String(initialData.subcategory_id);
    if (initialData?.subcategory) {
      const match = categories.find(
        (c) =>
          c.parent_id &&
          c.name.toLowerCase() === initialData.subcategory?.toLowerCase()
      );
      if (match) return String(match.id);
    }
    return '';
  };

  const [selectedSubId, setSelectedSubId] = useState<string>(findInitialSubId);
  const [customSubcategory, setCustomSubcategory] = useState<string>(
    initialData?.subcategory && !findInitialSubId() ? initialData.subcategory : ''
  );

  // Compute final category & subcategory strings
  const finalCategoryName = useMemo(() => {
    if (selectedParentId) {
      const cat = mainCategories.find((c) => String(c.id) === String(selectedParentId));
      if (cat) return cat.name;
    }
    return customCategory.trim() || 'General';
  }, [selectedParentId, customCategory, mainCategories]);

  const finalSubcategoryName = useMemo(() => {
    if (selectedSubId) {
      const sub = availableSubcategories.find((c) => String(c.id) === String(selectedSubId));
      if (sub) return sub.name;
    }
    return customSubcategory.trim() || '';
  }, [selectedSubId, customSubcategory, availableSubcategories]);

  return (
    <form action={formAction} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* Hidden fields to pass actual text and IDs */}
      <input type="hidden" name="category" value={finalCategoryName} />
      <input type="hidden" name="subcategory" value={finalSubcategoryName} />
      <input type="hidden" name="category_id" value={selectedParentId || ''} />
      <input type="hidden" name="subcategory_id" value={selectedSubId || ''} />

      {/* Target Page Location First */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-slate-50 border border-emerald-200/80 space-y-2">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
          Target Page Section <span className="text-red-500">*</span>
        </label>
        <p className="text-[11px] text-slate-500">
          Choose which page this FAQ belongs to (Home, Services, About, Contact, or All Pages).
        </p>
        <select
          name="page_location"
          defaultValue={initialData?.page_location || 'all'}
          className="w-full sm:w-auto min-w-[280px] p-3 border-2 border-emerald-300 rounded-xl text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        >
          <option value="all">🌐 All Pages (Global FAQ)</option>
          <option value="home">🏠 Home Page Only</option>
          <option value="services">🪡 Services Page Only</option>
          <option value="about">🏢 About Us Page Only</option>
          <option value="contact">📞 Contact Us Page Only</option>
        </select>
      </div>

      {/* Question */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Question <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="question"
          required
          defaultValue={initialData?.question || ''}
          placeholder="e.g. How fast can I receive my digitized embroidery file?"
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
          defaultValue={initialData?.answer || ''}
          placeholder="Write a clear, helpful answer that addresses client questions regarding embroidery digitizing, machinery, turnaround, revisions, or pricing."
          className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Category & Subcategory Selection */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <span>🗂️</span> Category &amp; Subcategory Organization
          </span>
          <Link
            href="/admin/services/categories"
            target="_blank"
            className="text-[11px] font-bold text-emerald-700 hover:underline"
          >
            Manage Categories ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Main Category
            </label>
            <select
              value={selectedParentId}
              onChange={(e) => {
                setSelectedParentId(e.target.value);
                setSelectedSubId('');
                if (e.target.value) setCustomCategory('');
              }}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            >
              <option value="">-- Choose From Service Categories --</option>
              {mainCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  📁 {c.name}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">
                Or enter custom category:
              </span>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  if (e.target.value) setSelectedParentId('');
                }}
                placeholder="e.g. Turnaround, Pricing, Quality"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Subcategory
            </label>
            <select
              value={selectedSubId}
              onChange={(e) => {
                setSelectedSubId(e.target.value);
                if (e.target.value) setCustomSubcategory('');
              }}
              disabled={availableSubcategories.length === 0}
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">
                {availableSubcategories.length === 0
                  ? '-- No subcategories under this main --'
                  : '-- Choose Subcategory --'}
              </option>
              {availableSubcategories.map((c) => (
                <option key={c.id} value={c.id}>
                  ↳ {c.name}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">
                Or enter custom subcategory:
              </span>
              <input
                type="text"
                value={customSubcategory}
                onChange={(e) => {
                  setCustomSubcategory(e.target.value);
                  if (e.target.value) setSelectedSubId('');
                }}
                placeholder="e.g. Rush Orders, Machine Formats"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2">
          <span className="font-bold text-emerald-700">Preview Tags:</span>
          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
            {finalCategoryName}
          </span>
          {finalSubcategoryName && (
            <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200">
              ↳ {finalSubcategoryName}
            </span>
          )}
        </div>
      </div>

      {/* Sort Order & Visibility */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Sort Order (Position)
          </label>
          <input
            type="number"
            name="sort_order"
            defaultValue={initialData?.sort_order ?? 0}
            className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            Lower numbers appear first (e.g. 1, 2, 3).
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Status
          </label>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked={initialData ? Boolean(initialData.is_active) : true}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="is_active" className="text-xs font-bold text-slate-700 cursor-pointer">
              Published &amp; Active (Visible to visitors)
            </label>
          </div>
        </div>
      </div>

      {/* Submit / Cancel Buttons */}
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

