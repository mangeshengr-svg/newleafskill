'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogDetailModal from '@/components/BlogDetailModal';
import { BlogPost, BlogSortOption } from '@/types/blog';
import { blogCategories, blogPosts } from '@/data/blogPosts';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<BlogSortOption>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).slice(0, 12);
  }, []);

  // Filter & sort logic
  const filteredPosts = useMemo(() => {
    let result = blogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'All' && !post.tags.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchesCategory = post.category.toLowerCase().includes(q);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(q));
        const matchesContent = post.content.some((c) => c.toLowerCase().includes(q));

        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesTags && !matchesContent) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'newest') {
      // preserve natural array order which is descending by date
    } else if (sortBy === 'oldest') {
      result = [...result].reverse();
    } else if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'readTime') {
      result = [...result].sort((a, b) => {
        const timeA = parseInt(a.readTime, 10) || 0;
        const timeB = parseInt(b.readTime, 10) || 0;
        return timeA - timeB;
      });
    }

    return result;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedTag('All');
    setCurrentPage(1);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSortChange = (opt: BlogSortOption) => {
    setSortBy(opt);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('All');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Featured post: first featured post if on page 1 and no search
  const featuredPost = useMemo(() => {
    if (currentPage === 1 && !searchQuery.trim() && selectedCategory === 'All' && selectedTag === 'All') {
      return blogPosts.find((p) => p.featured) || blogPosts[0];
    }
    return null;
  }, [currentPage, searchQuery, selectedCategory, selectedTag]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (Navbar & Top Announcement) */}
      <Header />

      {/* 2. Cityo-Style Breadcrumb & Title Hero Banner with Background Image */}
      <section className="relative w-full min-h-[190px] sm:min-h-[230px] lg:min-h-[260px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        {/* Background Image Container with Light Translucent Overlay for high photo visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/blog/blog-hero-banner.jpg"
            alt="NewLeaf Skills Embroidery Digitizing Knowledge Base Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          />
          {/* Light Cinematic Gradient Overlay so background embroidery is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.22),transparent_70%)]" />
          {/* Subtle stitch dot pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Banner Content: Left Title + Right Breadcrumb (Identical layout to Cityo WordPress theme) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Left: Prominent Page Identifier "Blog" with high contrast against the visible photo */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest font-jakarta backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Commercial Embroidery Knowledge Hub</span>
              </div>

              <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-md">
                  Blog
                </span>
                <span className="text-emerald-400 text-2xl sm:text-4xl font-light drop-shadow">/</span>
                <span className="text-white sm:text-emerald-300 text-xl sm:text-3xl font-bold font-jakarta drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Guides &amp; Insights
                </span>
              </h1>

              <p className="text-slate-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Fabric pull compensation, 3D puff headwear secrets, zero-break density rules, and commercial case studies from 22+ years of manual punching.
              </p>
            </div>

            {/* Right: Breadcrumb Navigation with Active Page Highlight */}
            <div className="flex-shrink-0">
              <nav
                aria-label="Breadcrumb"
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-700/90 backdrop-blur-md text-xs font-semibold shadow-2xl"
              >
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 hover:underline"
                >
                  <span>🏠</span>
                  <span>Home</span>
                </Link>
                <span className="text-slate-500 font-bold">/</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 font-bold tracking-wide shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Blog</span>
                </span>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom subtle glowing border */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent z-10" />
      </section>

      {/* 2b. Metrics Quick Highlights Bar */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-8 lg:px-20 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-outfit">21+</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5 font-jakarta">Expert Guides</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Machine-tested embroidery tips</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-outfit">10,000+</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5 font-jakarta">Shops Helped</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Commercial decorators worldwide</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-outfit">0 Breaks</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5 font-jakarta">Zero-Thread-Break</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Proven density &amp; underlay rules</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-outfit">6–8 Hours</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5 font-jakarta">Turnaround</div>
              <p className="text-[11px] text-slate-500 mt-0.5">With rush 2-hour available</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Toolbar & Search Bar */}
      <section className="sticky top-[102px] z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs px-4 sm:px-8 lg:px-20 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto space-y-3">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {blogCategories.map((cat) => {
                const count = cat === 'All' ? blogPosts.length : blogPosts.filter((p) => p.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 scale-102 font-jakarta'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/70'
                      }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-700/60 text-white font-extrabold' : 'bg-slate-200/80 text-slate-600'
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search articles, techniques..."
                  className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 border border-slate-200 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as BlogSortOption)}
                  className="bg-slate-50 text-slate-700 text-xs sm:text-sm rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="readTime">Read Time: Quick First</option>
                  <option value="title">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quick Tag Pills Cloud */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mr-1 font-jakarta">
              Popular Tags:
            </span>
            <button
              onClick={() => handleTagSelect('All')}
              className={`px-2.5 py-1 rounded-lg text-xs transition cursor-pointer font-medium ${selectedTag === 'All'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag === selectedTag ? 'All' : tag)}
                className={`px-2.5 py-1 rounded-lg text-xs transition cursor-pointer font-medium ${selectedTag === tag
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Main Blog Content Area */}
      <section ref={gridRef} className="px-4 sm:px-8 lg:px-20 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Featured Post Banner (Visible on Page 1 with No Query) */}
          {featuredPost && (
            <div
              onClick={() => setSelectedArticle(featuredPost)}
              className="bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/40 rounded-3xl border border-emerald-200/80 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs font-jakarta">
                    Featured Insight
                  </span>
                  <span className="text-xs text-emerald-800 font-bold">
                    {featuredPost.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">⏱️ {featuredPost.readTime}</span>
                </div>

                <h2 className="font-outfit text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(featuredPost);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <span>&rarr;</span>
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    Published {featuredPost.date} by {featuredPost.author}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 bg-slate-100 shadow-md aspect-video">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 border-b border-slate-200 pb-3">
            <div>
              Showing <span className="font-bold text-emerald-700">{filteredPosts.length}</span> articles
              {selectedCategory !== 'All' && <span> in <strong className="text-slate-900">{selectedCategory}</strong></span>}
              {selectedTag !== 'All' && <span> tagged with <strong className="text-emerald-700">#{selectedTag}</strong></span>}
              {searchQuery && <span> matching &ldquo;<strong className="text-emerald-700">{searchQuery}</strong>&rdquo;</span>}
            </div>
            {(selectedCategory !== 'All' || selectedTag !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-xs">
              <div className="text-5xl">📖</div>
              <h3 className="font-outfit text-xl font-bold text-slate-900">No articles matched your filter</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the category.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition cursor-pointer shadow-sm"
              >
                Show All Articles
              </button>
            </div>
          )}

          {/* Articles Grid (6 items per page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedArticle(post)}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_35px_-10px_rgba(16,185,129,0.18)] transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-emerald-800 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs border border-emerald-100 font-jakarta">
                      {post.category}
                    </span>

                    {/* Read Time Tag */}
                    <span className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                      ⏱️ {post.readTime}
                    </span>
                  </div>

                  {/* Article Info Content */}
                  <div className="p-6 space-y-3">

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span>📅 {post.date}</span>
                      <span>•</span>
                      <span>By {post.author}</span>
                    </div>

                    <h3 className="font-outfit text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {post.excerpt}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagSelect(tag);
                          }}
                          className="text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 px-2.5 py-0.5 rounded-md border border-slate-200/60 transition"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Action - Clean and uncluttered */}
                <div className="p-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition">
                    <span>Read Full Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>

                  <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center text-xs transition-colors shadow-2xs font-bold">
                    &rarr;
                  </div>
                </div>

              </article>
            ))}
          </div>

          {/* 5. Working Pagination Bar */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">

              <div className="text-xs text-slate-500">
                Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
                <span className="font-bold text-slate-900">{totalPages}</span> • Showing posts{' '}
                <span className="font-bold text-emerald-700">{(currentPage - 1) * POSTS_PER_PAGE + 1}</span>–
                <span className="font-bold text-emerald-700">
                  {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)}
                </span>{' '}
                of {filteredPosts.length}
              </div>

              <div className="flex items-center gap-1.5">

                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${currentPage === 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer border border-slate-200 shadow-2xs'
                    }`}
                  aria-label="Previous Page"
                >
                  <span>&larr;</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center ${isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                        }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${currentPage === totalPages
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer border border-slate-200 shadow-2xs'
                    }`}
                  aria-label="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>&rarr;</span>
                </button>

              </div>
            </div>
          )}

          {/* 6. Studio Free Quote & Service Guarantee Banner */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 border border-emerald-700/60 shadow-2xl relative overflow-hidden text-white">
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="bg-white/15 text-emerald-200 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                ⚡ Turnaround: 6–8 Hours | Rush 2 Hours
              </span>
              <h2 className="font-outfit text-2xl sm:text-4xl font-black text-white tracking-tight">
                Have a Complex Logo or Cap Design to Digitize?
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Send us your artwork today. We calibrate push-pull compensation for your exact machine and fabric, delivering crisp sewouts with zero thread breaks and unlimited free revisions.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/#quote"
                  className="bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm px-7 py-3.5 rounded-xl shadow-lg transition hover:shadow-xl"
                >
                  Get Instant Free Quote &rarr;
                </Link>
                <Link
                  href="/our-work"
                  className="bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-emerald-400/40 transition"
                >
                  View Sewout Portfolio
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Full Reading Detail Modal */}
      {selectedArticle && (
        <BlogDetailModal
          post={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </main>
  );
}
