import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/servicesData';
import { getActiveServices } from '@/lib/serviceActions';
import { getServiceCategoriesHierarchy } from '@/lib/categoryActions';
import { getActiveFaqs } from '@/lib/faqActions';

export const instant = false;

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbServices = await getActiveServices();
  const allServices = dbServices.length > 0 ? dbServices : servicesData;
  const service = allServices.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return {
      title: 'Service Not Found | NewLeaf Skills',
    };
  }

  const metaTitle = service.metaTitle || `${service.title} | NewLeaf Skills Commercial Digitizing Studio`;
  const metaDesc = service.metaDescription || service.shortDesc;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [dbServices, categories] = await Promise.all([
    getActiveServices(),
    getServiceCategoriesHierarchy(),
  ]);

  const allServices = dbServices.length > 0 ? dbServices : servicesData;
  const service = allServices.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    notFound();
  }

  // Fetch FAQs matching this specific service's category/subcategory or general services FAQs
  const serviceFaqs = await getActiveFaqs(
    'services',
    service.category || undefined,
    service.subcategory || undefined
  );

  // Related services in the same category or subcategory
  const sameCategoryServices = allServices.filter(
    (s) => s.slug !== service.slug && s.category === service.category
  );

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header (Navbar & Top Announcement) */}
      <Header />

      {/* 2. Breadcrumb & Hero Header */}
      <section className="relative w-full min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/services/services-hero-banner.jpg"
            alt={service.imageAlt || service.title}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.25),transparent_70%)]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{service.badge || 'Commercial Production Standard'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
                {service.title}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow">
                {service.shortDesc}
              </p>
            </div>

            {/* Breadcrumb with category & subcategory links */}
            <div className="flex-shrink-0">
              <nav aria-label="Breadcrumb" className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-2 flex-wrap shadow-lg">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-emerald-400 transition">Services</Link>
                <span>/</span>
                <Link
                  href={`/services?category=${encodeURIComponent(service.category)}`}
                  className="text-emerald-300 hover:text-emerald-200 transition font-bold"
                  title={`View all ${service.category}`}
                >
                  {service.category}
                </Link>
                {service.subcategory && (
                  <>
                    <span>/</span>
                    <Link
                      href={`/services?category=${encodeURIComponent(service.category)}&subcategory=${encodeURIComponent(service.subcategory)}`}
                      className="text-emerald-200 hover:underline"
                    >
                      {service.subcategory}
                    </Link>
                  </>
                )}
                <span>/</span>
                <span className="text-white truncate max-w-[140px]">{service.title}</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Detail Layout with Sidebar (Requirement 5) */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Navigation Sidebar (Requirement 5) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 order-2 lg:order-1">

            {/* All Categories & Subcategories Sidebar Accordion/List */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <span>🗂️</span>
                  <span>Explore Other Categories</span>
                </h3>
              </div>

              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isCurrentCat = cat.name.toLowerCase() === service.category.toLowerCase();
                  return (
                    <div key={cat.id} className="space-y-1">
                      <Link
                        href={`/services?category=${encodeURIComponent(cat.name)}`}
                        className={`block px-3 py-2 rounded-xl text-xs font-bold transition ${
                          isCurrentCat
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {cat.name}
                      </Link>

                      {/* Subcategories list */}
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="pl-3 space-y-0.5 border-l-2 border-slate-200 ml-2">
                          {cat.subcategories.map((sub) => {
                            const isCurrentSub =
                              service.subcategory &&
                              sub.name.toLowerCase() === service.subcategory.toLowerCase();
                            return (
                              <Link
                                key={sub.id}
                                href={`/services?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                                className={`block px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                                  isCurrentSub
                                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                              >
                                ↳ {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/services"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition"
                >
                  <span>✨ View All Catalog</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick Specs Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Turnaround &amp; Support
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Standard Delivery:</span>
                  <strong className="text-slate-800">{service.turnaround || '6–8 Hours'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Rush Delivery:</span>
                  <strong className="text-emerald-700">2 Hours (Available)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Revisions:</span>
                  <strong className="text-slate-800">{service.revisions || '100% Free'}</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact#quote"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                >
                  <span>Request Instant Quote</span>
                  <span>⚡</span>
                </Link>
              </div>
            </div>

          </aside>

          {/* Right Area: Service Showcase & Detailed Content (9 cols) */}
          <div className="lg:col-span-9 space-y-8 order-1 lg:order-2">

            {/* Service Images & Visual Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                <img
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {service.tag}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-300">
                    {service.category}
                  </span>
                  {service.subcategory && (
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                      {service.subcategory}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {service.title}
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.shortDesc}
                </p>

                {service.secondaryImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-2xs shrink-0">
                      <img
                        src={service.secondaryImage}
                        alt="Production sewout preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-500">
                      <strong className="text-slate-800 block">Production Sewout Sample</strong>
                      Pre-tested on industrial multi-head Tajima embroidery machines.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* In-Depth Description Paragraphs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                About Our {service.title}
              </h3>
              <div className="space-y-3.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                {service.fullDesc && service.fullDesc.length > 0 ? (
                  service.fullDesc.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{service.shortDesc}</p>
                )}
              </div>
            </div>

            {/* Key Technical Highlights */}
            {service.keyHighlights && service.keyHighlights.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Technical Punching Highlights &amp; Quality Guarantees
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {service.keyHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-emerald-600 font-bold text-sm shrink-0">✓</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Production Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Production Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Supported Machine Formats:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.machineFormats && service.machineFormats.map((fmt, idx) => (
                      <span key={idx} className="bg-white text-slate-700 text-xs font-bold px-2 py-1 rounded-md border border-slate-200">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Calibrated Fabric Types:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.fabrics && service.fabrics.map((fabric, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-md border border-emerald-200/70">
                        ✓ {fabric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Offerings Grid */}
            {service.subOfferings && service.subOfferings.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Specialized Punching Capabilities Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.subOfferings.map((sub, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 hover:border-emerald-400 transition-all space-y-1 shadow-2xs">
                      <div className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{sub.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related FAQs for this Category / Subcategory */}
            {serviceFaqs && serviceFaqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Frequently Asked Questions
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-1">
                      Questions About {service.title} &amp; {service.category}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {serviceFaqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="group border border-slate-200 rounded-2xl p-4 bg-slate-50/50 open:bg-white open:border-emerald-300 transition-all shadow-2xs"
                    >
                      <summary className="font-bold text-xs sm:text-sm text-slate-800 cursor-pointer list-none flex items-center justify-between gap-3 group-hover:text-emerald-700">
                        <span>{faq.question}</span>
                        <span className="w-5 h-5 rounded-full bg-slate-200 group-open:bg-emerald-600 group-open:text-white text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Ready to Digitize Free Quote Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                  Ready to Digitize Your Design?
                </span>
                <h4 className="text-2xl font-black">Get Your Free Sewout Estimate in 15 Minutes</h4>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                  Upload your artwork (JPG, PNG, AI, EPS, PDF). Our digitizers will evaluate stitch counts, machine pathing, and provide a competitive quote with zero obligation.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/contact#quote"
                  className="bg-white hover:bg-emerald-50 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
                >
                  Upload Artwork for Free Quote →
                </Link>
                <Link
                  href="/services"
                  className="bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 border border-emerald-500/40 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition"
                >
                  View All Services Catalog
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. More Services in Same Category */}
      {sameCategoryServices.length > 0 && (
        <section className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1.5">
                  Category: {service.category}
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  More Services in {service.category}
                </h3>
              </div>

              <Link
                href={`/services?category=${encodeURIComponent(service.category)}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition inline-flex items-center gap-1.5"
              >
                <span>View All {service.category}</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sameCategoryServices.slice(0, 3).map((other) => (
                <div key={other.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-xs">
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200">
                      <img
                        src={other.image}
                        alt={other.imageAlt || other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        {other.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {other.shortDesc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 mt-3">
                    <Link
                      href={`/services/${other.slug}`}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-between"
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
