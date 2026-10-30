import { createContactContent } from '@/lib/contactActions';
import Link from 'next/link';

export default function AddContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Contact &amp; Quote Content</h1>
          <p className="text-slate-500 text-xs mt-1">
            Configure contact page details, home quote section, direct hotline cards, and studio workshop photographs.
          </p>
        </div>
        <Link
          href="/admin/contact"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Contact List
        </Link>
      </div>

      {/* Add Form */}
      <form action={createContactContent} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        {/* SECTION 1: Status & Sort Order */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Status &amp; Order
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue="1"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published)</option>
                <option value="0">Inactive (Draft / Hidden)</option>
              </select>
            </div>
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
          </div>
        </div>

        {/* SECTION 2: Home Page Contact Section (Quote & FAQ Section) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">🏠</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              2. Home Page Quote Section Text
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Home Badge</label>
              <input
                type="text"
                name="home_badge"
                defaultValue="Fast Response Studio"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Home Main Heading</label>
              <input
                type="text"
                name="home_heading"
                defaultValue="Get Your Free Quote & Sewout Estimate"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Home Description</label>
            <textarea
              name="home_description"
              rows={2}
              defaultValue="Upload your design file and receive an exact price quote, stitch count estimate, and digital preview in 30 minutes."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Home FAQ Header &amp; Instant Answer Card</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">FAQ Eyebrow Badge</label>
                <input
                  type="text"
                  name="home_faq_badge"
                  defaultValue="Got Questions?"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">FAQ Section Heading</label>
                <input
                  type="text"
                  name="home_faq_heading"
                  defaultValue="Frequently Asked Questions"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">FAQ Subtitle</label>
                <input
                  type="text"
                  name="home_faq_desc"
                  defaultValue="Everything you need to know about our digitizing process, machines, file formats & turnaround."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instant Support Box Title</label>
                <input
                  type="text"
                  name="home_support_title"
                  defaultValue="Need an Instant Answer?"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instant Support Box Subtitle</label>
                <input
                  type="text"
                  name="home_support_desc"
                  defaultValue="Our digitizers are active 24/7 on WhatsApp & live chat"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Support Phone</label>
                <input
                  type="text"
                  name="home_support_phone"
                  defaultValue="+91 99237 90520"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Support Email</label>
                <input
                  type="text"
                  name="home_support_email"
                  defaultValue="info@newleafskills.com"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Contact Page Hero Banner (Image Upload - No Path input) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">🖼️</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              3. Contact Page Top Banner &amp; Image
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Banner Background Photograph (File Upload)
            </label>
            <p className="text-[11px] text-slate-500">
              Upload top banner background image (Recommended: 1920x600 or 16:9 widescreen).
            </p>
            <input
              type="file"
              name="hero_bg_image"
              accept="image/*"
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner Pill Badge</label>
              <input
                type="text"
                name="hero_badge"
                defaultValue="24/7 Global Commercial Punching Studio"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
              <input
                type="text"
                name="hero_title"
                defaultValue="Contact"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Title Accent</label>
              <input
                type="text"
                name="hero_title_accent"
                defaultValue="Inquiries & Quotes"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Banner Subtitle Description</label>
            <textarea
              name="hero_description"
              rows={2}
              defaultValue="Connect with our master digitizers. Request free sew-out tests, stitch count estimates, or discuss custom commercial contracts 24/7."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* SECTION 4: Contact Intro & Trust Highlights */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              4. Contact Intro Section &amp; Trust Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Pill Badge</label>
              <input
                type="text"
                name="intro_badge"
                defaultValue="⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Prefix</label>
              <input
                type="text"
                name="intro_title_prefix"
                defaultValue="Contact Us :"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Highlighted (Green)</label>
              <input
                type="text"
                name="intro_title_highlight"
                defaultValue="We Love to Hear"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Suffix</label>
              <input
                type="text"
                name="intro_title_suffix"
                defaultValue="From Our Customers"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Intro Paragraph Text</label>
            <textarea
              name="intro_description"
              rows={3}
              defaultValue="We love to hear from our customers. Please feel free to contact us with any questions you may have. Whether you are an embroidery shop, apparel brand, or custom decorator, our master punchers are here 24/7. Send us your artwork, request a free sew-out estimate, or consult with our commercial punching specialists anytime."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trust Highlights Pills (One per line)</label>
            <textarea
              name="trust_highlights"
              rows={4}
              defaultValue={`6–8h Standard Turnaround\n2-Hour Rush Available\nZero Thread Break Guarantee\n10,000+ Happy Embroidery Shops`}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* SECTION 5: Direct Contact Channels Cards (4 Cards) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">📇</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              5. Four Direct Contact Channel Cards
            </h3>
          </div>

          {/* Card 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-emerald-800">Card 1: Phone Hotline</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Title</label>
                <input type="text" name="card_1_title" defaultValue="Phone & Live Hotline" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_1_badge" defaultValue="Instant Response" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_1_icon" defaultValue="📞" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_1_desc" defaultValue="Speak directly with our studio manager or production supervisor." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_1_primary" defaultValue="+91 99237 90520 (India HQ)" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_1_secondary" defaultValue="+91 99237 90520 (US Toll-Free)" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_1_action_text" defaultValue="Call India Studio" placeholder="Text" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_1_action_href" defaultValue="tel:+919923790520" placeholder="Href" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-emerald-800">Card 2: Email Desk</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Title</label>
                <input type="text" name="card_2_title" defaultValue="Official Email Inquiries" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_2_badge" defaultValue="15-Min Reply" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_2_icon" defaultValue="✉️" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_2_desc" defaultValue="Send artwork, mockups, or custom quotation specifications." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_2_primary" defaultValue="info@newleafskills.com" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_2_secondary" defaultValue="newleafskills@gmail.com" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_2_action_text" defaultValue="Send Email" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_2_action_href" defaultValue="mailto:info@newleafskills.com" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-emerald-800">Card 3: Physical Studio HQ</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Title</label>
                <input type="text" name="card_3_title" defaultValue="Production Studio & HQ" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_3_badge" defaultValue="Nagpur Hub" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_3_icon" defaultValue="📍" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_3_desc" defaultValue="Our physical digitization facility & computerized testing lab." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_3_primary" defaultValue="1440 Near Budh Nagar, Asi Nagar" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_3_secondary" defaultValue="Nagpur, Maharashtra 440017, India" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_3_action_text" defaultValue="Open in Maps" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_3_action_href" defaultValue="https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-emerald-800">Card 4: Shift Hours &amp; WhatsApp</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Title</label>
                <input type="text" name="card_4_title" defaultValue="Studio Production Hours" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_4_badge" defaultValue="24/7 Active" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_4_icon" defaultValue="⚡" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_4_desc" defaultValue="Non-stop production shifts serving US, UK, Europe & India." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_4_primary" defaultValue="24 Hours / 7 Days a Week" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_4_secondary" defaultValue="Turnaround: 6–8 hrs (Rush: 2 hrs)" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_4_action_text" defaultValue="WhatsApp Quick Chat" className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_4_action_href" defaultValue="https://wa.me/919923790520?text=Hi%20NewLeaf%20Skills,%20I%20have%20an%20embroidery%20digitizing%20inquiry." className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Studio Showcase Photographs (File Upload Inputs - No Path) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">📸</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              6. Studio Showcase Photographs (File Uploads)
            </h3>
          </div>

          {/* Photo 1 */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Studio Showcase Photo 1 (Tajima &amp; Barudan Lab)
            </label>
            <input
              type="file"
              name="studio_image_1"
              accept="image/*"
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Title</label>
                <input type="text" name="studio_title_1" defaultValue="Tajima & Barudan Commercial Sew-out Lab" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Overlay Badge</label>
                <input type="text" name="studio_badge_1" defaultValue="Live Digitizing Studio" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Caption</label>
                <input type="text" name="studio_desc_1" defaultValue="Hand-punched stitch paths tested on real machines before customer dispatch." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat 1</label>
                <input type="text" name="studio_stat_1" defaultValue="22+ Years" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat Sub</label>
                <input type="text" name="studio_stat_sub_1" defaultValue="Manual Punching" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat Tag</label>
                <input type="text" name="studio_stat_tag_1" defaultValue="1,000 SPM Calibrated" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Studio Showcase Photo 2 (Inspection Specialist Loupe)
            </label>
            <input
              type="file"
              name="studio_image_2"
              accept="image/*"
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Badge</label>
                <input type="text" name="studio_badge_2" defaultValue="Quality Inspection Desk" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Title</label>
                <input type="text" name="studio_title_2" defaultValue="Dedicated Punching Supervisors On Duty" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Description</label>
                <input type="text" name="studio_desc_2" defaultValue="Every stitch angle, pull compensation, and tie-off is inspected with a 10x magnifier to guarantee zero thread breaks." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          {/* Emergency Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Emergency Messenger Box (WhatsApp CTA)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="urgent_badge" defaultValue="⚡ Instant Studio Messenger" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Heading</label>
                <input type="text" name="urgent_heading" defaultValue="Need Emergency Rush Digitizing or Urgent Revision?" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="urgent_desc" defaultValue="Message our shift supervisor directly on WhatsApp or call our hotline for an immediate turnaround slot." className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">WhatsApp Button Text</label>
                <input type="text" name="urgent_whatsapp_text" defaultValue="💬 Chat on WhatsApp (+91 9923790520)" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">WhatsApp Number</label>
                <input type="text" name="urgent_whatsapp_number" defaultValue="+91 9923790520" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Call Button Text</label>
                <input type="text" name="urgent_call_text" defaultValue="📞 Call Studio" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Call Number</label>
                <input type="text" name="urgent_call_number" defaultValue="+91 9923790520" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: Office Address & Google Maps */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">📍</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              7. Studio Location, Address &amp; Google Map
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Map Section Eyebrow</label>
              <input type="text" name="map_badge" defaultValue="Studio Location" className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Map Heading</label>
              <input type="text" name="map_heading" defaultValue="Visit Our Digitization & Test Production Facility" className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Map Subtitle</label>
              <input type="text" name="map_desc" defaultValue="Situated in Nagpur, Maharashtra, our facility houses multi-head commercial machines, Wilcom & Pulse digitizing suites, and our 24/7 client dispatch crew." className="w-full p-3 border rounded-xl text-xs" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Physical Address Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Office Name</label>
                <input type="text" name="office_name" defaultValue="NewLeaf Skills Studio" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Address Line 1</label>
                <input type="text" name="office_line1" defaultValue="C/O, Chaudhari Cable Network, 1440" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Address Line 2</label>
                <input type="text" name="office_line2" defaultValue="Near Budh Nagar, Asi Nagar Gurudwara" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">City, State &amp; Zip</label>
                <input type="text" name="office_city_state" defaultValue="Nagpur, Maharashtra 440017" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Country</label>
                <input type="text" name="office_country" defaultValue="India" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone (Raw / Tel)</label>
                <input type="text" name="office_phone" defaultValue="+91 9923790520" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone (Formatted Display)</label>
                <input type="text" name="office_phone_formatted" defaultValue="+91 99237 90520" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Official Email</label>
                <input type="text" name="office_email" defaultValue="info@newleafskills.com" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Operating Hours</label>
                <input type="text" name="office_hours" defaultValue="24/7 Round-the-clock" className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Embed URL (iframe src)</label>
              <textarea
                name="map_embed_url"
                rows={2}
                defaultValue="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0906325510617!2d79.1176211758781!3d21.188556582236353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c70034d650ff%3A0xc39bc6dfa42bf43!2sCodereva%20-%20AI%20and%20Software%20Development%20Company!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Directions Link (Google Maps navigation href)</label>
              <input
                type="text"
                name="map_directions_url"
                defaultValue="https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 8: Contact Page FAQ & CTA Box */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">❓</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              8. Contact Page FAQ Header &amp; Bottom Help Box
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Eyebrow Badge</label>
              <input type="text" name="faq_badge" defaultValue="Got Questions?" className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Heading</label>
              <input type="text" name="faq_heading" defaultValue="Frequently Asked Questions About Contacting Us" className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Description</label>
              <input type="text" name="faq_description" defaultValue="Everything you need to know about placing inquiries, turnarounds, machine sewouts, and revisions." className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bottom Help Box Title</label>
              <input type="text" name="faq_cta_heading" defaultValue="Don’t see what you are looking for?" className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bottom Help Box Description</label>
              <input type="text" name="faq_cta_desc" defaultValue="Our embroidery digitizers are standing by 24/7. Reach out via email or call our direct hotline for customized commercial quotes." className="w-full p-3 border rounded-xl text-xs" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link
            href="/admin/contact"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Save Contact Content
          </button>
        </div>

      </form>
    </div>
  );
}

