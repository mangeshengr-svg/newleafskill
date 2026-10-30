'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WorkProject } from '@/types/work';
import { workCategories, workProjects as fallbackProjects } from '@/data/workProjects';

interface OurWorkSectionProps {
  onSelectProject: (project: WorkProject) => void;
  projects?: WorkProject[];
}

export default function OurWorkSection({ onSelectProject, projects: initialProjects }: OurWorkSectionProps) {
  const [workFilter, setWorkFilter] = useState<string>('All');
  const workProjects = initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects;

  const categoriesInProjects = Array.from(new Set(workProjects.map((p) => p.category))).filter(Boolean);
  const categories = ['All', ...Array.from(new Set([...workCategories.filter((c) => c !== 'All'), ...categoriesInProjects]))];

  return (
    <section id="our-work" className="px-4 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-950 via-[#031d14] to-slate-950 border-y border-emerald-800/60 text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-teal-500/10 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute inset-0 stitch-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="text-emerald-300 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-950/90 px-4 py-1.5 rounded-full border border-emerald-500/50 shadow-lg inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Authentic Production Sewouts</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Work &amp; Embroidery Portfolio
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-base leading-relaxed">
            Real machine sewouts digitized by our master punching veterans. Over 50,000+ files digitized for commercial apparel decorators worldwide with zero thread breaks, clean trims, and zero fabric puckering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const count = cat === 'All' ? workProjects.length : workProjects.filter(p => p.category === cat).length;
            const isActive = workFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setWorkFilter(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-emerald-600/60'
                  }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workProjects
            .filter((p) => workFilter === 'All' || p.category === workFilter)
            .map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-slate-900/85 hover:bg-slate-850 rounded-2xl border border-emerald-900/60 hover:border-emerald-400/80 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/60 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
              >
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden bg-slate-950 border-b border-emerald-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top badging */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2 z-10">
                    <span className="bg-slate-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md truncate max-w-[75%]">
                      {project.tag}
                    </span>
                    <span className="bg-slate-950/85 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700/60 shadow">
                      #{project.id}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
                    <span className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>🔍</span> Inspect Sewout &amp; Specs
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900/90 to-slate-950">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                      {project.category}
                    </div>
                    <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Specs Summary */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-slate-950/70 rounded-lg p-2 border border-slate-800/80 flex items-center gap-1.5">
                        <span className="text-emerald-400 text-xs">🧵</span>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">Stitches</div>
                          <div className="text-slate-200 font-mono font-bold truncate">{project.stitches}</div>
                        </div>
                      </div>
                      <div className="bg-slate-950/70 rounded-lg p-2 border border-slate-800/80 flex items-center gap-1.5">
                        <span className="text-teal-400 text-xs">👕</span>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">Fabric</div>
                          <div className="text-slate-200 font-bold truncate text-[10px]">{project.fabric}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Tested @ 1,000 SPM
                      </span>
                      <span className="text-emerald-400 font-bold text-xs group-hover:underline flex items-center gap-1">
                        <span>View Details</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
        </div>

        {/* View All on Dedicated Page Button */}
        <div className="text-center pt-2">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/50 hover:border-emerald-400 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore Full Our Work Portfolio Page ({workProjects.length} Verified Sewouts &amp; Search)</span>
            <span>→</span>
          </Link>
        </div>

        {/* Bottom Live Production Proof Banner */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-emerald-800/60 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-slate-800 pb-6 mb-6">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">22+</div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-300">Years in Business</div>
              <p className="text-[11px] text-slate-400">Pioneering commercial punchers</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">50,000+</div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-300">Designs Punched</div>
              <p className="text-[11px] text-slate-400">Caps, logos, vestments &amp; jackets</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">1,000 SPM</div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-300">High-Speed Proofed</div>
              <p className="text-[11px] text-slate-400">Tajima, Barudan, Brother, Melco</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100% Free</div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-300">Unlimited Edits</div>
              <p className="text-[11px] text-slate-400">Until your sewout runs flawless</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-lg font-black text-white">Have a custom logo or artwork to digitize?</h4>
              <p className="text-xs sm:text-sm text-slate-300">Send us your image today — get a production-ready sewout worksheet and machine files in 6–8 hours.</p>
            </div>
            <a
              href="#quote"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Get Free Sewout Quote</span>
              <span>⚡</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
