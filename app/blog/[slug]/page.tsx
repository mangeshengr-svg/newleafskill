import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, getActiveBlogPosts } from '@/lib/blogActions';

export const instant = false;

interface BlogSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | New Leaf Skills',
      description: 'The requested embroidery guide or blog article could not be found.',
    };
  }

  const metaTitle = post.metaTitle || `${post.title} | New Leaf Skills Digitizing Studio`;
  const metaDescription = post.metaDescription || post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      url: `https://newleafskills.com/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts in the same category or latest
  const allPosts = await getActiveBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Header (Navbar & Top Announcement) */}
      <Header />

      {/* 2. Breadcrumb & Article Header */}
      <section className="bg-slate-950 text-white py-12 sm:py-16 border-b border-emerald-950/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 space-y-5">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap">
            <Link href="/" className="hover:text-emerald-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-emerald-400 transition">
              Blog
            </Link>
            <span>/</span>
            <span className="text-emerald-400 truncate max-w-xs sm:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
              ⏱️ {post.readTime}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author & Published Date */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shadow-xs">
                NL
              </div>
              <div>
                <span className="font-bold text-slate-200">{post.author}</span>
                <span className="text-emerald-400 ml-1.5 font-medium">({post.authorRole})</span>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span>📅</span>
              <span>Published {post.date}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Article Body */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Content Area (8 cols) */}
            <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              
              {/* Feature Image with Alt Text */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100 aspect-video">
                <img
                  src={post.image || '/blog/blog-hero-banner.jpg'}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Excerpt Lead Paragraph */}
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium border-l-4 border-emerald-600 pl-4 bg-emerald-50/40 py-3 rounded-r-xl">
                {post.excerpt}
              </p>

              {/* Key Technical Takeaways Box */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-teal-50/40 border border-emerald-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wider">
                    <span>⚡</span>
                    <span>Key Commercial Embroidery Takeaways</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed font-medium">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Paragraphs of Article */}
              <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {Array.isArray(post.content) && post.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags Section */}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                    Related Topic Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="bg-slate-100 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share & Quote Banner */}
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 border border-emerald-700/60 rounded-3xl p-8 sm:p-10 text-white space-y-4 shadow-xl">
                <span className="inline-block bg-white/15 text-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                  Ready to test our punching precision?
                </span>
                <h3 className="font-outfit text-xl sm:text-2xl font-black text-white">
                  Send Your Logo For Same-Day Digitizing
                </h3>
                <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                  Calibrated for zero thread breaks, clean stitch density, and exact fabric push-pull compensation. Formats: DST, PES, EMB, CND, VP3, JEF + PDF worksheets.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/#quote"
                    className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg"
                  >
                    <span>Request Free Studio Quote</span>
                    <span>&rarr;</span>
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-emerald-500/40 transition"
                  >
                    <span>Browse All Guides</span>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Studio Overview Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-outfit text-base font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>🏢</span>
                  <span>About New Leaf Skills</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  22+ years of manual commercial digitizing for contract embroiderers, screen printers, apparel decorators, and high-end fashion designers across the USA.
                </p>
                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Zero automated auto-punching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Rush turnaround: 2 to 4 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Free unlimited file edits</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="block text-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs"
                >
                  Contact Studio
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                  <h3 className="font-outfit text-base font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span>📖</span>
                    <span>More Guides &amp; Insights</span>
                  </h3>

                  <div className="space-y-4">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        className="group flex gap-3 items-center"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={rel.image || '/blog/blog-hero-banner.jpg'}
                            alt={rel.imageAlt || rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {rel.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
                            {rel.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 block">
                            ⏱️ {rel.readTime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/blog"
                    className="block text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
                  >
                    View All {allPosts.length} Articles &rarr;
                  </Link>
                </div>
              )}

            </aside>

          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}

