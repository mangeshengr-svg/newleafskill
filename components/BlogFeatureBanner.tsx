'use client';

import React from 'react';

interface BlogFeatureBannerProps {
  title: string;
  category?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export default function BlogFeatureBanner({
  title,
  category = 'Embroidery Insights',
  image = '/blog/blog-hero-banner.jpg',
  imageAlt = '',
  className = '',
}: BlogFeatureBannerProps) {
  // If user uploaded a custom upload from admin (starts with /uploads/), show user uploaded image directly
  const isCustomUserUpload = image && image.startsWith('/uploads/');

  if (isCustomUserUpload) {
    return (
      <div className={`relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100 aspect-video ${className}`}>
        <img
          src={image}
          alt={imageAlt || title}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Dynamic stylized graphic card matching the design
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white aspect-video flex flex-col justify-between group select-none ${className}`}>
      
      {/* Background Graphic: The embroidery artwork/patches on the right */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt || title}
          className="w-full h-full object-cover object-right"
        />
        {/* Soft white gradient overlay on left to ensure the dynamic title is always 100% crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/90 md:to-white/10 w-full sm:w-[65%]" />
      </div>

      {/* Dynamic Content Overlay (Left Side) */}
      <div className="relative z-10 p-5 sm:p-8 md:p-10 flex flex-col justify-between h-full max-w-[85%] sm:max-w-[62%]">
        
        {/* Top Brand Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="New Leaf Skills Logo"
            className="h-7 sm:h-9 w-auto object-contain"
            onError={(e) => {
              // Fallback to text logo if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Dynamic Title (Connected directly to database/admin title) */}
        <div className="space-y-2.5 my-auto py-2">
          <h2 className="font-outfit text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug drop-shadow-xs">
            {title}
          </h2>
          <div className="w-12 h-1 bg-emerald-600 rounded-full" />
        </div>

        {/* Bottom Badge */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            {category}
          </span>
        </div>

      </div>

      {/* Decorative subtle border highlight */}
      <div className="absolute inset-0 border border-slate-900/5 rounded-2xl pointer-events-none z-20" />
    </div>
  );
}

