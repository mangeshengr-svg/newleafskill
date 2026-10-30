'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOurWork = mounted && (pathname === '/our-work' || pathname === '/ourwork' || pathname === '/work');
  const isBlog = mounted && (pathname === '/blog' || pathname.startsWith('/blog/'));
  const isServices = mounted && (pathname === '/services' || pathname.startsWith('/services/'));
  const isAbout = mounted && (pathname === '/about' || pathname.startsWith('/about/'));
  const isContact = mounted && (pathname === '/contact' || pathname.startsWith('/contact/'));
  const isHome = mounted && (pathname === '/');

  return (
    <header className="sticky top-0 z-50">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0b1324] text-slate-300 px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-2.5 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-4 sm:gap-6 font-medium">
            <a href="tel:+919923790520" className="flex items-center gap-1.5 text-emerald-400 font-bold hover:text-emerald-300 transition">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>📞 +91 99237 90520</span>
            </a>
            <a href="mailto:info@newleafskills.com" className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              ✉️ info@newleafskills.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ⚡ Turnaround: 6–8 Hours | Rush 2h
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

            <li
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
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

              {/* Desktop Hover Dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Commercial Studio Offerings</span>
                    <span className="text-emerald-700 font-bold">22+ Years</span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/services/embroidery-digitizing"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">Embroidery Digitizing</div>
                        <div className="text-[10px] text-slate-400">Manual hand-punched, 1,000 SPM</div>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Core</span>
                    </Link>

                    <Link
                      href="/services/computerized-embroidery"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">Computerized Embroidery</div>
                        <div className="text-[10px] text-slate-400">High-speed multi-head production</div>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">Bulk</span>
                    </Link>

                    <Link
                      href="/services/vestments-embroidery"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">Vestments Embroidery</div>
                        <div className="text-[10px] text-slate-400">Gold bullion sacred robes &amp; stoles</div>
                      </div>
                      <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">Sacred</span>
                    </Link>

                    <Link
                      href="/services/apparel-logo-digitizing"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">Apparel Logo Digitizing</div>
                        <div className="text-[10px] text-slate-400">Polos, hoodies, uniforms &amp; caps</div>
                      </div>
                      <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">Uniforms</span>
                    </Link>

                    <Link
                      href="/services/custom-logo-digitizing"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">Custom Logo Digitizing</div>
                        <div className="text-[10px] text-slate-400">Vector-to-stitch Pantone matching</div>
                      </div>
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Vector</span>
                    </Link>

                    <Link
                      href="/services/3d-puff-digitizing"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 transition group/item"
                    >
                      <div>
                        <div className="font-bold text-xs group-hover/item:text-emerald-800">3D Puff Digitizing</div>
                        <div className="text-[10px] text-slate-400">Raised foam relief for snapbacks</div>
                      </div>
                      <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">3D Foam</span>
                    </Link>
                  </div>

                  <div className="pt-1.5 mt-1 border-t border-slate-100">
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs transition shadow-2xs"
                    >
                      <span>✨ View All Services Catalog</span>
                      <span>→</span>
                    </Link>
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
                className="ml-1 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 hover:bg-emerald-100 hover:border-emerald-300 transition shadow-xs flex items-center gap-1.5"
              >
                <span>FAQ &amp; Quote</span>
                <span className="text-emerald-600 font-normal">→</span>
              </Link>
            </li>
          </ul>

          {/* Mobile menu hamburger toggle button (Visible on tablet & mobile below xl) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 active:bg-slate-200 transition-all border border-slate-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200 bg-white/98 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 shadow-2xl space-y-2 text-sm font-semibold text-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isHome ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span>Home</span>
                <span className="text-xs text-emerald-600 font-normal">Top</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isAbout ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>About Us</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">22+ Yrs</span>
                </span>
                <span className="text-xs text-emerald-600 font-bold">Story →</span>
              </Link>
              <a
                href="/#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <span>Quality Inspector</span>
                <span className="text-xs text-slate-400 font-normal">Compare</span>
              </a>
              <Link
                href="/our-work"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isOurWork ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span>Our Work</span>
                <span className="text-xs text-emerald-600 font-bold">Portfolio →</span>
              </Link>
              <a
                href="/#why-choose-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <span>Why Choose Us</span>
                <span className="text-xs text-slate-400 font-normal">Features</span>
              </a>
              <a
                href="/#live-machine"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  Live Machine
                </span>
                <span className="text-xs text-rose-500 font-bold uppercase tracking-wider">Live</span>
              </a>
              <a
                href="/#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <span>Stitch Categories</span>
                <span className="text-xs text-slate-400 font-normal">Techniques</span>
              </a>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isServices ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>Services</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">6 Core</span>
                </span>
                <span className="text-xs text-emerald-600 font-bold">Catalog →</span>
              </Link>
              <a
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <span>Pricing</span>
                <span className="text-xs text-slate-400 font-normal">Rates</span>
              </a>
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
                <span className="text-xs text-emerald-700 font-bold">Articles →</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl transition ${isContact ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>Contact Us</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">24/7 Studio</span>
                </span>
                <span className="text-xs text-emerald-600 font-bold">Inquiry →</span>
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
