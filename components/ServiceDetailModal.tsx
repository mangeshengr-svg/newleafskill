'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types/service';

interface ServiceDetailModalProps {
  service: ServiceItem;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onRequestQuote,
}: ServiceDetailModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-300">
              {service.num}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300/60">
                {service.category}
              </span>
              <h3 id="modal-service-title" className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {service.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-thin">

          {/* Top Showcase Banner with Image & Quick Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-br from-emerald-50/60 via-slate-50 to-emerald-50/30 p-6 rounded-2xl border border-emerald-200/70">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative h-64 w-auto aspect-[7/10] rounded-2xl overflow-hidden border-2 border-emerald-300/80 shadow-lg bg-white">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md text-center border border-emerald-500/30">
                  {service.tag}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-block">
                <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {service.badge}
                </span>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                {service.shortDesc}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">⚡ Turnaround</span>
                  <span className="font-extrabold text-emerald-700">{service.turnaround}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">🔄 Revision Policy</span>
                  <span className="font-extrabold text-emerald-700">{service.revisions}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">🧵 Supported Formats</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">DST, PES, EXP, JEF, EMB</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">⚡ Speed Validation</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">1,000 SPM Tested</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Detailed Description */}
          <div className="space-y-4">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-emerald-600">📖</span>
              <span>Detailed Service Overview &amp; Specifications</span>
            </h4>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              {service.fullDesc.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Key Studio Highlights */}
          <div className="space-y-4">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="text-emerald-600">⭐</span>
              <span>Why Businesses Choose This Service</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80 text-xs font-semibold text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    ✓
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Sub-Offerings */}
          {service.subOfferings && service.subOfferings.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="text-emerald-600">🎯</span>
                <span>Sub-Services &amp; Applications Included</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.subOfferings.map((offering, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-400 transition"
                  >
                    <h5 className="font-extrabold text-slate-900 text-sm mb-1 text-emerald-800">
                      {offering.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {offering.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compatible Fabrics & Industries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>👕</span>
                <span>Fabric Calibration &amp; Optimization</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {service.fabrics.map((fabric, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                  >
                    {fabric}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>🏭</span>
                <span>Industries We Regularly Serve</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {service.targetIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            <span>⚡ Ready to order? </span>
            <span className="text-emerald-700 font-bold">Standard Turnaround 6–8 Hours • 100% Free Revisions</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/services/${service.slug}`}
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>Dedicated Page →</span>
            </Link>
            <button
              onClick={() => {
                onRequestQuote(service.title);
                onClose();
              }}
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Free Quote</span>
              <span>⚡</span>
            </button>
            <a
              href="tel:+919923790520"
              className="px-4 py-3 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>📞</span>
              <span className="hidden sm:inline">Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
