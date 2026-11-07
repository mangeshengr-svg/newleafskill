'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { ServiceItem, ServiceCategory } from '@/types/service';
import {
  servicesData as fallbackServicesData,
  serviceWorkflowSteps,
  servicesFaqList,
} from '@/data/servicesData';
import { FaqItem } from '@/types/faq';

interface ServicesPageContentProps {
  initialServices?: ServiceItem[];
  faqs?: FaqItem[];
  categoriesHierarchy?: ServiceCategory[];
  initialCategory?: string;
  initialSubcategory?: string;
  initialSearch?: string;
}

export default function ServicesPageContent({
  initialServices,
  faqs: propFaqs,
  categoriesHierarchy = [],
  initialCategory,
  initialSubcategory,
  initialSearch,
}: ServicesPageContentProps) {
  const servicesData = initialServices && initialServices.length > 0 ? initialServices : fallbackServicesData;
  const faqs = propFaqs && propFaqs.length > 0 ? propFaqs : servicesFaqList;

  // Active Category & Subcategory Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleRequestQuote = (serviceTitle: string) => {
    window.location.href = `/contact#quote`;
  };

  // Synchronize state if URL query params change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(decodeURIComponent(initialCategory));
    } else {
      setSelectedCategory('All');
    }

    if (initialSubcategory) {
      setSelectedSubcategory(decodeURIComponent(initialSubcategory));
    } else {
      setSelectedSubcategory('All');
    }
  }, [initialCategory, initialSubcategory]);

  // Read client-side search params on first mount if any
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const subParam = params.get('subcategory');
      const searchParam = params.get('search');

      if (catParam) setSelectedCategory(decodeURIComponent(catParam));
      if (subParam) setSelectedSubcategory(decodeURIComponent(subParam));
      if (searchParam) setSearchQuery(searchParam);
    }
  }, []);

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

  // Find subcategories belonging to current selected category
  const activeCategoryObject = useMemo(() => {
    if (selectedCategory === 'All') return null;
    return categoriesHierarchy.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase() || c.slug === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, categoriesHierarchy]);

  const activeSubcategories = useMemo(() => {
    return activeCategoryObject?.subcategories || [];
  }, [activeCategoryObject]);

  // Filter services by Category, Subcategory, and Search Query
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      // 1. Category check
      if (selectedCategory !== 'All') {
        const matchesCat =
          (service.category && service.category.toLowerCase() === selectedCategory.toLowerCase()) ||
          (activeCategoryObject && service.categoryId === activeCategoryObject.id);
        if (!matchesCat) return false;
      }

      // 2. Subcategory check
      if (selectedSubcategory !== 'All') {
        const matchesSub =
          (service.subcategory && service.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()) ||
          service.category.toLowerCase() === selectedSubcategory.toLowerCase();
        if (!matchesSub) return false;
      }

      // 3. Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        service.title.toLowerCase().includes(q) ||
        (service.shortDesc && service.shortDesc.toLowerCase().includes(q)) ||
        (service.tag && service.tag.toLowerCase().includes(q)) ||
        (service.badge && service.badge.toLowerCase().includes(q)) ||
        (service.category && service.category.toLowerCase().includes(q)) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(q)) ||
        (service.fabrics && service.fabrics.some((f) => f.toLowerCase().includes(q))) ||
        (service.subOfferings &&
          service.subOfferings.some(
            (sub) =>
              (sub.title && sub.title.toLowerCase().includes(q)) ||
              (sub.desc && sub.desc.toLowerCase().includes(q))
          ))
      );
    });
  }, [servicesData, selectedCategory, selectedSubcategory, searchQuery, activeCategoryObject]);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header (Navbar & Announcement Bar) */}
      <Header />

      {/* 2. Hero Banner with Clean Overlay */}
      <section className="relative w-full min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/services/services-hero-banner.jpg"
            alt="NewLeaf Skills Commercial Embroidery Digitizing Services Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.25),transparent_70%)]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Industrial Punching • 22+ Years Veteran Studio</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                Commercial Services &amp; Catalog
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl drop-shadow">
                Explore hand-crafted manual punching, 3D foam puff, vector conversion, and sacred vestments embroidery optimized for multi-head production.
              </p>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex-shrink-0">
              <nav aria-label="Breadcrumb" className="bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-2 flex-wrap shadow-lg">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <span className="text-slate-500 font-bold">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Services</span>
                </span>
                {selectedCategory !== 'All' && (
                  <>
                    <span className="text-slate-500 font-bold">/</span>
                    <span className="text-emerald-200 font-bold">{selectedCategory}</span>
                  </>
                )}
                {selectedSubcategory !== 'All' && (
                  <>
                    <span className="text-slate-500 font-bold">/</span>
                    <span className="text-white font-bold">{selectedSubcategory}</span>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Container with Category Sidebar & Services Grid */}
      <section id="service-catalog" className="px-4 sm:px-8 lg:px-20 py-10 sm:py-14 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Search Bar & Stats Header */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-black text-slate-900">
                Found {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'}
              </span>
              {(selectedCategory !== 'All' || selectedSubcategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubcategory('All');
                    setSearchQuery('');
                  }}
                  className="text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition cursor-pointer"
                >
                  ✕ Reset Filters
                </button>
              )}
            </div>

            {/* Quick Live Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search services, fabrics, formats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                  🔍
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Layout: Left Category & Subcategory Sidebar + Right Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Sidebar: Categories Navigation */}
            <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span>📁</span>
                    <span>Service Categories</span>
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">
                    {categoriesHierarchy.length}
                  </span>
                </div>

                {/* Category Links */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedSubcategory('All');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      selectedCategory === 'All'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>All Services Catalog</span>
                    <span className="text-[10px] font-mono opacity-80">{servicesData.length}</span>
                  </button>

                  {categoriesHierarchy.map((cat) => {
                    const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                    const serviceCount = servicesData.filter(
                      (s) => (s.category && s.category.toLowerCase() === cat.name.toLowerCase()) || s.categoryId === cat.id
                    ).length;

                    return (
                      <div key={cat.id} className="space-y-0.5">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedSubcategory('All');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {serviceCount}
                          </span>
                        </button>

                        {/* Subcategories (Visible if this parent is selected or has subcategories) */}
                        {cat.subcategories && cat.subcategories.length > 0 && isSelected && (
                          <div className="pl-3 pt-1 pb-1 space-y-1 border-l-2 border-emerald-400 ml-3">
                            <button
                              onClick={() => setSelectedSubcategory('All')}
                              className={`w-full text-left px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                                selectedSubcategory === 'All'
                                  ? 'text-emerald-700 bg-emerald-50 font-black'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              • All in {cat.name}
                            </button>
                            {cat.subcategories.map((sub) => {
                              const isSubActive = selectedSubcategory.toLowerCase() === sub.name.toLowerCase();
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => setSelectedSubcategory(sub.name)}
                                  className={`w-full text-left px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center justify-between ${
                                    isSubActive
                                      ? 'text-emerald-800 bg-emerald-100/80 font-black'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                                >
                                  <span className="truncate">↳ {sub.name}</span>
                                  {isSubActive && <span className="text-emerald-600 font-bold">✓</span>}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Need Custom Digitizing Callout */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 space-y-3 shadow-md">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded">
                  ⚡ Custom Quote
                </span>
                <h4 className="font-extrabold text-sm leading-tight">Need a custom sewout or punch file?</h4>
                <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                  Send your logo or rough artwork. We evaluate stitch paths and return an estimate in 15 minutes.
                </p>
                <Link
                  href="/contact#quote"
                  className="block text-center bg-white hover:bg-emerald-50 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl shadow-xs transition"
                >
                  Request Quote Now →
                </Link>
              </div>
            </aside>

            {/* Right Column: Services Listing Grid (9 cols) */}
            <div className="lg:col-span-9 space-y-6">

              {/* Filter Active Breadcrumb Indicator */}
              {(selectedCategory !== 'All' || selectedSubcategory !== 'All') && (
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-900">Active View:</span>
                    <span className="bg-white text-emerald-800 px-2 py-0.5 rounded-md font-extrabold border border-emerald-300">
                      {selectedCategory}
                    </span>
                    {selectedSubcategory !== 'All' && (
                      <>
                        <span className="text-emerald-500">↳</span>
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold">
                          {selectedSubcategory}
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedSubcategory('All');
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {/* Empty state if search returns nothing */}
              {filteredServices.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
                  <div className="text-5xl">🧵</div>
                  <h3 className="text-xl font-bold text-slate-900">No services found in this category</h3>
                  <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                    We currently don&apos;t have active services listed under this selection. Try browsing all services.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedSubcategory('All');
                      setSearchQuery('');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    View All Services Catalog
                  </button>
                </div>
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id || service.slug}
                    id={service.slug}
                    className="relative bg-white text-slate-800 rounded-2xl border border-slate-200/90 p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-400 group shadow-sm overflow-hidden"
                  >
                    {/* Number Badge Top Right */}
                    <div className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      {service.num}
                    </div>

                    {/* Showcase Image Frame */}
                    <div className="flex justify-center mb-4 w-full">
                      <Link
                        href={`/services/${service.slug}`}
                        className="relative h-56 sm:h-64 aspect-[7/10] rounded-xl overflow-hidden border border-slate-200 shadow-xs group-hover:shadow-md group-hover:border-emerald-500/50 transition-all duration-300 bg-slate-50 block w-full"
                      >
                        <img
                          src={service.image}
                          alt={service.imageAlt || service.title}
                          className="w-full h-full object-cover scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md text-center border border-emerald-500/30 truncate">
                          {service.tag}
                        </div>
                      </Link>
                    </div>

                    {/* Category & Subcategory Pill */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-300/60 uppercase tracking-wider">
                        {service.category}
                      </span>
                      {service.subcategory && (
                        <span className="inline-block bg-slate-100 text-slate-600 font-semibold text-[10px] px-2 py-0.5 rounded-md border border-slate-200">
                          {service.subcategory}
                        </span>
                      )}
                    </div>

                    {/* Title & Short Description */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-base font-black text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors tracking-tight line-clamp-2"
                    >
                      {service.title}
                    </Link>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Technical Specs Footer */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mb-3">
                      <span className="flex items-center gap-1 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="truncate">{service.turnaround ? service.turnaround.split('(')[0] : '6–8 Hours'}</span>
                      </span>
                      <span className="font-mono text-emerald-700 font-bold text-[10px] shrink-0">100% Free Edits</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs py-2 px-2 rounded-xl border border-slate-200 hover:border-emerald-300 transition flex items-center justify-center gap-1"
                      >
                        <span>Details</span>
                        <span>→</span>
                      </Link>
                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-2 rounded-xl shadow-xs transition hover:shadow-md cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Quick Look</span>
                        <span>🔍</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. 5-Step Commercial Digitizing & Stitching Workflow */}
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
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Step {stepItem.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Production FAQs Accordion (Category & Subcategory Aware) */}
      <section id="faq" className="px-4 sm:px-8 lg:px-20 py-16 bg-slate-50 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Commercial Services FAQ
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              {selectedCategory !== 'All' ? (
                <>Showing questions for <strong className="text-emerald-700">{selectedCategory}</strong>{selectedSubcategory !== 'All' ? <> &bull; <span className="text-slate-700">{selectedSubcategory}</span></> : ''}</>
              ) : (
                'Find answers to all commercial embroidery digitizing, file formats, turnarounds, and machine questions.'
              )}
            </p>
          </div>

          {/* Category Filter Chips inside FAQ */}
          {categoriesHierarchy.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSubcategory('All');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All FAQs ({faqs.length})
              </button>
              {categoriesHierarchy.map((cat) => {
                const countInCat = faqs.filter(
                  (f: any) =>
                    (f.category && f.category.toLowerCase() === cat.name.toLowerCase()) ||
                    f.category_id === cat.id
                ).length;
                if (countInCat === 0) return null;
                const isCatSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSelectedSubcategory('All');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      isCatSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-80">({countInCat})</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-3">
            {(() => {
              // Filter faqs by selected category/subcategory if user chose one
              const displayedFaqs = faqs.filter((faq: any) => {
                if (selectedCategory !== 'All') {
                  const matchCat =
                    (faq.category && faq.category.toLowerCase() === selectedCategory.toLowerCase()) ||
                    (activeCategoryObject && faq.category_id === activeCategoryObject.id);
                  if (!matchCat) return false;
                }
                if (selectedSubcategory !== 'All') {
                  const matchSub =
                    (faq.subcategory && faq.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()) ||
                    faq.subcategory_id === activeCategoryObject?.subcategories?.find((s) => s.name.toLowerCase() === selectedSubcategory.toLowerCase())?.id;
                  if (!matchSub) return false;
                }
                return true;
              });

              const finalFaqsList = displayedFaqs.length > 0 ? displayedFaqs : faqs;

              return finalFaqsList.map((faq: any, idx: number) => (
                <div
                  key={faq.id || idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {faq.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                            {faq.category}
                          </span>
                        )}
                        {faq.subcategory && (
                          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            ↳ {faq.subcategory}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-extrabold text-slate-900">{faq.question}</p>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0 border border-emerald-200">
                      {openFaqIndex === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* 6. Quick Preview Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
