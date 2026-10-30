import { getAboutById, updateAboutContent } from '@/lib/aboutActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const instant = false;

interface EditAboutPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAboutPage({ params }: EditAboutPageProps) {
  const { id } = await params;
  const about = await getAboutById(id);

  if (!about) {
    notFound();
  }

  // Pre-fill metrics
  const stats = about.stats || [];
  const stat1 = stats[0] || { value: '22+ Years', label: 'Studio Craftsmanship', detail: 'Manual punching excellence since 2004', icon: '⏳' };
  const stat2 = stats[1] || { value: '10,000+', label: 'Global Clients', detail: 'Apparel brands, shops & decorators worldwide', icon: '🌍' };
  const stat3 = stats[2] || { value: '50,000+', label: 'Sewouts Digitized', detail: 'Tested across Tajima, Barudan & Brother', icon: '🪡' };
  const stat4 = stats[3] || { value: '6–8 Hours', label: 'Standard Turnaround', detail: 'Fast rush service delivered in 2 hours', icon: '⚡' };

  // Pre-fill story features
  const features = about.story_features || [];
  const f1 = features[0] || { title: 'Manual Push-Pull Calibration', desc: 'Fabric-specific stitch tension for pique, fleece, twill, and caps.' };
  const f2 = features[1] || { title: '24/7 Global Production Shifts', desc: 'Overnight files returned ready for your morning production run.' };
  const f3 = features[2] || { title: 'Universal Format Compatibility', desc: 'DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet.' };
  const f4 = features[3] || { title: 'Zero Auto-Trace Flaws', desc: '100% human-plotted underlays and clean concealed tie-offs.' };

  const updateActionWithId = updateAboutContent.bind(null, about.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit About Us Entry #{about.id}</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Update texts, metrics, and upload replacement images directly.
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
      <form action={updateActionWithId} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
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
                defaultValue={about.hero_eyebrow}
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
                defaultValue={about.hero_title}
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
              defaultValue={about.hero_description}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Hero Image File Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Hero Banner Image (File Upload)
            </label>
            {about.hero_image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={about.hero_image}
                  alt="Current Hero Banner"
                  className="w-20 h-14 object-cover rounded-lg border"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Image</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{about.hero_image}</span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Hero Image (Optional - leaves current image if empty)
              </label>
              <input
                type="file"
                name="hero_image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Badge Title
              </label>
              <input
                type="text"
                name="hero_badge_title"
                defaultValue={about.hero_badge_title}
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
                defaultValue={about.hero_badge_sub}
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
                defaultValue={about.hero_badge_tag}
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
                defaultValue={stat1.icon}
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_value"
                defaultValue={stat1.value}
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_label"
                defaultValue={stat1.label}
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat1_detail"
                defaultValue={stat1.detail}
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
                defaultValue={stat2.icon}
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_value"
                defaultValue={stat2.value}
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_label"
                defaultValue={stat2.label}
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat2_detail"
                defaultValue={stat2.detail}
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
                defaultValue={stat3.icon}
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_value"
                defaultValue={stat3.value}
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_label"
                defaultValue={stat3.label}
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat3_detail"
                defaultValue={stat3.detail}
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
                defaultValue={stat4.icon}
                placeholder="Icon"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_value"
                defaultValue={stat4.value}
                placeholder="Value"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_label"
                defaultValue={stat4.label}
                placeholder="Label"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="stat4_detail"
                defaultValue={stat4.detail}
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
                defaultValue={about.intro_eyebrow}
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
                defaultValue={about.intro_title}
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
              defaultValue={about.intro_description}
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
              defaultValue={(about.intro_badges || []).join('\n')}
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
                defaultValue={about.story_eyebrow}
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
                defaultValue={about.story_title}
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
              defaultValue={about.story_p1}
              placeholder="Paragraph 1"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p2"
              rows={2}
              defaultValue={about.story_p2}
              placeholder="Paragraph 2"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p3"
              rows={2}
              defaultValue={about.story_p3}
              placeholder="Paragraph 3"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              name="story_p4"
              rows={2}
              defaultValue={about.story_p4}
              placeholder="Paragraph 4"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Story Image Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Story Photograph (File Upload)
            </label>
            {about.story_image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={about.story_image}
                  alt="Current Story Photo"
                  className="w-20 h-14 object-cover rounded-lg border"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Image</span>
                  <span className="text-xs text-slate-500 truncate block max-w-xs">{about.story_image}</span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Story Photo (Optional - leaves current image if empty)
              </label>
              <input
                type="file"
                name="story_image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Image Badge
              </label>
              <input
                type="text"
                name="story_image_badge"
                defaultValue={about.story_image_badge}
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
                defaultValue={about.story_card_title}
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
                defaultValue={about.story_card_sub}
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
                defaultValue={about.story_card_badge}
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
                defaultValue={f1.title}
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f1_desc"
                defaultValue={f1.desc}
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 2</span>
              <input
                type="text"
                name="story_f2_title"
                defaultValue={f2.title}
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f2_desc"
                defaultValue={f2.desc}
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 3</span>
              <input
                type="text"
                name="story_f3_title"
                defaultValue={f3.title}
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f3_desc"
                defaultValue={f3.desc}
                placeholder="Description"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
            </div>

            <div className="p-3 border rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Attribute 4</span>
              <input
                type="text"
                name="story_f4_title"
                defaultValue={f4.title}
                placeholder="Title"
                className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
              />
              <input
                type="text"
                name="story_f4_desc"
                defaultValue={f4.desc}
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
                defaultValue={about.contact_phone}
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
                defaultValue={about.contact_email}
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
                defaultValue={about.contact_hours}
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
                defaultValue={about.cta_eyebrow}
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
                defaultValue={about.cta_title}
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
              defaultValue={about.cta_description}
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
                defaultValue={about.sort_order ?? 0}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="is_active"
                defaultValue={about.is_active ? '1' : '0'}
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
            <span>Save Changes</span>
            <span>💾</span>
          </button>
        </div>
      </form>
    </div>
  );
}
