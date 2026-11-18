'use client';

import pool from '@/lib/db';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ReviewActionButtons from '@/components/admin/ReviewActionButtons';
import SyncReviewsModal from '@/components/admin/SyncReviewsModal';
import AddReviewModal from '@/components/admin/AddReviewModal';
import DisplaySettingsControl from '@/components/admin/DisplaySettingsControl';
import { GoogleReview } from '@/types/googleReview';
import { GoogleReviewsSettings } from '@/lib/googleReviewsActions';

interface GoogleReviewsClientViewProps {
  initialReviews: GoogleReview[];
  settings: GoogleReviewsSettings;
}

export default function GoogleReviewsClientView({
  initialReviews,
  settings,
}: GoogleReviewsClientViewProps) {
  const [reviews] = useState<GoogleReview[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const activeCount = useMemo(
    () => reviews.filter((r) => r.is_active === 1).length,
    [reviews]
  );

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Search
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.review_text.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter Rating
      const matchesRating =
        filterRating === 'all' || r.rating === parseInt(filterRating, 10);

      // Filter Status
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && r.is_active === 1) ||
        (filterStatus === 'hidden' && r.is_active === 0);

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [reviews, searchQuery, filterRating, filterStatus]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Main Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Google Reviews Management
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Manage, sync and display real Google Business reviews on your website testimonials.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/#testimonials"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live Section</span>
            <span>↗</span>
          </Link>
          <SyncReviewsModal />
          <AddReviewModal />
        </div>
      </div>

      {/* Frontend Website Display Controls Widget */}
      <DisplaySettingsControl
        currentMode={settings.display_mode}
        currentCount={settings.display_count}
        totalActiveCount={activeCount}
      />

      {/* Info Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Total Reviews in Admin</p>
            <p className="text-2xl font-black text-slate-900">{reviews.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            ⭐
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Active (Visible)</p>
            <p className="text-2xl font-black text-emerald-600">{activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Hidden from Frontend</p>
            <p className="text-2xl font-black text-slate-500">{reviews.length - activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg">
            ✕
          </div>
        </div>
      </div>

      {/* Simplified Search & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search reviews by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="hidden">Hidden Only</option>
          </select>

          {/* Rating Filter */}
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Star)</option>
            <option value="4">⭐⭐⭐⭐ (4 Star)</option>
            <option value="3">⭐⭐⭐ (3 Star)</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold ml-auto md:ml-0 whitespace-nowrap">
            Showing {filteredReviews.length} of {reviews.length}
          </span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-bold text-slate-700">No matching reviews found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search query or filter options.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review Text</th>
                  <th className="p-4">Time</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReviews.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 text-center font-mono text-slate-400 text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.author_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=10b981&color=fff`}
                          alt={r.author_name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                          onError={(e: any) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=10b981&color=fff`;
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{r.author_name}</p>
                          <span className="text-[10px] text-slate-400">Google Verified</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center text-amber-400 text-xs font-bold">
                        {'★'.repeat(r.rating || 5)}
                        <span className="text-slate-600 ml-1.5 text-[11px] font-semibold">
                          ({r.rating || 5}.0)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 max-w-lg">
                      <p className="text-slate-600 line-clamp-3 leading-relaxed text-xs">
                        {r.review_text}
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {r.relative_time || 'Recently'}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <ReviewActionButtons id={r.id} isActive={r.is_active ?? 1} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
