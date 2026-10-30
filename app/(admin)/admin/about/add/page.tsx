import { createAboutContent } from '@/lib/aboutActions';
import Link from 'next/link';

export default function AddAboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add About Us Entry</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Fill in the details to publish a new About Us configuration. Upload files directly from your computer.
          </p>
        </div>
        <Link
          href="/admin/about"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to About Us
        </Link>
      </div>

      {/* Form */}
      <form action={createAboutContent} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Section 1: Hero Banner */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>1. Hero Banner Section</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Eyebrow Tag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hero_eyebrow"
                required
                defaultValue="About New Leaf Skills • Master Studio Overview"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hero_title"
                required
                defaultValue="About Us — 22+ Years of Master Digitizing & Commercial Craftsmanship"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Hero Description Paragraph <span className="text-red-500">*</span>
            </label>
            <textarea
              name="hero_description"
              required
              rows={3}
              defaultValue="Founded in 2004, New Leaf Skills is a trusted global embroidery digitizing studio and commercial production partner. We transform complex artwork into machine-flawless stitch files engineered for zero thread breaks, high-speed multi-head runs at 1,000+ SPM, and calibrated fabric tension for 10,000+ apparel decorators across 15+ countries."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Hero Image File Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Hero Banner Image (File Upload) <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Upload the main hero banner image. Please select an image file (e.g. JPG, PNG, WebP).
            </p>
            <input
              type="file"
              name="hero_image"
              accept="image/*"
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Badge Title
              </label>
              <input
                type="text"
                name="hero_badge_title"
                defaultValue="Active Studio Production"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Badge Subtitle
              </label>
              <input
                type="text"
                name="hero_badge_sub"
                defaultValue="Industrial 12-needle Tajima & Barudan heads"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Badge Tag
              </label>
              <input
                type="text"
                name="hero_badge_tag"
                defaultValue="24/7 Live"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Studio Stats */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>2. 4 Studio Metrics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 1</span>
              <input
                type="text"
                name="stat1_icon"
                defaultValue="⏳"
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_value"
                defaultValue="22+ Years"
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_label"
                defaultValue="Studio Craftsmanship"
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_detail"
                defaultValue="Manual punching excellence since 2004"
                placeholder="Detail"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            {/* Stat 2 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 2</span>
              <input
                type="text"
                name="stat2_icon"
                defaultValue="🌍"
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_value"
                defaultValue="10,000+"
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_label"
                defaultValue="Global Clients"
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_detail"
                defaultValue="Apparel brands, shops & decorators worldwide"
                placeholder="Detail"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            {/* Stat 3 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 3</span>
              <input
                type="text"
                name="stat3_icon"
                defaultValue="🪡"
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_value"
                defaultValue="50,000+"
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_label"
                defaultValue="Sewouts Digitized"
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_detail"
                defaultValue="Tested across Tajima, Barudan & Brother"
                placeholder="Detail"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            {/* Stat 4 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 4</span>
              <input
                type="text"
                name="stat4_icon"
                defaultValue="⚡"
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_value"
                defaultValue="6–8 Hours"
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_label"
                defaultValue="Standard Turnaround"
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_detail"
                defaultValue="Fast rush service delivered in 2 hours"
                placeholder="Detail"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Intro Block */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>3. Studio Intro Block</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Intro Eyebrow
              </label>
              <input
                type="text"
                name="intro_eyebrow"
                defaultValue="✨ Artisanal Heritage & Technical Precision"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Intro Title
              </label>
              <input
                type="text"
                name="intro_title"
                defaultValue="Transforming Designs into Exceptional Embroidery for Over 22 Years"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Intro Description
            </label>
            <textarea
              name="intro_description"
              rows={3}
              defaultValue="At New Leaf Skills, embroidery digitizing is more than just vector conversion—it is an intricate craft refined through two decades of hands-on machine operation, needle physics, and fabric dynamics. We partner with contract decorators, apparel decorators, fashion labels, and embroidery factories worldwide to ensure every file runs cleanly without puckering, thread breaks, or machine downtime."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Intro Badges (One per line)
            </label>
            <textarea
              name="intro_badges"
              rows={4}
              defaultValue={`🧵 Wilcom ES e4.5 Native Punching\n🪡 Tajima DG16 by Pulse Calibrated\n⚡ 1,000+ SPM High-Speed Rating\n🎯 99.8% First-Run Approval`}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Section 4: Heritage Story */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>4. Heritage Story Section</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Eyebrow
              </label>
              <input
                type="text"
                name="story_eyebrow"
                defaultValue="📖 Studio Story & Origins"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="story_title"
                required
                defaultValue="From Local Embroidery Roots to a Global Master Digitizing Partner"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Story Paragraphs (4 paragraphs)
            </label>
            <textarea
              name="story_p1"
              rows={2}
              defaultValue="New Leaf Skills was founded in 2004 with an unwavering commitment: to provide commercial embroidery digitizing rooted in genuine shop-floor machinery experience rather than theoretical software guesswork."
              placeholder="Paragraph 1"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p2"
              rows={2}
              defaultValue="What started as an artisan embroidery workshop operating mechanical single-head machines has expanded over the past 22 years into a premier international digitizing studio serving contract apparel decorators across the United States, United Kingdom, Canada, Australia, Europe, and worldwide."
              placeholder="Paragraph 2"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p3"
              rows={2}
              defaultValue="Our studio ethos is built on a simple standard: deliver flawless manual stitch density, prevent fabric puckering, and eliminate thread breaks on every production run."
              placeholder="Paragraph 3"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p4"
              rows={2}
              defaultValue="We have digitized tens of thousands of designs across fashion retail, corporate apparel, high-relief 3D headwear, sacred ecclesiastical vestments, and athletic uniforms. As computerized multi-head machinery has advanced to 1,200+ SPM speeds, our master punchers have continually refined push-pull algorithms and underlay scaffolding to match modern production demands."
              placeholder="Paragraph 4"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Story Image Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Story Photograph (File Upload) <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Upload the photo for the heritage story card (e.g. roots-story.jpg).
            </p>
            <input
              type="file"
              name="story_image"
              accept="image/*"
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Image Badge
              </label>
              <input
                type="text"
                name="story_image_badge"
                defaultValue="Master Punching Floor • 22+ Yrs Experience"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Overlay Card Title
              </label>
              <input
                type="text"
                name="story_card_title"
                defaultValue="Micro-Loupe Stitch Inspection"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Overlay Card Subtitle
              </label>
              <input
                type="text"
                name="story_card_sub"
                defaultValue="Live sewout verification on multi-head Tajima & Barudan"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Overlay Card Badge
              </label>
              <input
                type="text"
                name="story_card_badge"
                defaultValue="99.8% Pass"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 4 Story Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 1</span>
              <input
                type="text"
                name="story_f1_title"
                defaultValue="Manual Push-Pull Calibration"
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f1_desc"
                defaultValue="Fabric-specific stitch tension for pique, fleece, twill, and caps."
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 2</span>
              <input
                type="text"
                name="story_f2_title"
                defaultValue="24/7 Global Production Shifts"
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f2_desc"
                defaultValue="Overnight files returned ready for your morning production run."
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 3</span>
              <input
                type="text"
                name="story_f3_title"
                defaultValue="Universal Format Compatibility"
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f3_desc"
                defaultValue="DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet."
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 4</span>
              <input
                type="text"
                name="story_f4_title"
                defaultValue="Zero Auto-Trace Flaws"
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f4_desc"
                defaultValue="100% human-plotted underlays and clean concealed tie-offs."
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Studio Contact & Bottom CTA */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>5. Studio Contact &amp; Bottom Call to Action</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                defaultValue="+91 99237 90520"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Email
              </label>
              <input
                type="text"
                name="contact_email"
                defaultValue="info@newleafskills.com"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Studio Operating Hours
              </label>
              <input
                type="text"
                name="contact_hours"
                defaultValue="24/7 Global Production & Live Dispatch"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bottom CTA Eyebrow
              </label>
              <input
                type="text"
                name="cta_eyebrow"
                defaultValue="✨ Ready to Upgrade Your Embroidery Quality?"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bottom CTA Title
              </label>
              <input
                type="text"
                name="cta_title"
                defaultValue="Stop Ruining Garments with Cheap Auto-Digitizing"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Bottom CTA Description
            </label>
            <textarea
              name="cta_description"
              rows={2}
              defaultValue="Partner with master digitizers who understand machine physics, thread tensions, and tight factory deadlines. Receive your first production-ready file in 6–8 hours."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                defaultValue="0"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue="1"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published on /about)</option>
                <option value="0">Inactive (Draft)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/about"
            className="px-6 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-2"
          >
            <span>Publish About Entry</span>
            <span>⚡</span>
          </button>
        </div>
      </form>
    </div>
  );
}
