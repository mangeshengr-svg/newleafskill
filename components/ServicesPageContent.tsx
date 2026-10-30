'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { ServiceItem } from '@/types/service';
import {
  servicesData as fallbackServicesData,
  serviceCategories,
  serviceWorkflowSteps,
  servicesFaqList,
} from '@/data/servicesData';

import { FaqItem } from '@/types/faq';

interface ServicesPageContentProps {
  initialServices?: ServiceItem[];
  faqs?: FaqItem[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ServicesPageContent({
  initialServices,
  faqs: propFaqs,
  initialCategory,
  initialSearch,
}: ServicesPageContentProps) {
  const servicesData = initialServices && initialServices.length > 0 ? initialServices : fallbackServicesData;
  const faqs = propFaqs && propFaqs.length > 0 ? propFaqs : servicesFaqList;

  // Derive all distinct categories dynamically from services data
  const availableCategories = useMemo(() => {
    const fromData = Array.from(new Set(servicesData.map((s) => s.category).filter(Boolean)));
    const merged = ['All', ...serviceCategories.filter((c) => c !== 'All')];
    fromData.forEach((c) => {
      if (!merged.includes(c)) merged.push(c);
    });
    return merged;
  }, [servicesData]);

  // Normalize initial category from prop or query param if matched
  const resolvedInitialCategory = useMemo(() => {
    if (!initialCategory) return 'All';
    const decoded = decodeURIComponent(initialCategory).trim().toLowerCase();
    const matched = availableCategories.find(
      (c) => c.toLowerCase() === decoded || c.toLowerCase().replace(/\s+/g, '-') === decoded
    );
    return matched || 'All';
  }, [initialCategory, availableCategories]);

  const [selectedCategory, setSelectedCategory] = useState<string>(resolvedInitialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync state if initialCategory changes (e.g. navigation)
  useEffect(() => {
    if (initialCategory) {
      const decoded = decodeURIComponent(initialCategory).trim().toLowerCase();
      const matched = availableCategories.find(
        (c) => c.toLowerCase() === decoded || c.toLowerCase().replace(/\s+/g, '-') === decoded
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    }
  }, [initialCategory, availableCategories]);

  // Check URL search params or hash on client side as well
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const decoded = decodeURIComponent(catParam).trim().toLowerCase();
        const matched = availableCategories.find(
          (c) => c.toLowerCase() === decoded || c.toLowerCase().replace(/\s+/g, '-') === decoded
        );
        if (matched) setSelectedCategory(matched);
      }
      const searchParam = params.get('search');
      if (searchParam) setSearchQuery(searchParam);
    }
  }, [availableCategories]);

