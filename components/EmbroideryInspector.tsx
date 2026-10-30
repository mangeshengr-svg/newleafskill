'use client';

import { useState, useRef, useCallback } from 'react';

export default function EmbroideryInspector({ items }: { items: any[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[activeTab] || items[0];

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  return (
    <section id="comparison" className="px-4 sm:px-8 lg:px-20 py-10 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mx-auto mb-8 space-y-3">
          <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-900 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-sm">
            ✨ Interactive Quality Inspector
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Raw Vector Artwork vs. <br />
            <span className="leaf-gradient-text">Production Embroidery Sewout</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Drag the interactive comparison handle left or right to inspect exact stitch density, sharp satin lettering, and pull compensation achieved by our master punchers.
          </p>

          {/* Dynamic Design Selector Tabs */}
          <div className="flex justify-center gap-2.5 pt-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(index);
                  setSliderPos(50); // Reset slider on tab switch
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === index
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30 border-2 border-emerald-600 font-extrabold scale-102'
                    : 'bg-white text-slate-900 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-300 font-bold shadow-sm'
                }`}
              >
                <span className={activeTab === index ? 'text-white font-extrabold' : 'text-slate-900 font-bold'}>
                  {item.tab_title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">

          {/* Left Column: Technical Specifications Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    {currentItem.badge_text}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5 tracking-tight">{currentItem.title}</h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {currentItem.description}
              </p>

              {/* Technical Specs List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Design Size:</span>
                  <span className="text-slate-900 font-bold">{currentItem.design_size || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Stitch Count:</span>
                  <span className="text-emerald-700 font-bold">{currentItem.stitch_count || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Underlay Pathing:</span>
                  <span className="text-slate-900 font-bold">{currentItem.underlay_pathing || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Pull Compensation:</span>
                  <span className="text-emerald-700 font-bold">{currentItem.pull_compensation || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Thread System:</span>
                  <span className="text-slate-900 font-bold">{currentItem.thread_system || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-500 font-medium">Formats Provided:</span>
                  <span className="text-slate-900 font-bold">{currentItem.formats_provided || 'DST, PES, EXP, JEF + PDF'}</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={currentItem.button_url || '#quote'}
                  className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition"
                >
                  {currentItem.button_text || 'Digitize A Design Like This →'}
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Before/After Interactive Slider */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xl relative">

              {/* Visual Label Legend */}
              <div className="flex justify-between items-center mb-2.5 text-xs font-semibold px-1">
                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Original Vector Art
                </span>
                <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Real Embroidery Sewout
                </span>
              </div>

              {/* SLIDER CONTAINER */}
              <div
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="relative w-full aspect-square max-h-[420px] rounded-xl overflow-hidden select-none bg-slate-950 shadow-inner cursor-ew-resize touch-none border border-slate-200"
              >
                {/* AFTER: Finished Embroidery Sewout (Bottom Layer) */}
                <img
                  src={currentItem.after_image}
                  alt="After Digitizing — Production Embroidery Sewout"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* BEFORE: Original Vector Artwork (Top Layer, clipped by sliderPos) */}
                <img
                  src={currentItem.before_image}
                  alt="Before Digitizing — Original Vector Design"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-none"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                  }}
                  draggable={false}
                />

                {/* Divider Handle Bar */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]"></div>
                  <div className="relative w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-emerald-500 text-slate-900 font-black text-sm transform transition hover:scale-110">
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                    </svg>
                  </div>
                </div>

                {/* Corner Badges */}
                <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white pointer-events-none absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md shadow-md z-10">
                  Before: Vector Artwork
                </span>
                <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white pointer-events-none absolute top-3 right-3 bg-emerald-700/90 backdrop-blur-md shadow-md z-10">
                  After: Stitched DST File
                </span>

                {/* Hidden Accessible Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Before and after image comparison slider"
                  className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                />
              </div>

              {/* Helper prompt below slider */}
              <div className="flex items-center justify-between text-slate-500 text-[11px] mt-3 px-1 font-medium">
                <span>← Drag or click anywhere to compare</span>
                <span className="text-emerald-700 font-bold">{Math.round(sliderPos)}% Vector / {100 - Math.round(sliderPos)}% Stitched</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}