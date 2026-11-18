'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import RichTextRenderer from '@/components/RichTextRenderer';
import BlogFeatureBanner from '@/components/BlogFeatureBanner';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogDetailModal({ post, onClose }: BlogDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-post-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-900 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-white/95 border-b border-slate-100 sticky top-0 z-20 backdrop-blur-lg">
          <div className="flex items-center gap-2.5 text-xs font-jakarta">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              ⏱️ {post.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs font-bold text-sm"
            aria-label="Close article modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-7 scrollbar-thin scrollbar-thumb-emerald-500/40 scrollbar-track-slate-100">
          
          {/* Article Title & Meta */}
          <div className="space-y-4">
            <h1
              id="modal-post-title"
              className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shadow-xs">
                  NL
                </div>
                <div>
                  <span className="font-bold text-slate-900">{post.author}</span>
                  <span className="text-emerald-700 ml-1.5 font-medium">({post.authorRole})</span>
                </div>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <span>📅</span>
                <span>{post.date}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 font-medium text-slate-600">
                <span>⏱️</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image / Dynamic Live Banner */}
          <BlogFeatureBanner
            title={post.title}
            category={post.category}
            image={post.image}
            imageAlt={post.title}
          />

          {/* Key Takeaways Box (if available) */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-teal-50/30 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wider font-jakarta">
                <span>⚡</span>
                <span>Key Technical Takeaways</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Full Paragraphs and Subheadings */}
          <RichTextRenderer content={post.content} className="text-sm sm:text-base" />

          {/* Topic Tags */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block font-jakarta">
              Related Topic Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to action Banner inside Modal */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 border border-emerald-700/60 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl text-white relative overflow-hidden">
            <div className="inline-block bg-white/15 text-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-sm">
              Need This Punching Precision For Your Shop?
            </div>
            <h3 className="font-outfit text-xl sm:text-2xl font-black text-white">
              Get Your Logo Digitized Within 6–8 Hours
            </h3>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Upload your vector artwork or sketch now. Our master digitizers test every file for zero needle breaks and deliver Tajima DST, Barudan, Brother &amp; PDF worksheets.
            </p>
            <div className="pt-2">
              <Link
                href="/#quote"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm px-7 py-3 rounded-xl transition shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Request Free Quote</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <div>
            Published by <span className="text-emerald-700 font-bold">NewLeaf Skills Studio</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold px-4 py-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 transition cursor-pointer shadow-2xs"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
}

