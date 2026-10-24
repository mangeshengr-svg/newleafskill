'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkLightboxModal from '@/components/WorkLightboxModal';
import { WorkProject } from '@/types/work';
import { workCategories, workProjects } from '@/data/workProjects';

export default function OurWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMachineFilter, setSelectedMachineFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'stitches-desc' | 'stitches-asc' | 'title'>('featured');
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  // Uniqueness feature: Interactive Vector vs. Sewout Transformation showcase
  const [compareSample, setCompareSample] = useState<'sample1' | 'sample2'>('sample1');
  const [compareView, setCompareView] = useState<'sewout' | 'vector' | 'split'>('split');

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = workProjects.filter((project) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      if (!matchesCategory) return false;

      // Machine filter
      if (selectedMachineFilter !== 'All') {
        if (!project.machine.toLowerCase().includes(selectedMachineFilter.toLowerCase())) {
          return false;
        }
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.fabric.toLowerCase().includes(q) ||
        project.machine.toLowerCase().includes(q) ||
        project.tag.toLowerCase().includes(q) ||
        project.punchingNotes.toLowerCase().includes(q) ||
        project.stitches.toLowerCase().includes(q)
      );
    });

    // Sorting
    if (sortBy === 'stitches-desc') {
      result = [...result].sort((a, b) => {
        const aStitches = parseInt(a.stitches.replace(/\D/g, ''), 10) || 0;
        const bStitches = parseInt(b.stitches.replace(/\D/g, ''), 10) || 0;
        return bStitches - aStitches;
      });
    } else if (sortBy === 'stitches-asc') {
      result = [...result].sort((a, b) => {
        const aStitches = parseInt(a.stitches.replace(/\D/g, ''), 10) || 0;
        const bStitches = parseInt(b.stitches.replace(/\D/g, ''), 10) || 0;
        return aStitches - bStitches;
      });
    } else if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, selectedMachineFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedMachineFilter('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. Header (Navbar & Top Announcement) */}
      <Header />

      {/* 2. Cityo-Style Breadcrumb & Title Hero Banner with Background Image */}
      <section className="relative w-full min-h-[190px] sm:min-h-[230px] lg:min-h-[260px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        {/* Background Image Container with Light Translucent Overlay for high photo visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/work/work-hero-banner.jpg"
            alt="NewLeaf Skills Commercial Embroidery Production Sewout Archive"
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
            
            {/* Left: Prominent Page Identifier "Our Work" with high contrast against the visible photo */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest font-jakarta backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Commercial Production Sewout Archive</span>
              </div>
              
              <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-md">
                  Our Work
                </span>
                <span className="text-emerald-400 text-2xl sm:text-4xl font-light drop-shadow">/</span>
                <span className="text-white sm:text-emerald-300 text-xl sm:text-3xl font-bold font-jakarta drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Sewout Portfolio
                </span>
              </h1>

              <p className="text-slate-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Explore authentic machine sewouts hand-punched by our 22+ year veteran digitizers. Calibrated for high-speed runs at 1,000 SPM with zero thread breaks.
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
                  <span>Our Work</span>
                </span>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom subtle glowing border */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent z-10" />
      </section>

      {/* 2b. Portfolio Actions & Trust Metrics Bar */}
      <section className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Quick Metrics Bar (Clean Light Theme) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">50,000+</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Files Digitized</div>
              <p className="text-[11px] text-slate-500 mt-1">Left chest, jacket backs, caps &amp; vestments</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">6–8 Hours</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Standard Turnaround</div>
              <p className="text-[11px] text-slate-500 mt-1">Super rush 2-hour service available</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">1,000 SPM</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Speed Validated</div>
              <p className="text-[11px] text-slate-500 mt-1">Tajima, Barudan, Brother, Melco &amp; SWF</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">100% Free</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Unlimited Revisions</div>
              <p className="text-[11px] text-slate-500 mt-1">Guaranteed till your machine runs clean</p>
            </div>
          </div>

          {/* Action Jump Buttons & Trust Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#gallery"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🧵 Browse 22+ Sewouts</span>
                <span>↓</span>
              </a>
              <a
                href="#transformation"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold text-xs sm:text-sm border border-slate-300 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>⚡ Vector vs Sewout</span>
              </a>
              <a
                href="/#quote"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>💬 Request Free Quote</span>
              </a>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Wilcom Manual Punching</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Zero Thread Break Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Unique Feature: Interactive Vector-to-Physical Sewout Transformation Inspector */}
      <section id="transformation" className="px-4 sm:px-8 lg:px-20 py-12 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                <span>⚡ Interactive Digitizing Anatomy</span>
              </div>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Artwork Vector vs. Physical Machine Sewout
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1">
                See how flat 2D graphic art transforms into structured, tactile 3D thread embroidery with calculated pull compensation, underlays, and directional light sheen.
              </p>
            </div>

            {/* Comparison Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setCompareSample('sample1')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    compareSample === 'sample1'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Eagle Crest Emblem
                </button>
                <button
                  onClick={() => setCompareSample('sample2')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    compareSample === 'sample2'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mascot Cap Logo
                </button>
              </div>

              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setCompareView('split')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    compareView === 'split' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setCompareView('vector')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    compareView === 'vector' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vector Only
                </button>
                <button
                  onClick={() => setCompareView('sewout')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    compareView === 'sewout' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sewout Only
                </button>
              </div>
            </div>
          </div>

          {/* Transformation Display Box */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Left View: Vector Artwork */}
              {(compareView === 'split' || compareView === 'vector') && (
                <div className={`space-y-3 ${compareView === 'vector' ? 'md:col-span-2 max-w-xl mx-auto' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      1. Client Vector Input (Flat 2D Artwork)
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      AI / CDR / PDF
                    </span>
                  </div>
                  <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white group">
                    <img
                      src={compareSample === 'sample1' ? '/sample1-before.jpg' : '/sample2-before.jpg'}
                      alt="Vector Artwork Input"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-medium">
                      Raw Vector Artwork
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Flat lines without stitch angle consideration or fabric elasticity physics. If run directly through auto-digitizers, this produces loose puckering and birdnest thread jams.
                  </p>
                </div>
              )}

              {/* Right View: Real Stitched Sewout */}
              {(compareView === 'split' || compareView === 'sewout') && (
                <div className={`space-y-3 ${compareView === 'sewout' ? 'md:col-span-2 max-w-xl mx-auto' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      2. New Leaf Skills Hand-Punched Sewout
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded border border-emerald-300">
                      Tajima DST / 1,000 SPM
                    </span>
                  </div>
                  <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md bg-white group">
                    <img
                      src={compareSample === 'sample1' ? '/sample1-after.jpg' : '/sample2-after.jpg'}
                      alt="Physical Machine Sewout"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-emerald-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center gap-1.5 shadow">
                      <span>✓ 100% Genuine Machine Sewout</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-emerald-800 font-extrabold shadow-sm border border-emerald-200">
                      Zero Puckering
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hand-punched in Wilcom with <strong>0.38mm push-pull compensation</strong>, multi-directional tatami underlays, and balanced thread tension for razor-sharp borders on high-speed machines.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 4. Filter Toolbar & Search Bar (Sticky Light Bar) */}
      <section id="gallery" className="sticky top-[102px] z-30 bg-white/95 backdrop-blur-xl border-y border-slate-200/90 shadow-xs px-4 sm:px-8 lg:px-20 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {workCategories.map((cat) => {
              const count = cat === 'All' ? workProjects.length : workProjects.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102 ring-2 ring-emerald-400'
                      : 'bg-white text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 border border-slate-200/90'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white font-black' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Machine Filter & Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Machine Filter Selector */}
            <div className="relative">
              <select
                value={selectedMachineFilter}
                onChange={(e) => setSelectedMachineFilter(e.target.value)}
                className="bg-white text-slate-700 text-xs rounded-xl px-3 py-2 border border-slate-200 shadow-2xs focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                aria-label="Filter by machine"
              >
                <option value="All">All Machines</option>
                <option value="Tajima">Tajima Tested</option>
                <option value="Barudan">Barudan Tested</option>
                <option value="Brother">Brother Tested</option>
                <option value="Melco">Melco Tested</option>
                <option value="SWF">SWF Tested</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sewouts, fabrics..."
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-8 pr-7 py-2 border border-slate-200 shadow-2xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
              />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-700 text-xs p-0.5"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white text-slate-700 text-xs rounded-xl px-3 py-2 border border-slate-200 shadow-2xs focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                aria-label="Sort sewouts"
              >
                <option value="featured">Featured First</option>
                <option value="stitches-desc">Stitches: High to Low</option>
                <option value="stitches-asc">Stitches: Low to High</option>
                <option value="title">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Portfolio Grid Section (Well Designed Boxes / Cards) */}
      <section className="px-4 sm:px-8 lg:px-20 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-7">

          {/* Results Count & Filter Reset */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 border-b border-slate-200 pb-3">
            <div>
              Showing <span className="font-extrabold text-emerald-800">{filteredProjects.length}</span> verified sewouts
              {selectedCategory !== 'All' && <span> in <strong className="text-slate-900">{selectedCategory}</strong></span>}
              {selectedMachineFilter !== 'All' && <span> for <strong className="text-emerald-700">{selectedMachineFilter}</strong></span>}
              {searchQuery && <span> matching &ldquo;<strong className="text-emerald-700">{searchQuery}</strong>&rdquo;</span>}
            </div>
            {(selectedCategory !== 'All' || selectedMachineFilter !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-extrabold underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* If No Matches Found */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
              <div className="text-5xl">🧵</div>
              <h3 className="text-xl font-bold text-slate-900 font-outfit">No sewouts matched your search</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                We couldn&apos;t find any embroidery projects matching &ldquo;{searchQuery}&rdquo;. Try another term or reset filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
              >
                Show All Projects
              </button>
            </div>
          )}

          {/* Well-Designed Light Luxury Project Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-emerald-500/70 shadow-xs hover:shadow-xl hover:shadow-emerald-950/8 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative aspect-square overflow-hidden bg-slate-100 border-b border-slate-200/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2 z-10">
                    <span className="bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-200/80 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs truncate max-w-[70%]">
                      {project.tag}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
                    <span className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>🔍</span> Inspect Sewout &amp; Telemetry
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 mb-1 font-jakarta">
                      {project.category}
                    </div>
                    <h2 className="font-outfit font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Telemetry 2x2 Grid */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-200/70 flex items-center gap-1.5">
                        <span className="text-emerald-700 text-xs">🧵</span>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Stitches</div>
                          <div className="text-slate-900 font-mono font-bold truncate">{project.stitches}</div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-200/70 flex items-center gap-1.5">
                        <span className="text-teal-700 text-xs">👕</span>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Fabric</div>
                          <div className="text-slate-800 font-bold truncate text-[10px]">{project.fabric}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-500 text-[10px] flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {project.machine.split(' ')[0]} Tested
                      </span>
                      <span className="text-emerald-700 font-bold text-xs group-hover:underline flex items-center gap-1">
                        <span>Inspect Specs</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Production Quality Benchmark Cards (Clean Light Theme) */}
      <section className="px-4 sm:px-8 lg:px-20 py-14 bg-white border-t border-slate-200/90 relative">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              ⚡ Commercial Precision Guarantee
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Our Sewouts Run Flawlessly
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We punch files for high-speed multi-head mass production, cutting operator downtime and eliminating expensive thread breaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-lg shadow-2xs">
                🎯
              </div>
              <h3 className="font-outfit font-extrabold text-slate-900 text-base">Fabric-Specific Pull Logic</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Calibrated underlays for pique polo, fleece, stretch spandex, leather, caps, and woven silks to prevent fabric puckering.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-lg shadow-2xs">
                ⚡
              </div>
              <h3 className="font-outfit font-extrabold text-slate-900 text-base">Zero Thread Breaks</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Gentle angle transitions, stitch density caps (0.38mm–0.42mm), and loop trims engineered for 1,000 SPM continuous runs.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-lg shadow-2xs">
                🔤
              </div>
              <h3 className="font-outfit font-extrabold text-slate-900 text-base">Crisp 3.8mm Micro-Lettering</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Hand-kerned single-needle paths ensuring razor-sharp small corporate text, name patches, and URL stitching.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-lg shadow-2xs">
                📦
              </div>
              <h3 className="font-outfit font-extrabold text-slate-900 text-base">All Machine Formats Included</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every order comes with Tajima DST, Brother PES, Melco EXP, Barudan DSB, JEF, and a full PDF color stop worksheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Machine File Formats Compatibility Bar */}
      <section className="bg-slate-100/70 py-10 px-4 sm:px-8 lg:px-20 border-t border-slate-200/90 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold font-jakarta">
            Supported Commercial Machine Formats &amp; Software
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-mono">
            {['DST (Tajima)', 'PES (Brother)', 'EXP (Melco)', 'JEF (Janome)', 'DSB (Barudan)', 'VP3 (Husqvarna)', 'EMB (Wilcom)', 'PDF Sewout Sheet'].map((format) => (
              <span
                key={format}
                className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/90 text-emerald-800 font-bold shadow-2xs"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom High-Converting Sewout CTA Section */}
      <section className="px-4 sm:px-8 lg:px-20 py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-6">
          {/* Subtle Ambient Light in CTA */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider bg-emerald-950/90 px-4 py-1.5 rounded-full border border-emerald-500/40">
              <span>⚡</span> 6–8 Hour Delivery | Free Sewout Proof
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Need Your Artwork Digitized Like These Examples?
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Upload your logo, drawing, or vector art. Our master digitizers will analyze your fabric type and provide a high-precision machine file with zero puckering guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="/#quote"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Free Sewout Quote Now</span>
                <span>⚡</span>
              </a>
              <a
                href="tel:+919923790520"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-emerald-300 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📞 +91 99237 90520</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> No Credit Card Required for Quote
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> 100% Free Unlimited Revisions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span> 24/7 Punching Studio
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Lightbox Modal */}
      {selectedProject && (
        <WorkLightboxModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOrderStyle={() => {
            setSelectedProject(null);
            window.location.href = '/#quote';
          }}
        />
      )}

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
