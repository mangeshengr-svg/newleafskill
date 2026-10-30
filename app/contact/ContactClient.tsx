'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  contactDetails,
  contactInfoCards,
  contactServiceOptions,
  contactTurnaroundOptions,
  contactMachineFormats,
  contactFaqs,
} from '@/data/contactData';

import { ContactContentItem } from '@/types/contact';
import { FaqItem } from '@/types/faq';

interface ContactPageProps {
  initialContent?: ContactContentItem | null;
  initialFaqs?: FaqItem[];
}

export default function ContactClient({ initialContent, initialFaqs }: ContactPageProps) {
  const content = initialContent;
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : contactFaqs;
  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [service, setService] = useState<string>(contactServiceOptions[0]);
  const [turnaround, setTurnaround] = useState<string>(contactTurnaroundOptions[0]);
  const [format, setFormat] = useState<string>(contactMachineFormats[0]);
  const [subject, setSubject] = useState<string>('Digitizing Quote & Stitch Evaluation');
  const [message, setMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicket = `NLS-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setFileName('');
    setIsSuccess(false);
  };

  const handleCopyEmail = (emailStr: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(emailStr);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 font-jakarta selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header with announcement bar & luxury navbar */}
      <Header />

      {/* 2. Cityo-Style Breadcrumb & Title Hero Banner with Background Image */}
      <section className="relative w-full min-h-[190px] sm:min-h-[230px] lg:min-h-[260px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        {/* Background Image Container with Light Translucent Overlay for high photo visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBgImage || '/contact/studio-hero.jpg'}
            alt="NewLeaf Skills Contact Studio Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          {/* Light Cinematic Gradient Overlay so background photo is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.22),transparent_70%)]" />
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Banner Content: Left Title + Right Breadcrumb (Identical to Cityo WordPress theme) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Prominent Page Identifier "Contact" with high contrast against the visible photo */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest font-jakarta backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{content?.heroBadge || '24/7 Global Commercial Punching Studio'}</span>
              </div>
              
              <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-md">
                  {content?.heroTitle || 'Contact'}
                </span>
                <span className="text-emerald-400 text-2xl sm:text-4xl font-light drop-shadow">/</span>
                <span className="text-white sm:text-emerald-300 text-xl sm:text-3xl font-bold font-jakarta drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {content?.heroTitleAccent || 'Inquiries & Quotes'}
                </span>
              </h1>

              <p className="text-slate-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {content?.heroDescription ||
                  'Connect with our master digitizers. Request free sew-out tests, stitch count estimates, or discuss custom commercial contracts 24/7.'}
              </p>
            </div>

            {/* Right: Breadcrumb Navigation with Active Page Highlight */}
            <div className="flex-shrink-0">
              <nav
                aria-label="Breadcrumb"
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-700/90 backdrop-blur-md text-xs font-semibold shadow-2xl"
              >
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 hover:underline"
                >
                  <span>🏠</span>
                  <span>Home</span>
                </Link>
                <span className="text-slate-500 font-bold">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 font-bold tracking-wide shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Contact</span>
                </span>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom subtle glowing border */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent z-10" />
      </section>

      {/* 2b. Hero Intro Section with Trust Highlights */}
      <section className="relative px-4 sm:px-8 lg:px-16 pt-8 pb-10 bg-gradient-to-b from-slate-100/90 via-emerald-50/40 to-white border-b border-slate-200/90 overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[250px] bg-emerald-300/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[220px] bg-teal-200/20 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 embroidery-dots-light opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-5">

          {/* Hero Header Content */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/80 border border-emerald-300/80 rounded-full text-[10px] sm:text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{content?.introBadge || '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.18]">
              {content?.introTitlePrefix || 'Contact Us :'}{' '}
              <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-1 underline-offset-4">
                {content?.introTitleHighlight || 'We Love to Hear'}
              </span>{' '}
              {content?.introTitleSuffix || 'From Our Customers'}
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl font-normal">
              {content?.introDescription ||
                `${contactDetails.introText} Send us your artwork, request a free sew-out estimate, or consult with our commercial punching specialists anytime.`}
            </p>

            {/* Quick Trust Highlights Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-[11px] font-semibold text-slate-600">
              {(content?.trustHighlights && content.trustHighlights.length > 0
                ? content.trustHighlights
                : [
                    '6–8h Standard Turnaround',
                    '2-Hour Rush Available',
                    'Zero Thread Break Guarantee',
                    '10,000+ Happy Embroidery Shops',
                  ]
              ).map((h, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200/90 shadow-2xs">
                  <span className="text-emerald-600">✓</span> {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Contact Channels Cards (Grid of 4 refined cards) */}
      <section className="px-4 sm:px-8 lg:px-16 py-10 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(content?.contactCards && content.contactCards.length > 0 ? content.contactCards : contactInfoCards).map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
                      {card.icon}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition">
                      {card.title}
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-0.5">
                    <div className="text-xs font-bold text-slate-800 font-mono">
                      {card.primaryDetail}
                    </div>
                    {card.secondaryDetail && (
                      <div className="text-[11px] text-slate-500">
                        {card.secondaryDetail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <a
                    href={card.actionHref}
                    target={card.actionHref.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition shadow-2xs"
                  >
                    <span>{card.actionText}</span>
                    <span className="text-xs">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Main Contact & Free Quote Section (Two Column Form + Visual Studio Showcase) */}
      <section id="quote" className="px-4 sm:px-8 lg:px-16 py-12 lg:py-16 bg-white scroll-mt-20">
        <div id="contact-form" className="scroll-mt-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: The Interactive Contact & Quote Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-sm relative">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70 uppercase tracking-wider mb-1.5">
                    <span>{content?.formBadge || '✨ Fast-Track Inquiry'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {content?.formHeading || 'Send Us a Message or Request a Quote'}
                  </h2>
                  <p className="text-slate-500 text-xs mt-1 leading-normal">
                    {content?.formDescription ||
                      'Submit your artwork details below. You will receive an exact stitch count, sewout preview, and price estimate within 15 minutes.'}
                  </p>
                </div>
              </div>

              {isSuccess ? (
                /* Success Confirmation State */
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Ticket #{ticketId}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Thank You, {fullName}! Your Inquiry Has Been Received.
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Our master digitizers have received your project details. We are analyzing stitch requirements and will reply to <span className="font-semibold text-slate-800">{email}</span> within <span className="text-emerald-700 font-bold">10–15 minutes</span>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Service:</span>
                      <span className="font-semibold text-slate-800">{service}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Turnaround:</span>
                      <span className="font-semibold text-emerald-700">{turnaround}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Preferred Format:</span>
                      <span className="font-semibold text-slate-800">{format}</span>
                    </div>
                    {fileName && (
                      <div className="flex justify-between text-slate-500">
                        <span>Attached Mockup:</span>
                        <span className="font-semibold text-slate-800">📎 {fileName}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                    >
                      Submit Another Project
                    </button>
                    <a
                      href={`https://wa.me/919923790520?text=Hi%20NewLeaf%20Skills,%20I%20just%20submitted%20inquiry%20ticket%20${ticketId}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                    >
                      <span>💬 Expedite via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Miller"
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@embroideryshop.com"
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      />
                    </div>

                    {/* Phone Number / WhatsApp */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 019-2834"
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      />
                    </div>

                    {/* Company / Shop Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Miller Custom Apparel"
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>

                  {/* Dropdowns row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    {/* Service Needed */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Service Required
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      >
                        {contactServiceOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Turnaround Preference */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Turnaround Speed
                      </label>
                      <select
                        value={turnaround}
                        onChange={(e) => setTurnaround(e.target.value)}
                        className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      >
                        {contactTurnaroundOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Target Machine Format */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Machine Format
                      </label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                      >
                        {contactMachineFormats.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Left Chest Logo Digitizing Quote"
                      className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                    />
                  </div>

                  {/* Message / Specifications */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Message &amp; Stitch Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about fabric type (pique cotton, cap, jacket, fleece), desired dimensions (e.g. 3.5 inches wide), color sequence, or any special requirements..."
                      className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition resize-y"
                    />
                  </div>

                  {/* Simulated File Upload Zone */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Attach Artwork / Logo (Optional)
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50/50 hover:bg-slate-100/60 hover:border-emerald-400 transition cursor-pointer relative">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.ai,.pdf,.eps,.svg,.dst,.pes"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFileName(e.target.files[0].name);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-[11px] text-slate-600">
                        {fileName ? (
                          <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                            <span>📎 Selected:</span> <span>{fileName}</span>
                          </span>
                        ) : (
                          <span>
                            📁 <strong className="text-slate-800">Click to upload artwork</strong> (JPG, PNG, AI, PDF, EPS up to 25MB)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Inquiry to Studio...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Send Inquiry &amp; Get Free Stitch Estimate</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                      🔒 100% Confidential. Your proprietary artwork is never shared or published without permission.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: Studio Showcase & Authenticity Badges (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Studio Image Card 1: Production Desk with Dual Monitor & Tajima */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm group">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <Image
                    src={content?.studioImage1 || '/contact/studio-hero.jpg'}
                    alt="NewLeaf Skills manual embroidery digitizing workstation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>{content?.studioBadge1 || 'Live Digitizing Studio'}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-black tracking-wide">
                      {content?.studioTitle1 || 'Tajima & Barudan Commercial Sew-out Lab'}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      {content?.studioDesc1 || 'Hand-punched stitch paths tested on real machines before customer dispatch.'}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold">{content?.studioStat1 || '22+ Years'}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{content?.studioStatSub1 || 'Manual Punching'}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">{content?.studioStatTag1 || '1,000 SPM Calibrated'}</span>
                </div>
              </div>

              {/* Studio Image Card 2: Friendly Support Specialist Loupe Inspection */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80">
                  <Image
                    src={content?.studioImage2 || '/contact/support-specialist.jpg'}
                    alt="NewLeaf Skills Quality inspection specialist"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    {content?.studioBadge2 || 'Quality Inspection Desk'}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {content?.studioTitle2 || 'Dedicated Punching Supervisors On Duty'}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {content?.studioDesc2 ||
                      'Every stitch angle, pull compensation, and tie-off is inspected with a 10x magnifier to guarantee zero thread breaks.'}
                  </p>
                </div>
              </div>

              {/* Quick Communication Box */}
              <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <span>{content?.urgentBadge || '⚡ Instant Studio Messenger'}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                    {content?.urgentHeading || 'Need Emergency Rush Digitizing or Urgent Revision?'}
                  </h3>
                  <p className="text-emerald-100 text-xs leading-relaxed">
                    {content?.urgentDesc ||
                      'Message our shift supervisor directly on WhatsApp or call our hotline for an immediate turnaround slot.'}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <a
                      href={`https://wa.me/${(content?.urgentWhatsappNumber || '919923790520').replace(/[^0-9]/g, '')}?text=Hello%20NewLeaf%20Skills,%20I%20have%20an%20urgent%20rush%20digitizing%20order.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>{content?.urgentWhatsappText || '💬 Chat on WhatsApp (+91 9923790520)'}</span>
                    </a>
                    <a
                      href={`tel:${(content?.urgentCallNumber || '+919923790520').replace(/[^0-9+]/g, '')}`}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition text-center border border-white/20 flex items-center justify-center gap-1"
                    >
                      <span>{content?.urgentCallText || '📞 Call Studio'}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Copy Email Helper Tool */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div className="truncate">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Direct Inquiries</span>
                  <span className="font-mono font-bold text-slate-800">{content?.officeEmail || contactDetails.emailPrimary}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(content?.officeEmail || contactDetails.emailPrimary)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 font-bold text-xs transition flex-shrink-0 shadow-2xs"
                >
                  {copiedEmail ? '✓ Copied!' : '📋 Copy Email'}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Physical Studio Location & Google Maps Integration */}
      <section className="px-4 sm:px-8 lg:px-16 py-12 bg-slate-50 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                {content?.mapBadge || 'Studio Location'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                {content?.mapHeading || 'Visit Our Digitization & Test Production Facility'}
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mt-0.5">
                {content?.mapDesc ||
                  'Situated in Nagpur, Maharashtra, our facility houses multi-head commercial machines, Wilcom & Pulse digitizing suites, and our 24/7 client dispatch crew.'}
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={content?.mapDirectionsUrl || contactDetails.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs transition flex items-center gap-1.5"
              >
                <span>🗺️ Get Driving Directions</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Address Summary Info Box (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shadow-2xs">
                    🏢
                  </span>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {content?.officeTitle || 'Registered Office'}
                    </h3>
                    <div className="text-sm font-black text-slate-900">
                      {content?.officeName || 'NewLeaf Skills Studio'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-700 leading-relaxed font-medium">
                  <div>{content?.officeLine1 || contactDetails.address.line1}</div>
                  <div>{content?.officeLine2 || contactDetails.address.line2}</div>
                  <div>{content?.officeCityState || `${contactDetails.address.city}, ${contactDetails.address.state} ${contactDetails.address.pincode}`}</div>
                  <div className="font-bold text-emerald-800">{content?.officeCountry || contactDetails.address.country}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-700 font-bold">📞 Call Us:</span>
                    <a
                      href={`tel:${content?.officePhone || contactDetails.phoneIndia}`}
                      className="hover:text-emerald-700 font-bold text-slate-900"
                    >
                      {content?.officePhoneFormatted || contactDetails.phoneIndiaFormatted}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-700 font-bold">✉️ Email:</span>
                    <a
                      href={`mailto:${content?.officeEmail || contactDetails.emailPrimary}`}
                      className="hover:text-emerald-700 font-semibold text-slate-900"
                    >
                      {content?.officeEmail || contactDetails.emailPrimary}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-emerald-700 font-bold">🕒 Hours:</span>
                    <span className="font-semibold text-slate-800">
                      {content?.officeHours || '24/7 Round-the-clock'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 block">
                  International client deliveries managed electronically via cloud stitch portals with automated DST/PES export.
                </span>
              </div>
            </div>

            {/* Embedded Google Map (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs min-h-[320px] relative bg-slate-200">
              <iframe
                title="NewLeaf Skills Nagpur Studio Location"
                src={content?.mapEmbedUrl || contactDetails.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ) Accordion */}
      <section id="faq" className="px-4 sm:px-8 lg:px-16 py-12 lg:py-16 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
              {content?.faqBadge || 'Got Questions?'}
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {content?.faqHeading || 'Frequently Asked Questions About Contacting Us'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              {content?.faqDescription ||
                'Everything you need to know about placing inquiries, turnarounds, machine sewouts, and revisions.'}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq: any, idx: number) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                      : 'border-slate-200/90 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {faq.category || 'General'}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faq.question || faq.q}
                      </span>
                    </div>
                    <span
                      className={`w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-emerald-100/60 mt-1 animate-in fade-in duration-150">
                      {faq.answer || faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              {content?.faqCtaHeading || 'Don’t see what you are looking for?'}
            </h3>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              {content?.faqCtaDesc ||
                'Our embroidery digitizers are standing by 24/7. Reach out via email or call our direct hotline for customized commercial quotes.'}
            </p>
            <div className="pt-1 flex flex-wrap justify-center gap-2">
              <a
                href={`mailto:${content?.officeEmail || contactDetails.emailPrimary}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
              >
                ✉️ Email {content?.officeEmail || contactDetails.emailPrimary}
              </a>
              <a
                href={`tel:${content?.officePhone || contactDetails.phoneIndia}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 font-bold text-xs transition shadow-2xs"
              >
                📞 Call {content?.officePhoneFormatted || contactDetails.phoneIndiaFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
