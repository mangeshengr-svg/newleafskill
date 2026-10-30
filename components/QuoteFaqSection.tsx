'use client';

import { useState } from 'react';
import { FaqItem } from '@/types/faq';
import { ContactContentItem } from '@/types/contact';

interface QuoteFaqSectionProps {
  selectedService?: string;
  setSelectedService?: (service: string) => void;
  faqs?: FaqItem[] | { q: string; a: string }[];
  contactContent?: ContactContentItem | null;
}

export default function QuoteFaqSection({
  selectedService = 'Embroidery Digitizing',
  setSelectedService,
  faqs: propFaqs,
  contactContent,
}: QuoteFaqSectionProps) {
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [turnaroundSpeed, setTurnaroundSpeed] = useState<string>('Standard (6-8 Hours)');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const defaultFaqs = [
    {
      q: 'How fast can I receive my digitized embroidery file?',
      a: 'Standard delivery takes only 6 to 8 hours. We also provide a dedicated 2–3 hour rush turnaround option for emergency apparel production runs.'
    },
    {
      q: 'What embroidery machine formats do you provide?',
      a: 'We deliver all commercial and home machine formats including Tajima (.DST), Brother (.PES), Melco/Bernina (.EXP), Janome (.JEF), Husqvarna (.HUS), Pfaff (.VP3), Singer (.XXX), Wilcom (.EMB), plus a full color-stop PDF production worksheet.'
    },
    {
      q: 'Do you offer free revisions if adjustments are needed?',
      a: 'Yes, 100% unlimited free revisions on every order. If you need stitch density adjusted, sizing tweaked, or thread color changes, our team updates it promptly at no extra charge.'
    },
    {
      q: 'How do you guarantee zero thread breakage?',
      a: 'Every stitch path is manually punched by master artists using optimal underlay sequencing, pull compensation tailored to your specific fabric (cap, fleece, polo), and calibrated stitch angles that run effortlessly at 1,000+ SPM.'
    },
    {
      q: 'Can you convert low-resolution images into clean vector art?',
      a: 'Absolutely. We redraw raster photos, sketches, or low-res PNG/JPG logos into infinitely scalable vector files (AI, EPS, SVG, PDF) calibrated with exact Pantone colors.'
    }
  ];

  const activeFaqs = propFaqs && propFaqs.length > 0
    ? propFaqs.map((f: any) => ({
        q: f.question || f.q,
        a: f.answer || f.a
      }))
    : defaultFaqs;

  return (
    <section id="quote" className="px-4 sm:px-8 lg:px-20 py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 scroll-mt-12 relative overflow-hidden">
      <div id="pricing" className="scroll-mt-24"></div>
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: INSTANT QUOTE & FILE UPLOAD */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 leaf-gradient"></div>

            <div className="mb-8 space-y-2">
              <div className="inline-block">
                <span className="text-emerald-800 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 shadow-sm">
                  {contactContent?.homeBadge || 'Fast Response Studio'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {contactContent?.homeHeading || 'Get Your Free Quote & Sewout Estimate'}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {contactContent?.homeDescription ||
                  'Upload your design file and receive an exact price quote, stitch count estimate, and digital preview in 30 minutes.'}
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto shadow-inner">
                  ✓
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">Quote Request Received!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our master digitizer is reviewing your artwork. We will email your exact stitch estimate, sewout proof, and quote within 30 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setQuoteSubmitted(false)}
                  className="leaf-gradient text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition hover:opacity-95"
                >
                  Submit Another Design
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuoteSubmitted(true);
                }}
                className="space-y-5 text-xs sm:text-sm"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Service Required</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService ? setSelectedService(e.target.value) : undefined}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 transition shadow-sm"
                    >
                      <option>Embroidery Digitizing</option>
                      <option>Cap / Hat Digitizing</option>
                      <option>3D Foam Puff Digitizing</option>
                      <option>Jacket Back Digitizing</option>
                      <option>Vector Art Redraw</option>
                      <option>Custom Patch Programming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Turnaround Speed</label>
                    <select
                      value={turnaroundSpeed}
                      onChange={(e) => setTurnaroundSpeed(e.target.value)}
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-600 transition shadow-sm"
                    >
                      <option>Standard (6–8 Hours)</option>
                      <option>Rush (2–3 Hours)</option>
                      <option>Next Day (12–24 Hours)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Target Garment / Fabric</label>
                    <input
                      type="text"
                      placeholder="e.g. Structured Cap, Pique Polo, Hoodie"
                      required
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-emerald-600 transition placeholder:text-slate-400 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email Address or WhatsApp</label>
                    <input
                      type="text"
                      placeholder="name@company.com or phone"
                      required
                      className="w-full bg-slate-50/70 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-emerald-600 transition placeholder:text-slate-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Upload Design File</label>
                  <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-slate-50/50 p-6 text-center rounded-2xl cursor-pointer transition block group shadow-sm">
                    <input type="file" className="hidden" />
                    <div className="text-2xl mb-1 group-hover:scale-110 transition">📁</div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">Click or drag &amp; drop design file here</p>
                    <p className="text-[11px] text-slate-500 mt-1">Accepts PNG, JPG, PDF, AI, EPS, SVG, DST (Up to 50MB)</p>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Special Instructions / Dimensions (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Specify dimensions (e.g. 3.5 inches wide), color stops, or machine preferences..."
                    className="w-full bg-slate-50/70 border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-emerald-600 transition placeholder:text-slate-400 shadow-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full leaf-gradient text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition hover:opacity-95 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Free Quote Request</span>
                  <span>🚀</span>
                </button>
              </form>
            )}

          </div>

          {/* RIGHT: FAQ ACCORDION */}
          <div id="faq" className="lg:col-span-5 space-y-6 scroll-mt-28">

            <div className="space-y-2">
              <div className="inline-block">
                <span className="text-emerald-800 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 shadow-sm">
                  {contactContent?.homeFaqBadge || 'Got Questions?'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {contactContent?.homeFaqHeading || 'Frequently Asked Questions'}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {contactContent?.homeFaqDesc ||
                  'Everything you need to know about our digitizing process, machines, file formats & turnaround.'}
              </p>
            </div>

            <div className="space-y-3">
              {activeFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:border-emerald-400"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 border border-emerald-200 transition-transform">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Direct Support / Quick Help Card */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0f172a] rounded-2xl p-5 border border-emerald-800/40 text-slate-200 shadow-xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                  💬
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    {contactContent?.homeSupportTitle || 'Need an Instant Answer?'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {contactContent?.homeSupportDesc || 'Our digitizers are active 24/7 on WhatsApp & live chat'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <a
                  href={`tel:${contactContent?.homeSupportPhone?.replace(/[^0-9+]/g, '') || '+919923790520'}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
                >
                  <span>📞</span> {contactContent?.homeSupportPhone || '+91 99237 90520'}
                </a>
                <a
                  href={`mailto:${contactContent?.homeSupportEmail || 'info@newleafskills.com'}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition border border-slate-700"
                >
                  <span>✉️</span> {contactContent?.homeSupportEmail || 'info@newleafskills.com'}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
