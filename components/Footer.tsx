'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-12 px-4 sm:px-8 lg:px-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

        {/* Brand info with logo */}
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="inline-block" aria-label="NewLeaf Skills - Home">
            <img
              src="/logo.png"
              alt="NewLeaf Skills - Master Digitizing Studio"
              className="h-10 sm:h-12 w-auto object-contain hover:opacity-90 transition"
            />
          </Link>
          <p className="text-slate-600 max-w-sm leading-relaxed text-sm">
            Professional manual embroidery digitizing &amp; vector art services. Trusted by 10,000+ embroidery shops, garment decorators, and apparel manufacturers globally.
          </p>
          <div className="text-slate-700 font-semibold space-y-1">
            <div>📞 Phone: +91 99237 90520</div>
            <div>✉️ Email: info@newleafskills.com</div>
            <div>⚡ Studio Hours: 24/7 Production &amp; Live Support</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h5 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Navigation &amp; Services</h5>
          <ul className="space-y-2 font-medium">
            <li><Link href="/about" className="hover:text-emerald-700 transition font-extrabold text-emerald-800">🏛️ About NewLeaf Skills (22+ Yrs)</Link></li>
            <li><Link href="/services" className="hover:text-emerald-700 transition font-bold text-emerald-800">⚡ All Services &amp; Solutions</Link></li>
            <li><Link href="/our-work" className="hover:text-emerald-700 transition font-bold text-emerald-800">✨ Our Work Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-700 transition font-bold text-emerald-800">📖 Blog &amp; Digitizing Guides</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-700 transition font-bold text-emerald-800">📞 Contact &amp; Studio Inquiry</Link></li>
            <li><Link href="/services#embroidery-digitizing" className="hover:text-emerald-700 transition">Embroidery Digitizing</Link></li>
            <li><Link href="/services#computerized-embroidery" className="hover:text-emerald-700 transition">Computerized Embroidery</Link></li>
            <li><Link href="/services#vestments-embroidery" className="hover:text-emerald-700 transition">Vestments Embroidery</Link></li>
            <li><Link href="/services#apparel-logo-digitizing" className="hover:text-emerald-700 transition">Apparel Logo Digitizing</Link></li>
            <li><Link href="/services#3d-puff-digitizing" className="hover:text-emerald-700 transition">3D Puff Headwear</Link></li>
          </ul>
        </div>

        {/* Guarantee & Formats */}
        <div className="space-y-3">
          <h5 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Assurance</h5>
          <ul className="space-y-2 font-medium text-slate-700">
            <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> 6–8 Hour Standard Turnaround</li>
            <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> 100% Unlimited Free Revisions</li>
            <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Zero Thread Breaks Guarantee</li>
            <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> Tajima, Barudan, Brother, Melco</li>
            <li className="flex items-center gap-1.5"><span className="text-emerald-600">✓</span> PDF Color Sewout Worksheet</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4 text-slate-500 font-medium">
        <div>
          &copy; 2026 NewLeaf Skills Studio. All rights reserved. Professional Embroidery Digitizing &amp; Vector Art.
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <Link href="/about" className="hover:text-emerald-700 font-semibold text-emerald-800">About</Link>
          <Link href="/services" className="hover:text-emerald-700">Services</Link>
          <Link href="/our-work" className="hover:text-emerald-700">Our Work</Link>
          <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
          <Link href="/contact" className="hover:text-emerald-700 font-semibold text-emerald-800">Contact</Link>
          <Link href="/contact#quote" className="text-emerald-700 font-bold hover:underline">Instant Quote</Link>
        </div>
      </div>
    </footer>
  );
}

