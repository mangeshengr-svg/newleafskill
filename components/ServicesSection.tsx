'use client';

import { useState } from 'react';
import Link from 'next/link';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { ServiceItem } from '@/types/service';

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export default function ServicesSection({ services: initialServices }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Fallback defaults if no services passed from database
  const fallbackServices: ServiceItem[] = [
    {
      id: 'computerized-embroidery',
      num: '01',
      slug: 'computerized-embroidery',
      title: 'Computerized Embroidery Services',
      tag: 'Industrial Machine Runs',
      badge: 'High-Volume Production',
      category: 'Computerized Stitching',
      image: '/services/computerized-embroidery.png',
      shortDesc: 'High-speed multi-head computerized embroidery for commercial apparel, corporate uniforms, and bulk garments. Engineered with calibrated stitch tensions, automatic trimming, and zero thread breaks.',
      fullDesc: [
        'High-speed multi-head computerized embroidery for commercial apparel, corporate uniforms, and bulk garments with calibrated stitch tensions, automatic trimming, and zero thread breaks.'
      ],
      keyHighlights: [
        'Industrial multi-head machine runs',
        'Multi-thread capacity up to 15 colors',
        'Physical sample sewout approval'
      ],
      subOfferings: [
        { title: 'Corporate Uniform Embroidery', desc: 'Professional logo stitching for workwear and uniforms.' }
      ],
      fabrics: ['Cotton', 'Twill', 'Polyester'],
      machineFormats: ['DST', 'PES', 'EXP'],
      turnaround: '24–48 Hours',
      revisions: '100% Free Revisions',
      targetIndustries: ['Corporate Brands', 'Apparel Manufacturers']
    },
    {
      id: 'embroidery-digitizing',
      num: '02',
      slug: 'embroidery-digitizing',
      title: 'Embroidery Digitizing Services',
      tag: 'Master Hand-Punched',
      badge: 'Worldwide Favorite • 22+ Years',
      category: 'Digitizing Services',
      image: '/services/embroidery-digitizing.png',
      shortDesc: 'Veteran hand-punching converting logos, sketches, and graphics into machine-ready files. Calibrated stitch paths, underlay stabilization, and fabric pull compensation for 1,000+ SPM speeds.',
      fullDesc: [
        'Veteran hand-punching converting logos, sketches, and graphics into machine-ready files with calibrated stitch paths, underlay stabilization, and fabric pull compensation.'
      ],
      keyHighlights: ['Over 22 years of manual digitizing', '6 to 8 hours turnaround', '100% Free revisions'],
      subOfferings: [{ title: 'Logo Digitizing', desc: 'Precision conversion of brand logos.' }],
      fabrics: ['Cotton', 'Polo Pique', 'Caps'],
      machineFormats: ['DST', 'PES', 'EXP', 'EMB'],
      turnaround: '6–8 Hours',
      revisions: '100% Free & Unlimited',
      targetIndustries: ['Embroidery Shops', 'Decorators']
    },
    {
      id: 'custom-logo-digitizing',
      num: '03',
      slug: 'custom-logo-digitizing',
      title: 'Custom Logo Digitizing',
      tag: 'Corporate & Brand Emblems',
      badge: 'Vector-to-Stitch Precision',
      category: 'Digitizing Services',
      image: '/services/custom-logo-digitizing.png',
      shortDesc: 'Transform company logos, mascot emblems, and brand insignias into clean embroidery files. Crisp micro-lettering clarity, sharp satin border outlines, and rich tatami fills that hold true to your artwork.',
      fullDesc: [
        'Transform company logos, mascot emblems, and brand insignias into clean embroidery files with crisp micro-lettering clarity, sharp satin border outlines, and rich tatami fills.'
      ],
      keyHighlights: ['Brand font kerning precision', 'Pantone matching', 'Zero distortion'],
      subOfferings: [{ title: 'Vector Art Conversion', desc: 'Flawless translation into stitch files.' }],
      fabrics: ['All Fabrics'],
      machineFormats: ['DST', 'PES', 'EXP'],
      turnaround: '6–8 Hours',
      revisions: '100% Free',
      targetIndustries: ['Agencies', 'Corporate']
    },
    {
      id: 'vestments-embroidery',
      num: '04',
      slug: 'vestments-embroidery',
      title: 'Vestments Embroidery Services',
      tag: 'Sacred & Liturgical Vestments',
      badge: 'Gold Bullion Work',
      category: 'Liturgical & Sacred',
      image: '/services/vestments-embroidery.png',
      shortDesc: 'Specialized high-density digitizing and embroidery for church vestments, ceremonial robes, altar cloths, and ecclesiastical stoles. Intricately rendered with metallic gold bullion threadwork.',
      fullDesc: [
        'Specialized high-density digitizing and embroidery for church vestments, ceremonial robes, altar cloths, and ecclesiastical stoles with metallic gold bullion threadwork.'
      ],
      keyHighlights: ['Metallic bullion threads', 'Velvet & silk calibrated', 'Ecclesiastical motifs'],
      subOfferings: [{ title: 'Chasubles & Copes', desc: 'Ornate sacred embroidery.' }],
      fabrics: ['Silk Brocade', 'Velvet', 'Linen'],
      machineFormats: ['DST', 'PES', 'EMB'],
      turnaround: '12–24 Hours',
      revisions: 'Full Refinements',
      targetIndustries: ['Churches', 'Vestment Makers']
    },
    {
      id: '3d-puff-digitizing',
      num: '05',
      slug: '3d-puff-digitizing',
      title: '3D Puff Digitizing',
      tag: 'Raised 3D Foam Relief',
      badge: 'Streetwear Specialty',
      category: 'Digitizing Services',
      image: '/services/3d-puff-digitizing.png',
      shortDesc: 'Raised 3D foam relief embroidery engineered for snapbacks, baseball caps, and athletic jackets. Programmed with high-density satin caps and perforation cuts that sever 3mm EVA foam cleanly.',
      fullDesc: [
        'Raised 3D foam relief embroidery engineered for snapbacks, baseball caps, and athletic jackets with high-density satin caps and perforation cuts.'
      ],
      keyHighlights: ['High density satin column', 'Automated perforation cuts', 'Tested on Tajima & Barudan'],
      subOfferings: [{ title: 'Snapback Letters', desc: '3D monogram across cap seams.' }],
      fabrics: ['Caps', 'Twill', 'Canvas'],
      machineFormats: ['DST', 'PES', 'EXP'],
      turnaround: '6–8 Hours',
      revisions: '100% Free',
      targetIndustries: ['Streetwear', 'Cap Brands']
    },
    {
      id: 'apparel-logo-digitizing',
      num: '06',
      slug: 'apparel-logo-digitizing',
      title: 'Apparel Logo Digitizing',
      tag: 'Apparel & Uniforms',
      badge: 'Fabric-Calibrated',
      category: 'Apparel & Uniforms',
      image: '/services/apparel-logo-services.png',
      shortDesc: 'Custom digitizing designed specifically for polo shirts, t-shirts, fleece hoodies, and corporate outerwear. Fabric-calibrated underlays eliminate puckering and garment bunching.',
      fullDesc: [
        'Custom digitizing designed specifically for polo shirts, t-shirts, fleece hoodies, and corporate outerwear with fabric-calibrated underlays that eliminate puckering.'
      ],
      keyHighlights: ['Underlays matched to stretch', 'Sharp small text', 'Zero fabric bunching'],
      subOfferings: [{ title: 'Left Chest Corporate', desc: 'Sized for business polos.' }],
      fabrics: ['Cotton Jersey', 'Polo Pique', 'Fleece'],
      machineFormats: ['DST', 'PES', 'EXP'],
      turnaround: '6–8 Hours',
      revisions: '100% Free',
      targetIndustries: ['Corporate Apparel', 'Screen Printers']
    }
  ];

  const services = initialServices && initialServices.length > 0 ? initialServices : fallbackServices;

  const handleRequestQuote = (serviceTitle: string) => {
    window.location.href = '/contact#quote';
  };

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
              key={service.slug || index}
              className="relative bg-white text-slate-800 rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-500/50 group shadow-md overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                {service.num || String(index + 1).padStart(2, '0')}
              </div>

              {/* Showcase Image Frame */}
              <div className="flex justify-center mb-5 w-full">
                <div
                  onClick={() => setSelectedService(service)}
                  className="relative h-64 sm:h-72 aspect-[7/10] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group-hover:shadow-xl group-hover:border-emerald-500/50 transition-all duration-300 cursor-pointer bg-slate-50"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-[1.05] transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md text-center border border-emerald-500/30">
                    {service.tag}
                  </div>
                </div>
              </div>

              {/* Category Pill */}
              <div className="mb-2.5">
                <span className="inline-block bg-emerald-100/90 text-emerald-800 font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border border-emerald-300/60 uppercase tracking-wider">
                  {service.tag || service.category}
                </span>
              </div>

              <h3
                onClick={() => setSelectedService(service)}
                className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors tracking-tight cursor-pointer"
              >
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 flex-grow">
                {service.shortDesc}
              </p>

              <div className="pt-3 border-t border-slate-100 mt-auto grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Quick Specs</span>
                  <span>🔍</span>
                </button>
                <Link
                  href={`/services#${service.slug}`}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-emerald-200 hover:border-emerald-300 transition flex items-center justify-center gap-1.5"
                >
                  <span>Catalog</span>
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

      {/* Interactive Service Detail Modal for Home Page */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </section>
  );
}
