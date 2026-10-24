'use client';

import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      num: '01',
      slug: 'computerized-embroidery',
      title: 'Computerized Embroidery Services',
      tag: 'Industrial Machine Runs',
      image: '/services/computerized-embroidery.png',
      desc: 'High-speed multi-head computerized embroidery for commercial apparel, corporate uniforms, and bulk garments. Engineered with calibrated stitch tensions, automatic trimming, and zero thread breaks.'
    },
    {
      num: '02',
      slug: 'embroidery-digitizing',
      title: 'Embroidery Digitizing Services',
      tag: 'Master Hand-Punched',
      image: '/services/embroidery-digitizing.png',
      desc: 'Veteran hand-punching converting logos, sketches, and graphics into machine-ready files. Calibrated stitch paths, underlay stabilization, and fabric pull compensation for 1,000+ SPM speeds.'
    },
    {
      num: '03',
      slug: 'custom-logo-digitizing',
      title: 'Custom Logo Digitizing',
      tag: 'Corporate & Brand Emblems',
      image: '/services/custom-logo-digitizing.png',
      desc: 'Transform company logos, mascot emblems, and brand insignias into clean embroidery files. Crisp micro-lettering clarity, sharp satin border outlines, and rich tatami fills that hold true to your artwork.'
    },
    {
      num: '04',
      slug: 'vestments-embroidery',
      title: 'Vestments Embroidery Services',
      tag: 'Sacred & Liturgical Vestments',
      image: '/services/vestments-embroidery.png',
      desc: 'Specialized high-density digitizing and embroidery for church vestments, ceremonial robes, altar cloths, and ecclesiastical stoles. Intricately rendered with metallic gold bullion threadwork.'
    },
    {
      num: '05',
      slug: '3d-puff-digitizing',
      title: '3D Puff Digitizing',
      tag: 'Raised 3D Foam Relief',
      image: '/services/3d-puff-digitizing.png',
      desc: 'Raised 3D foam relief embroidery engineered for snapbacks, baseball caps, and athletic jackets. Programmed with high-density satin caps and perforation cuts that sever 3mm EVA foam cleanly.'
    },
    {
      num: '06',
      slug: 'apparel-logo-digitizing',
      title: 'Apparel Logo Digitizing',
      tag: 'Apparel & Uniforms',
      image: '/services/apparel-logo-services.png',
      desc: 'Custom digitizing designed specifically for polo shirts, t-shirts, fleece hoodies, and corporate outerwear. Fabric-calibrated underlays eliminate puckering and garment bunching.'
    }
  ];

  return (
    <section id="services" className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-gradient-to-b from-slate-100 via-emerald-50/50 to-slate-100 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-14 space-y-3">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 rounded-full text-xs font-extrabold text-emerald-800 uppercase tracking-widest shadow-2xs">
              ✨ Official New Leaf Skills Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Our Core Embroidery Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Serving commercial apparel decorators, embroidery factories, and brands worldwide with 22+ years of manual punching excellence and industrial testing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white text-slate-800 rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-500/50 group shadow-md overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                {service.num}
              </div>

              {/* Showcase Image Frame */}
              <div className="flex justify-center mb-5 w-full">
                <div className="relative h-64 sm:h-72 aspect-[7/10] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group-hover:shadow-xl group-hover:border-emerald-500/50 transition-all duration-300">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-[1.05] transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Category Pill */}
              <div className="mb-2.5">
                <span className="inline-block bg-emerald-100/90 text-emerald-800 font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border border-emerald-300/60 uppercase tracking-wider">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors tracking-tight">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 flex-grow">
                {service.desc}
              </p>

              <div className="pt-3 border-t border-slate-100 mt-auto">
                <Link
                  href={`/services#${service.slug}`}
                  className="w-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition flex items-center justify-center gap-1.5"
                >
                  <span>View Detailed Specifications</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Services Page Link Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-600/25 hover:scale-105 transition-all"
          >
            <span>Explore Complete Services Catalog &amp; Technical Specs</span>
            <span>⚡</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
