import { getAboutCta, updateAboutCta } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminCtaPage() {
  const cta = await getAboutCta();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Bottom CTA &amp; Studio Contacts</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Manage the bottom call-to-action banner, quote invitation, and live contact information.
          </p>
        </div>
        <Link
          href="/admin/about"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Sections
        </Link>
      </div>

      <form action={updateAboutCta} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Studio Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone</label>
              <input
                type="text"
                name="contact_phone"
                defaultValue={cta?.contact_phone || '+91 99237 90520'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dispatch Email</label>
              <input
                type="email"
                name="contact_email"
                defaultValue={cta?.contact_email || 'info@newleafskills.com'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Operating Hours</label>
              <input
                type="text"
                name="contact_hours"
                defaultValue={cta?.contact_hours || '24/7 Global Production & Live Dispatch'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Bottom Call to Action
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CTA Eyebrow</label>
              <input
                type="text"
                name="cta_eyebrow"
                defaultValue={cta?.cta_eyebrow || '✨ Ready to Upgrade Your Embroidery Quality?'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CTA Title</label>
              <input
                type="text"
                name="cta_title"
                defaultValue={cta?.cta_title || 'Stop Ruining Garments with Cheap Auto-Digitizing'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">CTA Description Paragraph</label>
            <textarea
              name="cta_description"
              rows={4}
              defaultValue={cta?.cta_description || ''}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link
            href="/admin/about"
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Save CTA Details
          </button>
        </div>
      </form>
    </div>
  );
}

