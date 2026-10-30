'use client';

import { useState, useEffect } from 'react';

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroContent {
  badgeText: string;
  mainHeading: string;
  description: string;
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  stats: StatItem[];
}

export interface TelemetryItem {
  label: string;
  value: string;
}

export interface HeroSlide {
  id: string;
  tabName: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  slideTitle: string;
  slideDesc: string;
  telemetry: TelemetryItem[];
}

interface HeroSectionProps {
  content: HeroContent | null;
  slides: HeroSlide[];
}

export default function HeroSection({ content, slides }: HeroSectionProps) {
  const [heroSlide, setHeroSlide] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  const heroSlides = slides && slides.length > 0 ? slides : [];
  const activeHeroSlide = heroSlides[heroSlide] || heroSlides[0];

  useEffect(() => {
    if (isHeroPaused || heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroPaused, heroSlides.length]);

  if (!content) {
    return (
      <section className="relative px-4 py-16 text-center bg-slate-50 border-b border-slate-200">
        <p className="text-slate-500 font-medium text-sm">Loading hero section...</p>
      </section>
    );
  }

  return (
    <section className="relative px-4 sm:px-8 lg:px-20 py-8 sm:py-10 lg:py-12 overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/25 to-white border-b border-slate-200">
      <div className="absolute inset-0 stitch-grid-light opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left Column: Dynamic Content from 'home_hero_content' */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-emerald-100/90 border border-emerald-300 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            {content.badgeText}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-slate-900 leading-[1.1] tracking-tight">
            {content.mainHeading}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            {content.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={content.btn1Link}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2.5"
            >
              <span>{content.btn1Text}</span>
              {/* <span>→</span> */}
            </a>

            <a
              href={content.btn2Link}
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-xl border border-slate-300 transition text-sm sm:text-base flex items-center gap-2 shadow-sm"
            >
              <span>{content.btn2Text}</span>
              {/* <span className="text-emerald-600">🔍</span> */}
            </a>
          </div>

          {/* Dynamic Stats Cards */}
          <div className="grid grid-cols-3 gap-3.5 pt-4 border-t border-slate-200">
            {content.stats.map((stat, idx) => {
              // Determine dynamic color based on the stat value
              let textColor = "text-slate-900"; // default
              if (stat.value.includes('10k')) {
                textColor = "text-emerald-600";
              } else if (stat.value.includes('4.9') || stat.value.includes('★')) {
                textColor = "text-amber-500";
              }

              return (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm">
                  <h4 className={`text-2xl font-black ${textColor}`}>
                    {stat.value}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Slider from 'home_hero_slider' */}
        <div
          className="lg:col-span-6"
          id="live-machine"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
        >
          {heroSlides.length > 0 && activeHeroSlide && (
            <div className="relative bg-white p-3 sm:p-4 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 group">

              {/* Active Slide Tab Name Badge */}
              <div className="absolute -top-3.5 -right-3.5 bg-emerald-600 text-white font-black text-[10px] sm:text-[11px] px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider z-20 flex items-center gap-2 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>{activeHeroSlide.slideTitle}</span>
              </div>

              {/* Viewport Frame */}
              <div className="relative h-[375px] sm:h-[415px] rounded-2xl overflow-hidden shadow-inner bg-slate-950">
                {activeHeroSlide.mediaType === 'video' ? (
                  <video
                    key={activeHeroSlide.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-opacity duration-500"
                  >
                    <source src={activeHeroSlide.mediaUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={activeHeroSlide.mediaUrl}
                    alt={activeHeroSlide.slideTitle}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter contrast-[1.03]"
                  />
                )}

                {/* Bottom Overlay & Telemetry Specs */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent flex items-end p-5 pointer-events-none">
                  <div className="space-y-1.5 w-full">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{activeHeroSlide.slideTitle}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{activeHeroSlide.slideDesc}</p>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-700/60 text-[10px]">
                      {activeHeroSlide.telemetry?.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/80 px-2 py-1 rounded-md border border-slate-700/50">
                          <span className="text-slate-400 block font-medium truncate">{item.label}</span>
                          <span className="text-emerald-400 font-black truncate block">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow Controls */}
                <button
                  type="button"
                  onClick={() => setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center z-30 shadow-md"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center z-30 shadow-md"
                >
                  →
                </button>
              </div>

              {/* Slider Tab Navigation Buttons */}
              <div className="grid grid-cols-4 gap-1.5 mt-3">
                {heroSlides.map((item, idx) => (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={() => setHeroSlide(idx)}
                    className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center flex items-center justify-center gap-1 truncate ${
                      heroSlide === idx
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span className="truncate">{item.tabName}</span>
                  </button>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}