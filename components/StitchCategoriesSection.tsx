'use client';

import { useState } from 'react';

export interface StitchCategory {
  key: string;
  tabLabel: string;
  title: string;
  badge: string;
  desc: string;
  stitches: string;
  time: string;
  features: string[];
  image: string;
}

interface StitchCategoriesSectionProps {
  categories: StitchCategory[];
}

export default function StitchCategoriesSection({ categories = [] }: StitchCategoriesSectionProps) {
  // Agar database me data nahi hai toh fallback empty array handle hoga
  const [activeTab, setActiveTab] = useState<string>(categories.length > 0 ? categories[0].key : '');

  if (!categories || categories.length === 0) {
    return null; // Ya koi loading/empty state dikha sakte hain
  }

  // Active category find karna
  const activeCategory = categories.find((cat) => cat.key === activeTab) || categories[0];

  return (
    <section id="categories" className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-gradient-to-b from-slate-100 via-emerald-50/40 to-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block mb-4">
            <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border border-emerald-300 shadow-sm">
              Versatile Punching Studio
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Stitch Categories We Master</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
            Every garment fabric reacts differently to needle tension and thread density. Choose an application to see our tailored digitizing approach.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === cat.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-extrabold scale-105'
                : 'bg-white/85 backdrop-blur-md text-slate-700 hover:bg-white border border-slate-200/80 shadow-sm'
                }`}
            >
              {cat.tabLabel}
            </button>
          ))}
        </div>

        {/* Active Category Display Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 lg:p-10 grid lg:grid-cols-12 gap-8 items-center border border-emerald-100 shadow-2xl shadow-emerald-900/5">

          {/* Category Unique Image */}
          <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-950">
            <img
              src={activeCategory.image}
              alt={activeCategory.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
              <span className="bg-emerald-600 text-white font-bold text-[11px] px-3 py-1 rounded-lg shadow">
                {activeCategory.badge}
              </span>
            </div>
          </div>

          {/* Category Info */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{activeCategory.title}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {activeCategory.desc}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-1">
              {activeCategory.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Typical Stitches</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-700">{activeCategory.stitches}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Turnaround</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">{activeCategory.time}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#quote"
                className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition"
              >
                Order This Application Now 🚀
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}