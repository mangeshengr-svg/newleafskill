'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

// Modern SVG Icons for clean professional look
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  SearchCheck: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  Photo: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  Palette: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.1 6.34a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  DocumentText: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  QuestionMarkCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={`w-4 h-4 transition-transform duration-200 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  Key: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

// Sidebar Nav Content shared between desktop and mobile drawer
function SidebarNavItems({ pathname, handleLogout, onLinkClick }) {
  const isHomeActive = pathname.startsWith('/admin/home') || pathname.startsWith('/admin/why-choose-us');
  const [isHomeOpen, setIsHomeOpen] = useState(true);

  // Home components links
  const homeSubLinks = [
    { name: 'Hero Content', href: '/admin/home/hero', Icon: Icons.Sparkles },
    { name: 'Hero Slider', href: '/admin/home/slider', Icon: Icons.Photo },
    { name: 'Why Choose Us', href: '/admin/why-choose-us', Icon: Icons.Star },
    { name: 'Stitch Categories', href: '/admin/home/stitch-categories', Icon: Icons.Layers },
    { name: 'Embroidery Inspector', href: '/admin/home/embroidery', Icon: Icons.SearchCheck },
  ];

  // Standalone pages links
  const pageLinks = [
    { name: 'About Us', href: '/admin/about', Icon: Icons.Building },
    { name: 'Services', href: '/admin/services', Icon: Icons.Briefcase },
    { name: 'Our Work', href: '/admin/our-work', Icon: Icons.Palette },
    { name: 'Blog', href: '/admin/blog', Icon: Icons.DocumentText },
    { name: 'FAQs', href: '/admin/faqs', Icon: Icons.QuestionMarkCircle },
    { name: 'Contact Page', href: '/admin/contact', Icon: Icons.Phone },
  ];

  const systemLinks = [
    { name: 'Users Management', href: '/admin/users', Icon: Icons.Users },
    { name: 'Security Settings', href: '/admin/settings', Icon: Icons.Key },
  ];

  const isLinkActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Top Header / Branding */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" onClick={onLinkClick} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 group-hover:scale-105 transition-all">
              <span className="text-lg">N</span>
            </div>
            <div>
              <h2 className="font-bold tracking-tight text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                Newleafskills
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Admin Studio
                </span>
              </div>
            </div>
          </Link>
          {onLinkClick && (
            <button
              onClick={onLinkClick}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Icons.Close />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <nav className="p-4 space-y-6">
          {/* Main Dashboard */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </div>
            <Link
              href="/admin"
              onClick={onLinkClick}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${isLinkActive('/admin')
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={isLinkActive('/admin') ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'}>
                  <Icons.Dashboard />
                </span>
                <span>Dashboard</span>
              </div>
              <Icons.ChevronRight />
            </Link>
          </div>

          {/* HOME PAGE COMPONENTS ACCORDION */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Landing Page
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-1.5 transition-colors">
              <button
                type="button"
                onClick={() => setIsHomeOpen(!isHomeOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs tracking-wide transition-colors ${isHomeActive
                    ? 'text-blue-700 bg-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:bg-white/80 hover:text-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isHomeActive ? 'text-blue-600' : 'text-slate-400'}>
                    <Icons.Home />
                  </span>
                  <span>Home Sections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/70 text-slate-600 font-semibold">
                    {homeSubLinks.length}
                  </span>
                  <Icons.ChevronDown className={isHomeOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'} />
                </div>
              </button>

              {isHomeOpen && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 space-y-0.5 pl-1.5">
                  {homeSubLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    const SubIcon = link.Icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onLinkClick}
                        className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${active
                            ? 'bg-blue-600 text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:bg-white hover:text-slate-900'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'}>
                            <SubIcon />
                          </span>
                          <span>{link.name}</span>
                        </div>
                        <Icons.ChevronRight />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* PAGE CONTENT MANAGEMENT */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Content Pages
            </div>
            <div className="space-y-1">
              {pageLinks.map((link) => {
                const active = isLinkActive(link.href);
                const PageIcon = link.Icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onLinkClick}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'}>
                        <PageIcon />
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <Icons.ChevronRight />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SYSTEM MANAGEMENT */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Administration
            </div>
            <div className="space-y-1">
              {systemLinks.map((link) => {
                const active = isLinkActive(link.href);
                const SysIcon = link.Icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onLinkClick}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'}>
                        <SysIcon />
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <Icons.ChevronRight />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Footer / Quick Links & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/60">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-200 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Icons.ExternalLink />
            <span>Visit Live Website</span>
          </div>
          <span className="text-[10px] bg-slate-200/70 text-slate-600 px-1.5 py-0.5 rounded font-medium">New tab</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-medium text-xs transition-colors cursor-pointer group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            <Icons.Logout />
          </span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function AdminHeaderContent({ pathname, onMenuClick }) {
  const getBreadcrumbTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    const segment = pathname.split('/').filter(Boolean).pop() || '';
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onMenuClick}
          type="button"
          aria-label="Open mobile menu"
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Icons.Menu />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Link href="/admin" className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
            Workspace
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-700 truncate max-w-[160px] sm:max-w-none">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>View Site</span>
          <Icons.ExternalLink />
        </Link>
        <div className="flex items-center gap-2.5 pl-3 sm:border-l sm:border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            A
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800 leading-tight">Admin User</span>
            <span className="text-[10px] text-slate-400">Super Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function AdminLayoutInner({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile drawer on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const isAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/register' ||
    pathname === '/admin/reset-password';

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout failed', error);
      window.location.href = '/admin/login';
    }
  };

  // Agar user auth page (login, register, reset-password) par hai toh sidebar aur header mat dikhao
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100/70 text-slate-900 font-sans w-full">
      {/* Desktop Sticky Sidebar */}
      <aside className="w-72 border-r border-slate-200/80 bg-white hidden md:flex flex-col sticky top-0 h-screen shadow-xs overflow-y-auto z-30">
        <SidebarNavItems pathname={pathname} handleLogout={handleLogout} />
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs flex transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarNavItems
              pathname={pathname}
              handleLogout={handleLogout}
              onLinkClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeaderContent
          pathname={pathname}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        <footer className="py-4 sm:py-5 px-6 md:px-8 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {currentYear} Newleafskills. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span>Dynamic Admin Studio</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-emerald-600">Active</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-500">Loading admin panel...</div>}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
