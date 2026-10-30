import { getContactById, updateContactContent } from '@/lib/contactActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) notFound();

  const item = await getContactById(id);
  if (!item) notFound();

  let parsedHighlights: string[] = [];
  try {
    parsedHighlights = typeof item.trust_highlights === 'string' ? JSON.parse(item.trust_highlights) : item.trust_highlights;
  } catch {
    parsedHighlights = [];
  }
  const highlightsString = Array.isArray(parsedHighlights) ? parsedHighlights.join('\n') : '';

  let parsedCards: any[] = [];
  try {
    parsedCards = typeof item.contact_cards === 'string' ? JSON.parse(item.contact_cards) : item.contact_cards;
  } catch {
    parsedCards = [];
  }

  const c1 = parsedCards[0] || {
    title: 'Phone & Live Hotline',
    badge: 'Instant Response',
    icon: '📞',
    description: 'Speak directly with our studio manager or production supervisor.',
    primaryDetail: '+91 99237 90520 (India HQ)',
    secondaryDetail: '+91 99237 90520 (US Toll-Free)',
    actionText: 'Call India Studio',
    actionHref: 'tel:+919923790520',
  };

  const c2 = parsedCards[1] || {
    title: 'Official Email Inquiries',
    badge: '15-Min Reply',
    icon: '✉️',
    description: 'Send artwork, mockups, or custom quotation specifications.',
    primaryDetail: 'info@newleafskills.com',
    secondaryDetail: 'newleafskills@gmail.com',
    actionText: 'Send Email',
    actionHref: 'mailto:info@newleafskills.com',
  };

  const c3 = parsedCards[2] || {
    title: 'Production Studio & HQ',
    badge: 'Nagpur Hub',
    icon: '📍',
    description: 'Our physical digitization facility & computerized testing lab.',
    primaryDetail: '1440 Near Budh Nagar, Asi Nagar',
    secondaryDetail: 'Nagpur, Maharashtra 440017, India',
    actionText: 'Open in Maps',
    actionHref: 'https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6',
  };

  const c4 = parsedCards[3] || {
    title: 'Studio Production Hours',
    badge: '24/7 Active',
    icon: '⚡',
    description: 'Non-stop production shifts serving US, UK, Europe & India.',
    primaryDetail: '24 Hours / 7 Days a Week',
    secondaryDetail: 'Turnaround: 6–8 hrs (Rush: 2 hrs)',
    actionText: 'WhatsApp Quick Chat',
    actionHref: 'https://wa.me/919923790520?text=Hi%20NewLeaf%20Skills,%20I%20have%20an%20embroidery%20digitizing%20inquiry.',
  };

  const updateAction = updateContactContent.bind(null, item.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Contact &amp; Quote Content #{item.id}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update contact page text, home quote section, direct hotline cards, and studio workshop photographs.
          </p>
        </div>
        <Link
          href="/admin/contact"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Contact List
        </Link>
      </div>

      {/* Edit Form */}
      <form action={updateAction} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Hidden Existing Image Paths */}
        <input type="hidden" name="existing_hero_bg_image" value={item.hero_bg_image || '/contact/studio-hero.jpg'} />
        <input type="hidden" name="existing_studio_image_1" value={item.studio_image_1 || '/contact/studio-hero.jpg'} />
        <input type="hidden" name="existing_studio_image_2" value={item.studio_image_2 || '/contact/support-specialist.jpg'} />

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
                defaultValue={item.is_active ? '1' : '0'}
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
                defaultValue={item.sort_order ?? 0}
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
                defaultValue={item.home_badge || 'Fast Response Studio'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Home Main Heading</label>
              <input
                type="text"
                name="home_heading"
                defaultValue={item.home_heading || 'Get Your Free Quote & Sewout Estimate'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Home Description</label>
            <textarea
              name="home_description"
              rows={2}
              defaultValue={item.home_description || ''}
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
                  defaultValue={item.home_faq_badge || 'Got Questions?'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">FAQ Section Heading</label>
                <input
                  type="text"
                  name="home_faq_heading"
                  defaultValue={item.home_faq_heading || 'Frequently Asked Questions'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">FAQ Subtitle</label>
                <input
                  type="text"
                  name="home_faq_desc"
                  defaultValue={item.home_faq_desc || ''}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instant Support Box Title</label>
                <input
                  type="text"
                  name="home_support_title"
                  defaultValue={item.home_support_title || 'Need an Instant Answer?'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instant Support Box Subtitle</label>
                <input
                  type="text"
                  name="home_support_desc"
                  defaultValue={item.home_support_desc || ''}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Support Phone</label>
                <input
                  type="text"
                  name="home_support_phone"
                  defaultValue={item.home_support_phone || '+91 99237 90520'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Support Email</label>
                <input
                  type="text"
                  name="home_support_email"
                  defaultValue={item.home_support_email || 'info@newleafskills.com'}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Contact Page Hero Banner (Image Upload with Preview) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base">🖼️</span>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex-1">
              3. Contact Page Top Banner &amp; Image
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Banner Background Photograph (File Upload)
            </label>

            {item.hero_bg_image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={item.hero_bg_image}
                  alt={item.hero_title}
                  className="w-24 h-14 object-cover rounded-lg border border-slate-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Banner</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{item.hero_bg_image}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Banner Photo (Optional - replaces current photo)
              </label>
              <input
                type="file"
                name="hero_bg_image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner Pill Badge</label>
              <input
                type="text"
                name="hero_badge"
                defaultValue={item.hero_badge || '24/7 Global Commercial Punching Studio'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
              <input
                type="text"
                name="hero_title"
                defaultValue={item.hero_title || 'Contact'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Title Accent</label>
              <input
                type="text"
                name="hero_title_accent"
                defaultValue={item.hero_title_accent || 'Inquiries & Quotes'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Banner Subtitle Description</label>
            <textarea
              name="hero_description"
              rows={2}
              defaultValue={item.hero_description || ''}
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
                defaultValue={item.intro_badge || '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Prefix</label>
              <input
                type="text"
                name="intro_title_prefix"
                defaultValue={item.intro_title_prefix || 'Contact Us :'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Highlighted (Green)</label>
              <input
                type="text"
                name="intro_title_highlight"
                defaultValue={item.intro_title_highlight || 'We Love to Hear'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading Suffix</label>
              <input
                type="text"
                name="intro_title_suffix"
                defaultValue={item.intro_title_suffix || 'From Our Customers'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Intro Paragraph Text</label>
            <textarea
              name="intro_description"
              rows={3}
              defaultValue={item.intro_description || ''}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trust Highlights Pills (One per line)</label>
            <textarea
              name="trust_highlights"
              rows={4}
              defaultValue={highlightsString}
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
                <input type="text" name="card_1_title" defaultValue={c1.title} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_1_badge" defaultValue={c1.badge} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_1_icon" defaultValue={c1.icon} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_1_desc" defaultValue={c1.description} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_1_primary" defaultValue={c1.primaryDetail} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_1_secondary" defaultValue={c1.secondaryDetail || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_1_action_text" defaultValue={c1.actionText} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_1_action_href" defaultValue={c1.actionHref} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
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
                <input type="text" name="card_2_title" defaultValue={c2.title} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_2_badge" defaultValue={c2.badge} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_2_icon" defaultValue={c2.icon} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_2_desc" defaultValue={c2.description} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_2_primary" defaultValue={c2.primaryDetail} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_2_secondary" defaultValue={c2.secondaryDetail || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_2_action_text" defaultValue={c2.actionText} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_2_action_href" defaultValue={c2.actionHref} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
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
                <input type="text" name="card_3_title" defaultValue={c3.title} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_3_badge" defaultValue={c3.badge} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_3_icon" defaultValue={c3.icon} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_3_desc" defaultValue={c3.description} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_3_primary" defaultValue={c3.primaryDetail} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_3_secondary" defaultValue={c3.secondaryDetail || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_3_action_text" defaultValue={c3.actionText} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_3_action_href" defaultValue={c3.actionHref} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
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
                <input type="text" name="card_4_title" defaultValue={c4.title} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="card_4_badge" defaultValue={c4.badge} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Icon</label>
                <input type="text" name="card_4_icon" defaultValue={c4.icon} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="card_4_desc" defaultValue={c4.description} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Detail</label>
                <input type="text" name="card_4_primary" defaultValue={c4.primaryDetail} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Secondary Detail</label>
                <input type="text" name="card_4_secondary" defaultValue={c4.secondaryDetail || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Button Text &amp; Href</label>
                <div className="flex gap-2">
                  <input type="text" name="card_4_action_text" defaultValue={c4.actionText} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
                  <input type="text" name="card_4_action_href" defaultValue={c4.actionHref} className="w-1/2 p-2.5 border rounded-xl text-xs bg-white" />
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

            {item.studio_image_1 && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={item.studio_image_1}
                  alt={item.studio_title_1}
                  className="w-24 h-14 object-cover rounded-lg border border-slate-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Photo 1</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{item.studio_image_1}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Photo 1 (Optional - replaces current photo)
              </label>
              <input
                type="file"
                name="studio_image_1"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Title</label>
                <input type="text" name="studio_title_1" defaultValue={item.studio_title_1 || 'Tajima & Barudan Commercial Sew-out Lab'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Overlay Badge</label>
                <input type="text" name="studio_badge_1" defaultValue={item.studio_badge_1 || 'Live Digitizing Studio'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 1 Caption</label>
                <input type="text" name="studio_desc_1" defaultValue={item.studio_desc_1 || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat 1</label>
                <input type="text" name="studio_stat_1" defaultValue={item.studio_stat_1 || '22+ Years'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat Sub</label>
                <input type="text" name="studio_stat_sub_1" defaultValue={item.studio_stat_sub_1 || 'Manual Punching'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Telemetry Stat Tag</label>
                <input type="text" name="studio_stat_tag_1" defaultValue={item.studio_stat_tag_1 || '1,000 SPM Calibrated'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Studio Showcase Photo 2 (Inspection Specialist Loupe)
            </label>

            {item.studio_image_2 && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={item.studio_image_2}
                  alt={item.studio_title_2}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Photo 2</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{item.studio_image_2}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Photo 2 (Optional - replaces current photo)
              </label>
              <input
                type="file"
                name="studio_image_2"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Badge</label>
                <input type="text" name="studio_badge_2" defaultValue={item.studio_badge_2 || 'Quality Inspection Desk'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Title</label>
                <input type="text" name="studio_title_2" defaultValue={item.studio_title_2 || 'Dedicated Punching Supervisors On Duty'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Photo 2 Description</label>
                <input type="text" name="studio_desc_2" defaultValue={item.studio_desc_2 || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          {/* Emergency Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Emergency Messenger Box (WhatsApp CTA)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge</label>
                <input type="text" name="urgent_badge" defaultValue={item.urgent_badge || '⚡ Instant Studio Messenger'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Heading</label>
                <input type="text" name="urgent_heading" defaultValue={item.urgent_heading || 'Need Emergency Rush Digitizing or Urgent Revision?'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <input type="text" name="urgent_desc" defaultValue={item.urgent_desc || ''} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">WhatsApp Button Text</label>
                <input type="text" name="urgent_whatsapp_text" defaultValue={item.urgent_whatsapp_text || '💬 Chat on WhatsApp (+91 9923790520)'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">WhatsApp Number</label>
                <input type="text" name="urgent_whatsapp_number" defaultValue={item.urgent_whatsapp_number || '+91 9923790520'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Call Button Text</label>
                <input type="text" name="urgent_call_text" defaultValue={item.urgent_call_text || '📞 Call Studio'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Call Number</label>
                <input type="text" name="urgent_call_number" defaultValue={item.urgent_call_number || '+91 9923790520'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
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
              <input type="text" name="map_badge" defaultValue={item.map_badge || 'Studio Location'} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Map Heading</label>
              <input type="text" name="map_heading" defaultValue={item.map_heading || 'Visit Our Digitization & Test Production Facility'} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Map Subtitle</label>
              <input type="text" name="map_desc" defaultValue={item.map_desc || ''} className="w-full p-3 border rounded-xl text-xs" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <span className="text-xs font-bold text-slate-800">Physical Address Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Office Name</label>
                <input type="text" name="office_name" defaultValue={item.office_name || 'NewLeaf Skills Studio'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Address Line 1</label>
                <input type="text" name="office_line1" defaultValue={item.office_line1 || 'C/O, Chaudhari Cable Network, 1440'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Address Line 2</label>
                <input type="text" name="office_line2" defaultValue={item.office_line2 || 'Near Budh Nagar, Asi Nagar Gurudwara'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">City, State &amp; Zip</label>
                <input type="text" name="office_city_state" defaultValue={item.office_city_state || 'Nagpur, Maharashtra 440017'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Country</label>
                <input type="text" name="office_country" defaultValue={item.office_country || 'India'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone (Raw / Tel)</label>
                <input type="text" name="office_phone" defaultValue={item.office_phone || '+91 9923790520'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone (Formatted Display)</label>
                <input type="text" name="office_phone_formatted" defaultValue={item.office_phone_formatted || '+91 99237 90520'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Official Email</label>
                <input type="text" name="office_email" defaultValue={item.office_email || 'info@newleafskills.com'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Operating Hours</label>
                <input type="text" name="office_hours" defaultValue={item.office_hours || '24/7 Round-the-clock'} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Embed URL (iframe src)</label>
              <textarea
                name="map_embed_url"
                rows={2}
                defaultValue={item.map_embed_url || ''}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Directions Link (Google Maps navigation href)</label>
              <input
                type="text"
                name="map_directions_url"
                defaultValue={item.map_directions_url || ''}
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
              <input type="text" name="faq_badge" defaultValue={item.faq_badge || 'Got Questions?'} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Heading</label>
              <input type="text" name="faq_heading" defaultValue={item.faq_heading || 'Frequently Asked Questions About Contacting Us'} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Description</label>
              <input type="text" name="faq_description" defaultValue={item.faq_description || ''} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bottom Help Box Title</label>
              <input type="text" name="faq_cta_heading" defaultValue={item.faq_cta_heading || 'Don’t see what you are looking for?'} className="w-full p-3 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bottom Help Box Description</label>
              <input type="text" name="faq_cta_desc" defaultValue={item.faq_cta_desc || ''} className="w-full p-3 border rounded-xl text-xs" />
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
            Update Contact Content
          </button>
        </div>

      </form>
    </div>
  );
}