  // Auto-detect hash in URL to scroll and open service modal
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const matched = servicesData.find(
        (s) => s.slug.toLowerCase() === hash || s.id.toLowerCase() === hash
      );
      if (matched) {
        setSelectedService(matched);
        setTimeout(() => {
          const el = document.getElementById(matched.slug);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  }, [servicesData]);

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        service.title.toLowerCase().includes(q) ||
        (service.shortDesc && service.shortDesc.toLowerCase().includes(q)) ||
        (service.tag && service.tag.toLowerCase().includes(q)) ||
        (service.badge && service.badge.toLowerCase().includes(q)) ||
        (service.fabrics && service.fabrics.some((f) => f.toLowerCase().includes(q))) ||
        (service.subOfferings &&
          service.subOfferings.some(
            (sub) =>
              (sub.title && sub.title.toLowerCase().includes(q)) ||
              (sub.desc && sub.desc.toLowerCase().includes(q))
          ))
      );
    });
  }, [servicesData, selectedCategory, searchQuery]);

  const handleRequestQuote = (serviceTitle: string) => {
    window.location.href = `/contact#quote`;
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header (Navbar & Announcement Bar) */}
      <Header />

      {/* 2. Cityo-Style Breadcrumb & Title Hero Banner with Background Image */}
      <section className="relative w-full min-h-[190px] sm:min-h-[230px] lg:min-h-[260px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        {/* Background Image Container with Light Translucent Overlay for high photo visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/services/services-hero-banner.jpg"
            alt="NewLeaf Skills Commercial Embroidery Digitizing Services Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          {/* Light Cinematic Gradient Overlay so background embroidery is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.22),transparent_70%)]" />
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Banner Content: Left Title + Right Breadcrumb (Identical to Cityo WordPress theme) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Prominent Page Identifier "Services" with high contrast against the visible photo */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest font-jakarta backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Commercial Embroidery Services &amp; Punching Solutions</span>
              </div>
              
              <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-md">
                  Services
                </span>
                <span className="text-emerald-400 text-2xl sm:text-4xl font-light drop-shadow">/</span>
                <span className="text-white sm:text-emerald-300 text-xl sm:text-3xl font-bold font-jakarta drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Master Offerings
                </span>
              </h1>

              <p className="text-slate-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Serving commercial apparel decorators, embroidery factories, and garment brands worldwide with 22+ years of manual punching excellence and zero thread breaks.
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
                  <span>Services</span>
                </span>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom subtle glowing border */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent z-10" />
      </section>

      {/* 2b. Metrics & Quick Actions Bar */}
      <section className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Quick Metrics Bar (Clean Luxury Light) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">22+ Years</div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mt-0.5">Industry Expertise</div>
              <p className="text-[11px] text-slate-500 mt-1">Manual punching with zero auto-software flaws</p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">6–8 Hours</div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mt-0.5">Fast Turnaround</div>
              <p className="text-[11px] text-slate-500 mt-1">Super rush 2-hour delivery available on request</p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">1,000 SPM</div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mt-0.5">Machine Validated</div>
              <p className="text-[11px] text-slate-500 mt-1">Tajima, Barudan, Brother, Melco &amp; SWF ready</p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">100% Free</div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mt-0.5">Unlimited Revisions</div>
              <p className="text-[11px] text-slate-500 mt-1">Guaranteed until your machine runs clean</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#service-catalog"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Explore All Services</span>
                <span>↓</span>
              </a>
              <a
                href="/#faq"
                className="bg-white hover:bg-slate-50 text-emerald-800 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm border border-emerald-300 shadow-2xs hover:border-emerald-500 transition-all flex items-center gap-2"
              >
                <span>Instant Free Quote &amp; Sewout</span>
                <span>⚡</span>
              </a>
            </div>
            <a
              href="tel:+919923790520"
              className="text-slate-700 hover:text-emerald-700 font-bold px-4 py-3 text-xs sm:text-sm flex items-center gap-1.5 transition"
            >
              <span>📞 +91 99237 90520</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Sticky Filter Toolbar & Live Search */}
      <section id="service-catalog" className="sticky top-[95px] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-8 lg:px-20 py-3.5 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {availableCategories.map((cat) => {
              const count =
                cat === 'All'
                  ? servicesData.length
                  : servicesData.filter((s) => s.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/80'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, fabrics, formats..."
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. Core Services Showcase Grid */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-slate-50/60">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Count and Reset Toolbar */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
            <div>
              Showing <span className="font-bold text-emerald-800">{filteredServices.length}</span> specialized services
              {selectedCategory !== 'All' && (
                <span> in <strong className="text-slate-800">{selectedCategory}</strong></span>
              )}
              {searchQuery && (
                <span> matching &ldquo;<strong className="text-emerald-700">{searchQuery}</strong>&rdquo;</span>
              )}
            </div>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer text-xs"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Empty state if search returns nothing */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
              <div className="text-5xl">🧵</div>
              <h3 className="text-xl font-bold text-slate-900">No services match your search</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                We couldn&apos;t find any service matching &ldquo;{searchQuery}&rdquo;. Try another keyword or browse all our offerings.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Show All Services
              </button>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id || service.slug}
                id={service.slug}
                className="relative bg-white text-slate-800 rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-400 group shadow-sm overflow-hidden"
              >
                {/* Number Badge Top Right */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {service.num}
                </div>

                {/* Showcase Image Frame */}
                <div className="flex justify-center mb-5 w-full">
                  <div
                    onClick={() => setSelectedService(service)}
                    className="relative h-64 sm:h-72 aspect-[7/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md group-hover:shadow-lg group-hover:border-emerald-500/50 transition-all duration-300 bg-slate-50 cursor-pointer"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md text-center border border-emerald-500/30">
                      {service.tag}
                    </div>
                  </div>
                </div>

                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border border-emerald-300/60 uppercase tracking-wider">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span className="inline-block bg-slate-100 text-slate-600 font-semibold text-[10px] px-2 py-0.5 rounded-md border border-slate-200">
                      {service.badge.split('•')[0]}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <h2
                  onClick={() => setSelectedService(service)}
                  className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors tracking-tight cursor-pointer"
                >
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                  {service.shortDesc}
                </p>

                {/* Sub-Offerings Quick Bullet List */}
                {service.subOfferings && service.subOfferings.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-5 space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      ✨ Popular Applications:
                    </span>
                    <div className="space-y-1 text-slate-700 font-medium">
                      {service.subOfferings.slice(0, 3).map((sub, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="truncate">{sub.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specs Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Turnaround: <strong className="text-slate-800">{service.turnaround ? service.turnaround.split('(')[0] : '6–8 Hours'}</strong></span>
                  </span>
                  <span className="font-mono text-emerald-700 font-bold text-[11px]">100% Free Edits</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Page</span>
                    <span>→</span>
                  </Link>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-xs transition hover:shadow-md cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Quick Preview</span>
                    <span>🔍</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5-Step Commercial Digitizing & Stitching Workflow */}
      <section className="px-4 sm:px-8 lg:px-20 py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3.5 py-1 rounded-full border border-emerald-300 uppercase tracking-widest">
              ⚡ How It Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our 5-Step Commercial Production Process
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From your initial vector artwork or rough sketch to a flawless machine-tested sewout ready for 1,000 SPM continuous runs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceWorkflowSteps.map((stepItem, index) => (
              <div
                key={index}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {stepItem.icon}
                  </span>
                  <span className="font-mono font-black text-xs text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    STEP {stepItem.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 group-hover:text-emerald-700 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Supported Industrial Machine File Formats */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-8 lg:px-20 text-center border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="inline-block">
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-extrabold bg-slate-800/80 px-3 py-1 rounded-full border border-emerald-500/30">
              Universal Machine Compatibility
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Supported Commercial Machine Formats &amp; Software
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Every digitized file is exported in your machine&apos;s native format along with an authentic PDF sewout proof and color stop sequence sheet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            {[
              { format: 'DST', brand: 'Tajima Commercial' },
              { format: 'PES', brand: 'Brother / Babylock' },
              { format: 'EXP', brand: 'Melco / Bernina' },
              { format: 'JEF', brand: 'Janome / Elna' },
              { format: 'DSB', brand: 'Barudan Industrial' },
              { format: 'VP3', brand: 'Husqvarna Viking' },
              { format: 'XXX', brand: 'Compucon / Singer' },
              { format: 'EMB', brand: 'Wilcom Source File' },
              { format: 'PDF', brand: 'Color Stop Sheet' },
            ].map((item) => (
              <div
                key={item.format}
                className="bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700/80 hover:border-emerald-400 transition"
              >
                <div className="font-bold text-emerald-400 text-sm">{item.format}</div>
                <div className="text-[10px] text-slate-400">{item.brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Businesses Worldwide Choose New Leaf Skills */}
      <section className="px-4 sm:px-8 lg:px-20 py-16 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3.5 py-1 rounded-full border border-emerald-300 uppercase tracking-widest">
              🌟 The New Leaf Skills Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why 10,000+ Apparel Decorators Trust Our Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Auto-software digitizing creates bird nests, uneven density, and broken needles. Here is why veteran manual punching saves you thousands in production hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Zero Thread Breaks Guarantee</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We calibrate stitch density (0.38mm–0.42mm) and program gradual angle turns so multi-head machines can cruise at 1,000 stitches per minute without operator interruptions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                🎯
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Fabric Pull &amp; Push Physics</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Knits stretch differently than structured cap buckram or delicate silks. Our files feature customized underlay types and pull offsets that completely eliminate fabric puckering.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                🌍
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">24/7 Global Delivery &amp; Revisions</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                With punchers active around the clock across the USA, UK, Canada, Australia, Europe, and India, your urgent production files are returned in 6–8 hours with 100% free edits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions Accordion */}
      <section className="px-4 sm:px-8 lg:px-20 py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3.5 py-1 rounded-full border border-emerald-300 uppercase tracking-widest">
              💬 Service Questions Answered
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions About Our Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Answers regarding file formats, production turnaround, stitch quality, and order customization.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/70"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 font-extrabold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-600 text-xs">Q.</span>
                      <span>{faq.question}</span>
                    </span>
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. High-Converting Instant Quote / Consultation CTA Banner */}
      <section className="px-4 sm:px-8 lg:px-20 py-16 bg-gradient-to-b from-slate-100 via-emerald-50/50 to-slate-100 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300">
            <span>⚡</span> 6–8 Hour Delivery | 100% Free Virtual Sewout Proof
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Digitize Your Next Design?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Upload your logo, artwork, or garment design. Our veteran punchers will analyze your fabric type and provide a high-precision machine file with zero puckering guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="/#faq"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-xl text-sm shadow-md shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Free Instant Quote</span>
              <span>⚡</span>
            </a>
            <a
              href="tel:+919923790520"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-4 rounded-xl text-sm border border-slate-300 hover:border-emerald-600 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📞 Call Us: +91 99237 90520</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> No Credit Card Required for Quote
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> 100% Free Unlimited Minor Revisions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> 24/7 Punching Studio Support
            </span>
          </div>
        </div>
      </section>

      {/* 10. Interactive Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
