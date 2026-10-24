import Link from 'next/link';

export default function WhyChooseUsSection() {
  const capabilities = [
    'Custom Logo Digitizing',
    '3D Puff Digitizing',
    'Cap Digitizing',
    'Patch Digitizing',
    'Applique Digitizing',
    'Vestments Embroidery',
    'Irish Dance Dress Embroidery'
  ];

  return (
    <section id="why-choose-us" className="relative px-4 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/80 to-emerald-50/30 border-b border-slate-200 overflow-hidden">
      {/* Subtle Ambient Decorative Lights & Stitch Grid */}
      <div className="absolute inset-0 stitch-grid-light opacity-60 pointer-events-none"></div>
      <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main 2-Column Responsive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Official Workshop & Designer Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-md lg:max-w-none">

              {/* Glow & Backdrop Accent */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/25 to-teal-500/25 rounded-3xl blur-xl group-hover:blur-2xl transition duration-500 opacity-70"></div>

              {/* Main Card Frame with Image from newleafskills.com */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/20 bg-white shadow-2xl transition-all duration-300 group-hover:border-emerald-500/40">
                <div className="relative aspect-[535/485] sm:aspect-[4/3] lg:aspect-[535/485] overflow-hidden bg-slate-100">
                  <img
                    src="/why-choose-us.jpg"
                    alt="Why Choose Us - New Leaf Skills Professional Embroidery Digitizing Studio"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                  {/* Bottom overlay inside image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Master Studio &amp; Craftsmanship</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                      Dedicated digitization facility with live Tajima &amp; Barudan testing beds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge Overlay 1: Experience Chip (Top Right) */}
              <div className="absolute -top-5 -right-3 sm:-right-5 bg-slate-950/90 text-white backdrop-blur-md border border-emerald-500/40 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
                  22+
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide text-white">Years Experience</div>
                  <div className="text-[10px] text-emerald-300 font-medium">Since 2002 • Pioneer Punchers</div>
                </div>
              </div>

              {/* Floating Badge Overlay 2: Machine Ready & Zero Errors (Bottom Left) */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white/95 text-slate-900 backdrop-blur-md border border-emerald-200 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Machine-Ready Files</div>
                  <div className="text-[10px] text-slate-500 font-medium">Zero thread breaks • 100% Tested</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Content & Pillars from newleafskills.com */}
          <div className="lg:col-span-7 space-y-6">

            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 font-extrabold text-xs uppercase tracking-widest shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>Why Choose Us:</span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                New Leaf Skills
              </h2>
              <p className="text-sm sm:text-base font-semibold text-emerald-700 mt-1">
                Global Embroidery Digitizing &amp; Punching Excellence
              </p>
            </div>

            {/* Official Description Paragraphs from newleafskills.com */}
            <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                With over <strong className="text-slate-900 font-bold">22 years of experience</strong>, New Leaf Skills delivers professional <strong className="text-emerald-800 font-bold">Embroidery Digitizing Services</strong> with a strong focus on quality, accuracy, and customer satisfaction. Our skilled digitizers create machine-ready embroidery files that ensure smooth production and excellent stitch results.
              </p>
              <p>
                We provide a wide range of services, including <strong className="text-slate-900 font-semibold">Custom Logo Digitizing, 3D Puff Digitizing, Cap Digitizing, Patch Digitizing, Applique Digitizing, Vestments Embroidery, and Irish Dance Dress Embroidery</strong> for clients across India and worldwide.
              </p>
              <p>
                Our commitment to <strong className="text-emerald-800 font-bold">fast turnaround, affordable pricing, error-free digitizing, and reliable support</strong> makes us a trusted choice for embroidery businesses, apparel brands, and designers looking for high-quality embroidery solutions.
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">

              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  ⏱️
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">Fast Turnaround</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">6–8 hour standard turnaround with 2–4 hour rush dispatch available.</p>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">Error-Free Digitizing</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Calibrated stitch density, smart underlay, and zero thread breaks.</p>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  💰
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">Affordable Pricing</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">Transparent flat rates from $10 / ₹350 without any hidden setup costs.</p>
                </div>
              </div>

              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">Reliable 24/7 Support</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">100% free unlimited edits until your sewout runs perfectly on fabric.</p>
                </div>
              </div>

            </div>

            {/* Service Capabilities Pills from newleafskills.com */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Featured Capabilities on NewLeafSkills.com:
              </div>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((service, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-50/90 text-emerald-900 border border-emerald-200/80 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs hover:bg-emerald-100 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{service}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons & Trust Indicator */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#quote"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-600/30 border border-emerald-500 hover:scale-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Free Digitizing Quote</span>
                <span>⚡</span>
              </a>
              <Link
                href="/our-work"
                className="bg-white hover:bg-slate-100 text-slate-800 font-extrabold px-6 py-3.5 rounded-xl text-sm border border-slate-300 hover:border-emerald-500 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Our Work</span>
                <span>✨</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
