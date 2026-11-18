'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DropdownSubcategory {
  id: number;
  name: string;
  slug: string;
  serviceSlug?: string | null;
  serviceTitle?: string | null;
  directUrl?: string;
}

interface DropdownCategory {
  id: number;
  name: string;
  slug: string;
  serviceSlug?: string | null;
  serviceTitle?: string | null;
  directUrl?: string;
  subcategories?: DropdownSubcategory[];
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<DropdownCategory[]>([]);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    // Fetch dynamic categories for dropdown menu
    fetch('/api/services/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch((err) => {
        console.error('Header categories fetch error:', err);
      });
  }, []);

  const isOurWork = pathname === '/our-work' || pathname === '/ourwork' || pathname === '/work';
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  const isServices = pathname === '/services' || pathname.startsWith('/services/');
  const isAbout = pathname === '/about' || pathname.startsWith('/about/');
  const isContact = pathname === '/contact' || pathname.startsWith('/contact/');
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 font-sans">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0b1324] text-slate-300 px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-2.5 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-4 sm:gap-6 font-medium">
            <a href="tel:+919923790520" className="flex items-center gap-1.5 text-emerald-400 font-bold hover:text-emerald-300 transition text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>📞 +91 99237 90520</span>
            </a>
            <a href="mailto:info@newleafskills.com" className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              ✉️ info@newleafskills.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 sm:py-1 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ⚡ 6–8h Turnaround | Rush 2h
            </span>
            <span className="hidden md:inline-flex text-[11px] text-slate-400 font-medium">
              ⭐ Trusted by 10,000+ Shops
            </span>
          </div>
        </div>
      </div>

      {/* CLEAN LUXURY LIGHT NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none flex-shrink-0" aria-label="NewLeaf Skills - Home">
            <img
              src="/logo.png"
              alt="NewLeaf Skills - Master Digitizing Studio"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition duration-200 group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation Links (Responsive for xl and 2xl screens) */}
          <ul className="hidden xl:flex items-center gap-1 2xl:gap-2 font-medium text-[13px] 2xl:text-sm text-slate-700">
            <li>
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${isHome
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>Home</span>
                {isHome && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${isAbout
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>About</span>
                {isAbout && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>}
              </Link>
            </li>

            {/* Services with Multi-Tier Category & Subcategory Mega-Dropdown */}
            <li
              className="relative group py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                onClick={() => setServicesDropdownOpen(false)}
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1 ${isServices
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>Services</span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega Dropdown for Categories & Subcategories */}
              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 font-outfit">
                    {/* Header Bar */}
                    <div className="px-1 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-slate-700 tracking-wide font-outfit">Our Services &amp; Capabilities</span>
                      </span>
                      <span className="text-emerald-700 font-bold text-[11px] normal-case bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        ⚡ 6–8h Turnaround • 22+ Yrs
                      </span>
                    </div>

                  {/* Categories Grid */}
                  <div className="py-3.5 grid grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                    {categories.length > 0 ? (
                      categories.map((cat) => {
                        const catDirectUrl = cat.directUrl || (cat.serviceSlug ? `/services/${cat.serviceSlug}` : `/services?category=${encodeURIComponent(cat.name)}`);
                        return (
                          <div
                            key={cat.id}
                            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <Link
                                href={catDirectUrl}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="font-bold text-sm text-slate-900 hover:text-emerald-700 flex items-center justify-between group/cat transition-colors"
                              >
                                <span className="font-outfit tracking-tight">{cat.name}</span>
                                <span className="text-xs text-emerald-600 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                                  →
                                </span>
                              </Link>

                              {cat.subcategories && cat.subcategories.length > 0 ? (
                                <ul className="mt-2.5 space-y-1.5 pl-2.5 border-l-2 border-emerald-300/60 font-jakarta">
                                  {cat.subcategories.map((sub) => {
                                    const subDirectUrl = sub.directUrl || (sub.serviceSlug ? `/services/${sub.serviceSlug}` : `/services?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub.name)}`);
                                    return (
                                      <li key={sub.id}>
                                        <Link
                                          href={subDirectUrl}
                                          onClick={() => setServicesDropdownOpen(false)}
                                          className="text-xs text-slate-600 hover:text-emerald-700 hover:font-semibold flex items-center justify-between group/sub py-0.5 transition-colors"
                                        >
                                          <span className="truncate">{sub.name}</span>
                                          {sub.serviceSlug && (
                                            <span className="text-[10px] text-emerald-600 font-bold opacity-0 group-hover/sub:opacity-100 transition-opacity ml-1">
                                              Open ↗
                                            </span>
                                          )}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic block mt-1.5 font-jakarta">
                                  Single service category
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      /* Fallback while loading */
                      <>
                        <Link
                          href="/services/embroidery-digitizing"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="p-3.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition"
                        >
                          <div className="font-bold text-sm font-outfit">Embroidery Digitizing</div>
                          <div className="text-xs text-slate-400 font-jakarta mt-0.5">Cap, Left Chest, Jacket Back</div>
                        </Link>
                        <Link
                          href="/services/custom-logo-digitizing"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="p-3.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition"
                        >
                          <div className="font-bold text-sm font-outfit">Custom Logo Digitizing</div>
                          <div className="text-xs text-slate-400 font-jakarta mt-0.5">Vector-to-Stitch Precision</div>
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-jakarta">
                    <span className="text-xs text-slate-500">Need custom format or high volume pricing?</span>
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs hover:shadow-emerald-600/20"
                    >
                      <span>Explore All Services</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            </li>

            <li>
              <Link
                href="/our-work"
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${isOurWork
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>Our Work</span>
                {isOurWork && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>}
              </Link>
            </li>

            <li>
              <Link
                href="/blog"
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${isBlog
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>Blog</span>
                {isBlog && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>}
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={`px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 ${isContact
                  ? 'text-emerald-900 font-extrabold bg-emerald-100/90 ring-1.5 ring-emerald-400 shadow-2xs'
                  : 'hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
              >
                <span>Contact</span>
                {isContact && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>}
              </Link>
            </li>
            <li>
              <Link
                href="/contact#quote"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 hover:scale-[1.02] transition-all inline-flex items-center gap-1.5 ml-2 cursor-pointer"
              >
                <span>Get Free Quote</span>
                <span>⚡</span>
              </Link>
            </li>
          </ul>

          {/* Right Action on Mobile: Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/contact#quote"
              className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs inline-flex items-center gap-1"
            >
              <span>Quote</span>
              <span>⚡</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-800 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200/90 space-y-2 text-sm font-semibold text-slate-700 animate-in fade-in slide-in-from-top-2 duration-200 pb-3 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isHome ? 'bg-emerald-100/90 text-emerald-950 font-black ring-1 ring-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span>Home</span>
                {isHome && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isAbout ? 'bg-emerald-100/90 text-emerald-950 font-black ring-1 ring-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>About Us</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">22+ Yrs</span>
                </span>
                {isAbout && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
              </Link>

              {/* Services Accordion with Categories & Subcategories in Mobile */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between py-2 px-2 text-slate-800 font-bold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>💼 Services &amp; Categories</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      {categories.length}
                    </span>
                  </span>
                  <span className={`text-xs transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {mobileServicesOpen && (
                  <div className="mt-2 pt-2 border-t border-slate-200 space-y-2 pl-2">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg block"
                    >
                      ✨ View All Services Catalog
                    </Link>
                    {categories.map((c) => {
                      const catDirectUrl = c.directUrl || (c.serviceSlug ? `/services/${c.serviceSlug}` : `/services?category=${encodeURIComponent(c.name)}`);
                      return (
                        <div key={c.id} className="space-y-1">
                          <Link
                            href={catDirectUrl}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-bold text-xs text-slate-800 hover:text-emerald-700 block"
                          >
                            • {c.name}
                          </Link>
                          {c.subcategories && c.subcategories.map((sub) => {
                            const subDirectUrl = sub.directUrl || (sub.serviceSlug ? `/services/${sub.serviceSlug}` : `/services?category=${encodeURIComponent(c.name)}&subcategory=${encodeURIComponent(sub.name)}`);
                            return (
                              <Link
                                key={sub.id}
                                href={subDirectUrl}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[11px] text-slate-600 pl-4 block py-0.5 hover:text-emerald-700"
                              >
                                ↳ {sub.name} {sub.serviceSlug && <span className="text-[9px] text-emerald-600 font-bold ml-1">↗</span>}
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/our-work"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isOurWork ? 'bg-emerald-100/90 text-emerald-950 font-black ring-1 ring-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span>Our Work</span>
                {isOurWork && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isBlog ? 'bg-emerald-100/90 text-emerald-950 font-black ring-1 ring-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>Blog &amp; Guides</span>
                  {isBlog && (
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </span>
                {isBlog && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isContact ? 'bg-emerald-100/90 text-emerald-950 font-black ring-1 ring-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>Contact Us</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">24/7 Studio</span>
                </span>
                {isContact && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
              </Link>
            </div>

            {/* Prominent FAQ & Quote Action in Mobile Menu */}
            <div className="pt-2">
              <a
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide shadow-md shadow-emerald-600/20 transition-all text-center"
              >
                <span className="flex items-center gap-2">
                  <span>💬 FAQ &amp; Get Free Quote</span>
                </span>
                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">Jump →</span>
              </a>
            </div>

            {/* Quick Contact Line in Mobile Drawer */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <a href="tel:+919923790520" className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
                <span>📞 +91 99237 90520</span>
              </a>
              <span className="text-slate-400">⚡ Turnaround: 6–8 Hours</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
