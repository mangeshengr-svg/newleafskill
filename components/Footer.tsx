'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-10 sm:py-12 px-4 sm:px-8 lg:px-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-8 sm:mb-10">

        {/* Column 1: Logo, Description & Social Icons */}
        <div className="md:col-span-5 lg:col-span-5 space-y-4">
          <Link href="/" className="inline-block" aria-label="NewLeaf Skills - Home">
            <img
              src="/logo.png"
              alt="NewLeaf Skills"
              className="h-9 sm:h-11 w-auto object-contain hover:opacity-90 transition"
            />
          </Link>
          <p className="text-slate-600 leading-relaxed text-sm max-w-md">
            NewLeafSkills provides professional embroidery digitizing and vector art services worldwide. Trusted by 10,000+ businesses for quality designs, precision stitching files, fast turnaround and reliable support.
          </p>

          {/* Social Icons */}
          <div className="pt-1">
            <h6 className="text-slate-900 font-bold uppercase tracking-wider text-xs mb-2.5">Follow Us</h6>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/newleafskills/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/newleafskillsembroidery/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/newleafskills-embroidery-digitizing-service"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@newleafskills"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Reddit */}
              <a
                href="#"
                aria-label="Reddit"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="md:col-span-3 lg:col-span-3 space-y-3">
          <h5 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Services</h5>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/services#embroidery-digitizing" className="hover:text-emerald-700 transition">
                Embroidery Digitizing
              </Link>
            </li>
            <li>
              <Link href="/services#computerized-embroidery" className="hover:text-emerald-700 transition">
                Computerized Embroidery
              </Link>
            </li>
            <li>
              <Link href="/services#vestments-embroidery" className="hover:text-emerald-700 transition">
                Vestments Embroidery
              </Link>
            </li>
            <li>
              <Link href="/services#apparel-logo-digitizing" className="hover:text-emerald-700 transition">
                Apparel Logo Digitizing
              </Link>
            </li>
            <li>
              <Link href="/services#3d-puff-digitizing" className="hover:text-emerald-700 transition">
                3D Puff Headwear
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-emerald-700 font-semibold text-emerald-800 transition">
                More...
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Connect with us */}
        <div className="md:col-span-4 lg:col-span-4 space-y-3">
          <h5 className="text-slate-900 font-bold uppercase tracking-wider text-xs">Connect with us</h5>
          <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
            <div>
              <span className="font-semibold text-slate-800">Address:</span> C/O, Chaudhari Cable Network, 1440<br />
              Near Budh Nagar, Asi Nagar Gurudwara<br />
              Nagpur, Maharashtra 440017, India
            </div>
            <div>
              📞 <span className="font-semibold text-slate-800">Phone:</span>{' '}
              <a href="tel:+919923790520" className="hover:text-emerald-700 font-medium transition">
                +91 99237 90520
              </a>
            </div>
            <div>
              ✉️ <span className="font-semibold text-slate-800">Email:</span>{' '}
              <a href="mailto:info@newleafskills.com" className="hover:text-emerald-700 font-medium transition">
                info@newleafskills.com
              </a>
            </div>
            <div>
              ⚡ <span className="font-semibold text-slate-800">Availability:</span> 24/7 Production &amp; Live Support
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 font-medium text-center sm:text-left">
        <div>
          &copy; 2026 NewLeafSkills. All Rights Reserved
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
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
