import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/servicesData';
import { ServiceItem } from '@/types/service';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return {
      title: 'Service Not Found | NewLeaf Skills',
    };
  }

  return {
    title: `${service.title} | NewLeaf Skills Commercial Digitizing Studio`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | NewLeaf Skills`,
      description: service.shortDesc,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* 1. Header (Navbar & Top Announcement) */}
      <Header />

      {/* 2. Breadcrumb & Hero Header */}
      <section className="relative w-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] flex items-center bg-slate-950 border-b border-emerald-900/40 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/services/services-hero-banner.jpg"
            alt={service.title}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.25),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-400/60 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{service.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
                {service.title}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow">
                {service.shortDesc}
              </p>
            </div>

            {/* Breadcrumb */}
            <div className="flex-shrink-0">
              <nav aria-label="Breadcrumb" className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-emerald-400 transition">Services</Link>
                <span>/</span>
                <span className="text-emerald-400 truncate max-w-[150px]">{service.title}</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Service Content Showcase */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Showcase & Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {service.tag}
                </span>
              </div>

              {service.secondaryImage && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                    <img
                      src={service.secondaryImage}
                      alt={`${service.title} sewout detail`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      Production Sewout
                    </span>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 flex flex-col justify-center">
                    <div className="text-[10px] uppercase font-bold text-emerald-800">Turnaround Speed</div>
                    <div className="text-xs font-black text-slate-900 mt-0.5">{service.turnaround}</div>
                    <div className="text-[10px] text-emerald-700 font-medium mt-1">Revisions: {service.revisions}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Production Specifications Pill Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Production Specifications
              </h3>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Supported Machine Formats:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {service.machineFormats.map((fmt, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Calibrated Fabric Types:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {service.fabrics.map((fabric, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-200/70">
                      ✓ {fabric}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Target Industries:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {service.targetIndustries.map((ind, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-lg border border-slate-200">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact#quote"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2"
                >
                  <span>Request Quote for {service.title}</span>
                  <span>⚡</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Full In-Depth Description & Offerings (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Full Description Paragraphs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                About Our {service.title}
              </h2>
              <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.fullDesc.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Technical Highlights */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Key Technical Highlights &amp; Quality Guarantees
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.keyHighlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-emerald-600 font-bold text-sm shrink-0">✓</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Offerings Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Specialized Punching Capabilities Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.subOfferings.map((sub, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 hover:border-emerald-400 transition-all space-y-1.5 shadow-xs">
                    <div className="font-black text-sm text-slate-900 flex items-center gap-2">
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

            {/* Free Quote Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
                  Ready to Digitize Your Design?
                </span>
                <h4 className="text-2xl font-black">Get Your Free Sewout Estimate in 15 Minutes</h4>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                  Upload your artwork (JPG, PNG, AI, EPS, PDF). Our digitizers will evaluate stitch counts, machine pathing, and provide a competitive quote with zero obligation.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
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

      {/* 4. Explore Other Services Section */}
      <section className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Complete Punching Suite
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Other Specialized Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div key={other.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-xs">
                <div className="space-y-3">
                  <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      {other.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {other.shortDesc}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200/80 mt-4">
                  <Link
                    href={`/services/${other.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center justify-between"
                  >
                    <span>View Service Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all"
            >
              <span>View Full Services Catalog &amp; Filters</span>
              <span>⚡</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Luxury Light Footer */}
      <Footer />
    </main>
  );
}
