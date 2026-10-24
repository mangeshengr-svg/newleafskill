'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  aboutStats,
  timelineMilestones,
  aboutOfferings,
  whyChoosePillars,
  globalPresence,
  aboutFaqs,
  craftsmanshipLayers,
  commercialMachines,
  qualityPledges,
} from '@/data/aboutData';

export default function AboutPage() {
  // Milestone state for 22-year timeline
  const [activeMilestone, setActiveMilestone] = useState<string>('2026');

  // Interactive 5 Layers of Craftsmanship
  const [activeLayerId, setActiveLayerId] = useState<string>('underlay');

  // Interactive Machine Compatibility Selector
  const [selectedMachineId, setSelectedMachineId] = useState<string>('tajima');

  // Interactive Downtime & Savings Calculator state
  const [monthlyGarments, setMonthlyGarments] = useState<number>(3000);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Offering category filter
  const [selectedOfferingCategory, setSelectedOfferingCategory] = useState<string>('all');

  // Contact / Quote form states
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formSubject, setFormSubject] = useState<string>('Embroidery Digitizing Inquiry');
  const [formService, setFormService] = useState<string>('Embroidery Digitizing Services');
  const [formTurnaround, setFormTurnaround] = useState<string>('Standard (6–8 Hours)');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormMessage('');
  };

  const currentMilestone = useMemo(() => {
    return (
      timelineMilestones.find((m) => m.year === activeMilestone) ||
      timelineMilestones[timelineMilestones.length - 1]
    );
  }, [activeMilestone]);

  const activeLayer = useMemo(() => {
    return (
      craftsmanshipLayers.find((l) => l.id === activeLayerId) ||
      craftsmanshipLayers[0]
    );
  }, [activeLayerId]);

  const selectedMachine = useMemo(() => {
    return (
      commercialMachines.find((m) => m.id === selectedMachineId) ||
      commercialMachines[0]
    );
  }, [selectedMachineId]);

  // Reactive ROI Calculations
  const calculatorStats = useMemo(() => {
    // Average embroidery run: 8,000 stitches per garment
    // Auto-software has ~1 thread break per 2,500 stitches on high speed -> 3.2 breaks per garment
    // With 10% auto-flaw occurrence -> approx 1 thread break every 3 garments = 0.33 breaks/garment
    // Each thread break takes operator 2.5 minutes to re-thread, back-track, and fix
    // Ruined garments from needle punctures/birdnests ~ 1.2% with auto-trace vs 0.05% with manual
    const threadBreaksSaved = Math.round(monthlyGarments * 0.45);
    const operatorHoursSaved = Math.round((threadBreaksSaved * 2.5) / 60);
    const ruinedGarmentsSaved = Math.round(monthlyGarments * 0.015);
    const estimatedCostSavings = Math.round(operatorHoursSaved * 24 + ruinedGarmentsSaved * 12);

    return {
      threadBreaksSaved,
      operatorHoursSaved,
      ruinedGarmentsSaved,
      estimatedCostSavings,
    };
  }, [monthlyGarments]);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-jakarta selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header (Navbar & Top Announcement Bar) */}
      <Header />

      {/* 2. DEDICATED ABOUT US HERO BANNER (Point 3) */}
      <section className="relative bg-gradient-to-b from-slate-950 via-[#06241a] to-slate-900 text-white border-b border-emerald-900/60 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-teal-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 stitch-grid opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 pt-8 pb-14 lg:pb-16 relative z-10 space-y-8">
          {/* Breadcrumb Navigation with explicit About Us marker */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-bold tracking-wide">About Us</span>
          </nav>

          {/* Banner Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 shadow-lg text-[11px] sm:text-xs font-black text-emerald-300 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span>About New Leaf Skills • Master Studio Overview</span>
              </div>

              <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                About Us — 22+ Years of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  Master Digitizing
                </span>{' '}
                &amp; Commercial Craftsmanship
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Founded in 2004, New Leaf Skills is a trusted global embroidery digitizing studio and commercial production partner. We transform complex artwork into machine-flawless stitch files engineered for zero thread breaks, high-speed multi-head runs at 1,000+ SPM, and calibrated fabric tension for 10,000+ apparel decorators across 15+ countries.
              </p>

              {/* Action Jump Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#story"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
                >
                  <span>📖 Our 22-Year Heritage</span>
                  <span>↓</span>
                </a>
                <a
                  href="#craftsmanship"
                  className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex items-center gap-2"
                >
                  <span>🪡 5-Layer Stitch Anatomy</span>
                </a>
                <a
                  href="#contact-form"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>💬 Request Free Quote</span>
                </a>
              </div>

              {/* Trust badges row */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Manual Wilcom Punching</span>
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Zero Thread Break Guarantee</span>
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>6–8 Hour Standard Turnaround</span>
                </span>
              </div>
            </div>

            {/* Right Media Column (5 cols) - Custom About Hero Banner Image */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glow underlay */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-teal-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden">
                  <img
                    src="/about/about-hero-banner.jpg"
                    alt="New Leaf Skills High Precision Commercial Embroidery Studio"
                    className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Glassmorphic Overlay Badge */}
                  <div className="absolute inset-x-3 bottom-3 bg-slate-950/90 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-500/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">
                            Active Studio Production
                          </div>
                          <div className="text-[11px] text-emerald-300">
                            Industrial 12-needle Tajima &amp; Barudan heads
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700/80">
                        24/7 Live
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar (Luxury Dark Emerald) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-800/80">
            {aboutStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-900/60 shadow-md hover:border-emerald-500/50 hover:bg-slate-800/90 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-700/50">
                    Verified
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STUDIO INTRO & REFINED TITLE (Point 1: Proper Font Family & Size) */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
            <span>✨ Artisanal Heritage &amp; Technical Precision</span>
          </div>

          {/* REFINED TITLE: font-outfit, text-2xl to text-4xl (not oversized 6xl!) */}
          <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.25]">
            Transforming Designs into Exceptional Embroidery for{' '}
            <span className="text-emerald-700 relative inline-block">
              Over 22 Years
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-emerald-200/60 -z-10 rounded-full"></span>
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
            At New Leaf Skills, embroidery digitizing is more than just vector conversion—it is an intricate craft refined through two decades of hands-on machine operation, needle physics, and fabric dynamics. We partner with contract decorators, apparel decorators, fashion labels, and embroidery factories worldwide to ensure every file runs cleanly without puckering, thread breaks, or machine downtime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              🧵 Wilcom ES e4.5 Native Punching
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              🪡 Tajima DG16 by Pulse Calibrated
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              ⚡ 1,000+ SPM High-Speed Rating
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
              🎯 99.8% First-Run Approval
            </span>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY SECTION (Point 2: New Attractive Photo & Clean Story) */}
      <section id="story" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span>📖 Studio Story &amp; Origins</span>
              </div>

              <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                From Local Embroidery Roots to a Global Master Digitizing Partner
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  New Leaf Skills was founded in 2004 with an unwavering commitment: to provide commercial embroidery digitizing rooted in genuine shop-floor machinery experience rather than theoretical software guesswork.
                </p>
                <p>
                  What started as an artisan embroidery workshop operating mechanical single-head machines has expanded over the past 22 years into a premier international digitizing studio serving contract apparel decorators across the <strong className="text-slate-800">United States, United Kingdom, Canada, Australia, Europe</strong>, and worldwide.
                </p>
                <p>
                  Our studio ethos is built on a simple standard: <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">deliver flawless manual stitch density, prevent fabric puckering, and eliminate thread breaks on every production run</span>.
                </p>
                <p>
                  We have digitized tens of thousands of designs across fashion retail, corporate apparel, high-relief 3D headwear, sacred ecclesiastical vestments, and athletic uniforms. As computerized multi-head machinery has advanced to 1,200+ SPM speeds, our master punchers have continually refined push-pull algorithms and underlay scaffolding to match modern production demands.
                </p>
              </div>

              {/* Core Studio Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Manual Push-Pull Calibration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Fabric-specific stitch tension for pique, fleece, twill, and caps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">24/7 Global Production Shifts</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Overnight files returned ready for your morning production run.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Universal Format Compatibility</h3>
                    <p className="text-xs text-slate-500 mt-0.5">DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Zero Auto-Trace Flaws</h3>
                    <p className="text-xs text-slate-500 mt-0.5">100% human-plotted underlays and clean concealed tie-offs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW ATTRACTIVE MEDIA CARD (Point 2: roots-story.jpg) */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Ambient glow accent */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/25 to-teal-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />

                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                  <img
                    src="/about/roots-story.jpg"
                    alt="Master Digitizer Inspecting High Density Embroidered Crest at New Leaf Skills Studio"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 text-[11px] font-black text-emerald-300 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Master Punching Floor • 22+ Yrs Experience</span>
                  </div>

                  {/* Bottom Floating Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/90 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                          🪡
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Micro-Loupe Stitch Inspection
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Live sewout verification on multi-head Tajima &amp; Barudan
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                        99.8% Pass
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UNIQUENESS FEATURE 1: INTERACTIVE 5-LAYER MASTER DIGITIZING ANATOMY (Point 4) */}
      <section id="craftsmanship" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-slate-900 text-white border-b border-emerald-950 overflow-hidden relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-extrabold uppercase tracking-widest border border-emerald-800/80">
              <span>🔬 Interactive Stitch Anatomy</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 5 Layers of Master Embroidery Digitizing
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Why do cheap $5 auto-trace files ruin garments, while our files run smoothly at 1,000+ SPM? Click through the 5 engineering layers below to see our manual punch blueprint.
            </p>
          </div>

          {/* Interactive Layer Tab Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {craftsmanshipLayers.map((layer) => {
              const isSelected = activeLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-wider opacity-80 font-mono">
                    {layer.layerNumber}
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm mt-1 truncate">
                    {layer.name}
                  </div>
                  <div className="text-[10px] opacity-75 mt-0.5 truncate">{layer.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Deep Dive Card */}
          <div className="bg-slate-950/80 rounded-3xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{activeLayer.icon}</span>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      {activeLayer.layerNumber} • Technical Blueprint
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-emerald-300">
                  ⚡ {activeLayer.tagline}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeLayer.description}
                </p>

                {/* Technical Specification Callout */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center gap-3">
                  <span className="text-emerald-400 font-bold text-lg">⚙️</span>
                  <div className="text-xs font-mono text-emerald-200">
                    <strong className="text-white">Studio Spec:</strong> {activeLayer.technicalSpec}
                  </div>
                </div>
              </div>

              {/* Right Side: The Contrast Box (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* What Auto-Trace Does Wrong */}
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
                    <span>❌ The Cheap Auto-Trace Flaw</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {activeLayer.autoTraceProblem}
                  </p>
                </div>

                {/* How New Leaf Skills Solves It */}
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                    <span>✨ New Leaf Skills Manual Punching</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeLayer.ourManualSolution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIQUENESS FEATURE 2: COMMERCIAL MACHINE COMPATIBILITY EXPLORER (Point 4) */}
      <section id="machine-specs" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>🖨️ Machine Compatibility</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calibrated for Your Exact Multi-Head Embroidery Brand
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select your commercial embroidery machine below to view native file format specs, tension calibrations, and needle recommendations.
            </p>
          </div>

          {/* Machine Brand Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {commercialMachines.map((m) => {
              const isSelected = selectedMachineId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMachineId(m.id)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer shadow-xs ${isSelected
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25 ring-2 ring-emerald-600 ring-offset-2'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200'
                    }`}
                >
                  <span>{m.brand}</span>
                </button>
              );
            })}
          </div>

          {/* Machine Spec Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Equipment Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {selectedMachine.brand}
                </h3>
                <p className="text-xs text-slate-500">{selectedMachine.tagline}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">Primary Format:</span>
                <span className="text-base font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                  {selectedMachine.nativeFormat}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tested Max Speed
                </div>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {selectedMachine.maxSPM}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">Zero needle deflection</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Trimming System
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                  {selectedMachine.trimSystem}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tension Calibration
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                  {selectedMachine.tensionPreset}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Recommended Needle
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                  {selectedMachine.needleRecommendation}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-800">Supported Formats:</strong>{' '}
                {selectedMachine.allFormats.join(', ')} (plus Color PDF Worksheet)
              </div>
              <a
                href="#contact-form"
                onClick={() => {
                  setFormSubject(`Digitizing file for ${selectedMachine.brand}`);
                  setFormMessage(`Looking for production-ready embroidery files optimized for our ${selectedMachine.brand} machine (${selectedMachine.nativeFormat})...`);
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
              >
                <span>Request Sample File for {selectedMachine.brand}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. UNIQUENESS FEATURE 3: REACTIVE DOWNTIME & ROI CALCULATOR (Point 4) */}
      <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>💰 Shop Floor ROI Calculator</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculate Your Monthly Downtime &amp; Fabric Loss Savings
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Cheap digitizing looks inexpensive upfront, but causes machine stops and ruined garments. Slide your monthly volume below to see your real production savings with our files:
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-[#072c1f] to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto border border-emerald-500/30">
            <div className="space-y-8">
              {/* Slider Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-300">
                    Garments / Caps Stitched Per Month
                  </label>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {monthlyGarments.toLocaleString()} units
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={monthlyGarments}
                  onChange={(e) => setMonthlyGarments(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>500 (Boutique Shop)</span>
                  <span>5,000 (Mid-Size Factory)</span>
                  <span>20,000+ (High Volume)</span>
                </div>
              </div>

              {/* Reactive Metrics Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/80">
                <div className="bg-slate-800/80 rounded-2xl p-4 border border-emerald-500/20 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ~{calculatorStats.threadBreaksSaved}
                  </div>
                  <div className="text-xs font-extrabold text-slate-200 mt-1">
                    Thread Breaks Avoided
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Smooth 1,000 SPM runs</p>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 border border-emerald-500/20 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ~{calculatorStats.operatorHoursSaved} hrs
                  </div>
                  <div className="text-xs font-extrabold text-slate-200 mt-1">
                    Operator Time Saved
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Zero re-threading stalls</p>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 border border-emerald-500/20 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ~{calculatorStats.ruinedGarmentsSaved}
                  </div>
                  <div className="text-xs font-extrabold text-slate-200 mt-1">
                    Garments Saved
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">No birdnests or holes</p>
                </div>

                <div className="bg-emerald-950/90 rounded-2xl p-4 border border-emerald-400/50 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                    ${calculatorStats.estimatedCostSavings.toLocaleString()}
                  </div>
                  <div className="text-xs font-extrabold text-white mt-1">
                    Est. Monthly Savings
                  </div>
                  <p className="text-[10px] text-emerald-300 mt-0.5">True Shop Floor Profit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE 22-YEAR HERITAGE TIMELINE (2004 - 2026) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>⏳ 22-Year Evolution</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Journey Through Two Decades of Embroidery Innovation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Click through each era below to see how our studio evolved from mechanical floppy-disk punch cards into a global 24/7 digital powerhouse.
            </p>
          </div>

          {/* Interactive Year Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {timelineMilestones.map((m) => {
              const isSelected = activeMilestone === m.year;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setActiveMilestone(m.year)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-xs ${isSelected
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600 ring-offset-2'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200'
                    }`}
                >
                  <span className="font-mono text-base">{m.year}</span>
                  <span className="hidden sm:inline text-xs font-normal opacity-90">
                    {m.year === '2026' ? '• Modern Era' : '• Milestone'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/40 rounded-bl-full pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
                    {currentMilestone.year}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {currentMilestone.title}
                    </h3>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {currentMilestone.tagline}
                    </div>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
                  <span>⭐</span>
                  <span>{currentMilestone.highlight}</span>
                </span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                {currentMilestone.description}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Multi-head production verified</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Zero thread breakage standard</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Worldwide shop partner trust</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STUDIO CAPABILITIES GRID */}
      <section id="offerings" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>🪡 Studio Capabilities</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Machine-Ready Embroidery Files Engineered for Flawless Production
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every design is meticulously plotted according to garment fabric weight, stretch grain, curvature, and embroidery machine specifications:
            </p>
          </div>

          {/* 9 Core Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutOfferings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.badge}</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.shortDesc}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Best For:
                      </div>
                      <div className="text-xs text-slate-700 font-semibold bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                        {item.suitableFor}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-2 py-0.5 rounded-md font-semibold"
                        >
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services#${item.id}`}
                    className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1 group/link"
                  >
                    <span>View Specifications</span>
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </Link>

                  <a
                    href="#contact-form"
                    onClick={() => {
                      setFormService(item.title);
                      setFormSubject(`Quote Request: ${item.title}`);
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-emerald-700 transition"
                  >
                    Request Sample
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all"
            >
              <span>⚡ View Complete Services &amp; Technical Capabilities</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US PILLARS */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>⭐ Why Choose Us</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why 10,000+ Apparel Decorators Partner With New Leaf Skills
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Our clients continue to work with us decade after decade because we focus on what matters most to contract embroiderers: stitch perfection, machine speed, zero downtime, and dependable communication.
            </p>
          </div>

          {/* 6 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{pillar.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">
                      {pillar.subtitle}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <span>✓</span>
                  <span>Guaranteed Studio Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quality Pledge Seals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {qualityPledges.map((pledge) => (
              <div
                key={pledge.id}
                className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{pledge.icon}</span>
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded">
                    {pledge.metric}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{pledge.title}</h4>
                <p className="text-xs text-slate-600 leading-snug">{pledge.guarantee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. GLOBAL REACH & FORMAT COMPATIBILITY */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>🌍 Global Footprint</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Serving Commercial Apparel Decorators Across 5 Continents
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              While our heritage roots are in India, over 70% of our daily production volume supports commercial embroidery operations across North America, the UK, Europe, and Australia.
            </p>
          </div>

          {/* Regional Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalPresence.map((region, rIdx) => (
              <div
                key={rIdx}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{region.flag}</span>
                    <h3 className="font-extrabold text-slate-900 text-sm">{region.country}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {region.percentage}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <strong className="text-slate-700">Hubs:</strong> {region.cities}
                </div>
                <p className="text-xs text-emerald-800 font-semibold bg-white p-2 rounded-lg border border-slate-200/70">
                  ⚡ {region.highlight}
                </p>
              </div>
            ))}
          </div>

          {/* Supported Machine File Formats */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 text-center space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Universal Machine Format Export • Ready to Load via USB or Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Our digitizers generate native machine files verified for your specific equipment. Every download includes a clear color sewout PDF worksheet with exact dimensions, stitch counts, and needle sequence stops.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {[
                { format: '.DST', brand: 'Tajima Commercial' },
                { format: '.PES', brand: 'Brother / Baby Lock' },
                { format: '.EXP', brand: 'Melco / Bernina' },
                { format: '.JEF', brand: 'Janome / Elna' },
                { format: '.VP3', brand: 'Pfaff / Husqvarna' },
                { format: '.HUS', brand: 'Husqvarna Viking' },
                { format: '.EMB', brand: 'Wilcom Native Source' },
                { format: '.CND', brand: 'Barudan Commercial' },
              ].map((fmt, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white px-3.5 py-2 rounded-xl border border-emerald-200 text-xs shadow-2xs font-mono font-bold text-slate-800"
                >
                  <span className="text-emerald-700">{fmt.format}</span>
                  <span className="text-[10px] text-slate-400 font-sans block font-normal">{fmt.brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. DIRECT STUDIO CONTACT & QUOTE FORM */}
      <section id="contact-form" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Information & Guarantee (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                <span>💬 Direct Studio Desk</span>
              </div>

              <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Connect Directly with Our Master Digitizing Team
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you have an intricate custom logo, a 3D puff cap project, a bulk contract embroidery run, or want to test our manual punch quality with a sample, our team is ready 24/7.
              </p>

              {/* Direct channels */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+12135754946"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Studio Phone &amp; Support
                    </div>
                    <div className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      +91 99237 90520
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@newleafskills.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Email Inquiries &amp; Artwork
                    </div>
                    <div className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      info@newleafskills.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
                    ⚡
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Studio Operating Hours
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      24/7 Global Production &amp; Live Dispatch
                    </div>
                  </div>
                </div>
              </div>

              {/* Assurance Banner */}
              <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-300/80 text-emerald-900 text-xs font-medium space-y-1">
                <div className="font-extrabold flex items-center gap-1.5">
                  <span>🛡️ 100% Free Revisions Guarantee</span>
                </div>
                <p className="leading-snug">
                  We don't close your order until your machine runs it smoothly without thread breaks or puckering.
                </p>
              </div>
            </div>

            {/* Interactive Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl relative">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Thank You, {formName || 'Valued Client'}!
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Your inquiry regarding <strong className="text-emerald-800">{formService}</strong> has been received by our senior digitizing team. We will review your requirements and respond back to <span className="font-bold text-slate-800">{formEmail}</span> within <strong className="text-emerald-700">{formTurnaround.includes('Rush') ? '2 Hours' : '6–8 Hours'}</strong>.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-xl font-black text-slate-900">
                        Request a Free Quote or Digitizing Consultation
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Fill in your project details below and get a quote within 30 minutes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. John Miller"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="john@apparelshop.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Select Service
                        </label>
                        <select
                          value={formService}
                          onChange={(e) => setFormService(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition bg-white"
                        >
                          <option>Embroidery Digitizing Services</option>
                          <option>Custom Logo Digitizing</option>
                          <option>Computerized Commercial Embroidery</option>
                          <option>3D Puff Digitizing</option>
                          <option>Cap &amp; Headwear Digitizing</option>
                          <option>Custom Patches &amp; Emblems</option>
                          <option>Applique Digitizing</option>
                          <option>Vestments Liturgical Embroidery</option>
                          <option>Irish Dance Dress Embroidery</option>
                          <option>Vector Art Conversion</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Turnaround Requirement
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs transition ${formTurnaround === 'Standard (6–8 Hours)'
                            ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                            }`}
                        >
                          <input
                            type="radio"
                            name="turnaround"
                            value="Standard (6–8 Hours)"
                            checked={formTurnaround === 'Standard (6–8 Hours)'}
                            onChange={(e) => setFormTurnaround(e.target.value)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>⚡ Standard (6–8 Hours)</span>
                        </label>

                        <label
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs transition ${formTurnaround === 'Rush 2 Hours'
                            ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                            }`}
                        >
                          <input
                            type="radio"
                            name="turnaround"
                            value="Rush 2 Hours"
                            checked={formTurnaround === 'Rush 2 Hours'}
                            onChange={(e) => setFormTurnaround(e.target.value)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>🔥 Rush (2 Hours)</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="e.g. Left chest polo logo for 500 units"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Project Description / Garment Fabric &amp; Size <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Please mention target dimensions (e.g., 3.5 inches wide), fabric type (e.g. 100% cotton pique, structured cap), machine format (DST, PES), and any special requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm text-slate-800 transition"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {formLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Transmitting Inquiry to Studio...</span>
                          </>
                        ) : (
                          <>
                            <span>🚀 Submit Inquiry to Master Digitizers</span>
                            <span>→</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center">
                      🔒 Your artwork and contact details are kept strictly confidential. 100% free revisions guaranteed.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <span>❓ Common Questions</span>
            </span>
            <h2 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Our Studio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Clear answers regarding our digitizing process, file deliverables, machinery, and turnaround times.
            </p>
          </div>

          <div className="space-y-3">
            {aboutFaqs.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-black transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-emerald-600 text-white' : ''
                        }`}
                    >
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. BOTTOM CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-20 bg-gradient-to-r from-emerald-800 to-teal-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200 border border-white/20">
            <span>✨ Ready to Upgrade Your Embroidery Quality?</span>
          </span>

          <h2 className="font-outfit text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop Ruining Garments with Cheap Auto-Digitizing
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Partner with master digitizers who understand machine physics, thread tensions, and tight factory deadlines. Receive your first production-ready file in 6–8 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#contact-form"
              className="px-8 py-3.5 rounded-2xl bg-white text-emerald-950 font-black text-sm shadow-xl hover:bg-emerald-50 transition-all cursor-pointer"
            >
              Request Free Quote Now →
            </a>
            <Link
              href="/our-work"
              className="px-8 py-3.5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-bold text-sm border border-emerald-600/50 transition-all cursor-pointer"
            >
              Browse 50+ Sewout Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 15. Luxury Light Footer */}
      <Footer />
    </main>
  );
}
