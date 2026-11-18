'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { GoogleReview } from '@/types/googleReview';
import { fetchPaginatedGoogleReviews } from '@/lib/googleReviewsActions';

interface TestimonialsSectionProps {
  googleReviews?: GoogleReview[];
}

export default function TestimonialsSection({ googleReviews = [] }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  // Initial loaded reviews (first page of 10 reviews)
  const [reviews, setReviews] = useState<GoogleReview[]>(googleReviews);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(googleReviews.length);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Sync initial prop updates if any
  useEffect(() => {
    if (googleReviews && googleReviews.length > 0) {
      setReviews(googleReviews);
      setTotalCount((prev) => Math.max(prev, googleReviews.length));
    }
  }, [googleReviews]);

  // Fallback testimonials if database table has no reviews yet
  const defaultTestimonials = [
    {
      name: "Dave Henderson",
      role: "Apex Custom Apparel, Texas",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "We run 4 multi-head Tajima machines all day. Automated digitizing kept breaking needles on cap seams. Switched to NewLeafSkills and we haven't had a single broken thread in 6 months.",
      isGoogle: false,
    },
    {
      name: "Sarah Mitchell",
      role: "Summit Stitch Works, California",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Their 3D puff digitizing is hands-down the best in the industry. The satin borders are razor-sharp and the foam cuts away with zero fuzz around the edges. Turnaround is consistently under 6 hours.",
      isGoogle: false,
    },
    {
      name: "Marcus Chen",
      role: "Urban Print & Thread, Toronto",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Super reliable vector conversion and left-chest digitizing. They handle our rush orders on Saturday mornings without batting an eye. Highly recommended for commercial shops.",
      isGoogle: false,
    },
    {
      name: "Emily Rodriguez",
      role: "ThreadCraft Studio, Miami",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "The jacket back digitizing quality is phenomenal. Proper underlay sequencing prevents any fabric puckering on heavy denim and leather. Absolute lifesaver for our production team.",
      isGoogle: false,
    },
    {
      name: "Liam O'Connor",
      role: "Emerald Embroidery, Dublin",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Incredible attention to detail on micro-lettering. Clean trimmings mean minimal cleanup work for our machine operators. Best digitizing partner we've had in 10 years.",
      isGoogle: false,
    },
    {
      name: "Jessica Taylor",
      role: "Venture Merch Group, London",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Fast turnaround times and unlimited revisions make working with them completely stress-free. Their customer support team is always available when we have rush corporate jobs.",
      isGoogle: false,
    }
  ];

  const hasDbReviews = reviews && reviews.length > 0;

  // Function to load the next chunk (5 or 10 records) on clicking Next arrow
  const loadNextBatch = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const nextPage = page + 1;
      const res = await fetchPaginatedGoogleReviews(nextPage, pageSize);

      if (res && res.reviews && res.reviews.length > 0) {
        setReviews((prev) => {
          // Avoid duplicate review entries
          const existingIds = new Set(prev.map((r) => r.id));
          const newItems = res.reviews.filter((r) => !existingIds.has(r.id));
          return [...prev, ...newItems];
        });
        setPage(nextPage);
        setTotalCount(res.total);
        setHasMore(res.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load more reviews:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Scroll handler with lazy load triggering
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? clientWidth / 2 : clientWidth;

      if (direction === 'right') {
        // If near end or moving right, trigger loadNextBatch if more exists
        const remainingScroll = scrollWidth - (scrollLeft + clientWidth);
        if (remainingScroll < clientWidth * 1.5 && hasMore && !loadingMore) {
          loadNextBatch();
        }
        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      } else {
        scrollRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const displayReviews = hasDbReviews
    ? reviews.map((rev) => ({
        id: rev.id,
        name: rev.author_name,
        role: rev.relative_time || 'Google Verified Review',
        image: rev.author_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.author_name)}&background=10b981&color=fff`,
        rating: rev.rating || 5,
        text: rev.review_text,
        isGoogle: true,
      }))
    : defaultTestimonials.map((item, idx) => ({ ...item, id: idx }));

  return (
    <section id="testimonials" className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-gradient-to-b from-slate-50 via-emerald-50/40 to-slate-100 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Next/Prev Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 flex-wrap">
              <span className="text-emerald-800 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 shadow-xs">
                Satisfied Global Clients
              </span>
              {hasDbReviews && (
                <span className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-[11px] uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-2xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
                  Google Verified Reviews
                </span>
              )}

              {/* Batch Size Selector (10 or 5 records) */}
              {hasDbReviews && (
                <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-slate-600 shadow-2xs">
                  <span>Batch:</span>
                  <button
                    type="button"
                    onClick={() => setPageSize(5)}
                    className={`px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                      pageSize === 5 ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    5
                  </button>
                  <span>|</span>
                  <button
                    type="button"
                    onClick={() => setPageSize(10)}
                    className={`px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                      pageSize === 10 ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    10
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-base tracking-widest mt-1">
              {'★'.repeat(5)}
              <span className="text-slate-700 text-xs font-semibold ml-1.5 tracking-normal">5.0 Star Rating</span>
              {hasDbReviews && totalCount > 0 && (
                <span className="text-slate-400 text-[11px] ml-2 font-normal">
                  (Showing {displayReviews.length} of {totalCount})
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Loved by 10,000+ Apparel Decorators</h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Real verified reviews from embroidery business owners and apparel creators across the globe.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-md hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 group cursor-pointer"
              aria-label="Previous Slide"
              title="Previous Reviews"
            >
              <span className="transform group-hover:-translate-x-0.5 transition-transform font-black">←</span>
            </button>
            <button
              onClick={() => {
                scroll('right');
                // Proactively fetch next chunk when clicking next arrow
                if (hasMore && !loadingMore) {
                  loadNextBatch();
                }
              }}
              disabled={loadingMore && !hasMore}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-md hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 group cursor-pointer disabled:opacity-50 relative"
              aria-label="Next Slide"
              title="Next Reviews (Loads more seamlessly)"
            >
              {loadingMore ? (
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="transform group-hover:translate-x-0.5 transition-transform font-black">→</span>
              )}
            </button>
          </div>
        </div>

        {/* Testimonials Slider Track */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth focus:outline-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayReviews.map((client, idx) => (
              <div
                key={client.id || idx}
                className="min-w-[300px] sm:min-w-[360px] max-w-[380px] flex-shrink-0 snap-start bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-xl flex flex-col justify-between transform transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {'★'.repeat(Math.max(1, Math.min(5, client.rating)))}
                    </div>
                    {client.isGoogle && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
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
                        Google
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                    &ldquo;{client.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={client.image}
                    alt={client.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-xs group-hover:scale-105 transition-transform"
                    onError={(e: any) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=10b981&color=fff`;
                    }}
                  />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-bold group-hover:text-emerald-700 transition-colors">
                      {client.name}
                    </strong>
                    <span className="text-slate-500 text-[11px]">{client.role}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading placeholder cards when fetching next batch */}
            {loadingMore && (
              <div className="min-w-[300px] sm:min-w-[360px] max-w-[380px] flex-shrink-0 snap-start bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-dashed border-emerald-300 flex flex-col items-center justify-center gap-3 min-h-[220px] animate-pulse">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-500">Loading more reviews...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
