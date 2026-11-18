import { getAboutHero, updateAboutHero } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminAboutHeroPage() {
  const hero = await getAboutHero();

  const stats = hero?.stats || [];
  const stat1 = stats[0] || { value: '22+ Years', label: 'Studio Craftsmanship', detail: 'Manual punching excellence since 2004', icon: '⏳' };
  const stat2 = stats[1] || { value: '10,000+', label: 'Global Clients', detail: 'Apparel brands, shops & decorators worldwide', icon: '🌍' };
  const stat3 = stats[2] || { value: '50,000+', label: 'Sewouts Digitized', detail: 'Tested across Tajima, Barudan & Brother', icon: '🪡' };
  const stat4 = stats[3] || { value: '6–8 Hours', label: 'Standard Turnaround', detail: 'Fast rush service delivered in 2 hours', icon: '⚡' };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hero Banner & Metrics</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Manage top banner eyebrow, title, description, image, production badge, and 4 studio metrics.
          </p>
        </div>
        <Link
          href="/admin/about"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Sections
        </Link>
      </div>

      <form action={updateAboutHero} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Hero Content
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
                defaultValue={hero?.hero_eyebrow || 'About New Leaf Skills • Master Studio Overview'}
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
                defaultValue={hero?.hero_title || 'About Us — 22+ Years of Master Digitizing & Commercial Craftsmanship'}
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
              rows={4}
              defaultValue={hero?.hero_description || ''}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Hero Image Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Hero Banner Image
            </label>
            {hero?.hero_image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img
                  src={hero.hero_image}
                  alt="Current Hero Banner"
                  className="w-20 h-14 object-cover rounded-lg border"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Image</span>
                  <span className="text-xs text-slate-500 truncate block max-w-md">{hero.hero_image}</span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Upload New Hero Image (Optional)
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
                Badge Title
              </label>
              <input
                type="text"
                name="hero_badge_title"
                defaultValue={hero?.hero_badge_title || 'Active Studio Production'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge Subtitle
              </label>
              <input
                type="text"
                name="hero_badge_sub"
                defaultValue={hero?.hero_badge_sub || 'Industrial 12-needle Tajima & Barudan heads'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge Tag
              </label>
              <input
                type="text"
                name="hero_badge_tag"
                defaultValue={hero?.hero_badge_tag || '24/7 Live'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 4 Metrics */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Four Live Studio Metrics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 1</span>
              <input type="text" name="stat1_icon" defaultValue={stat1.icon} placeholder="Icon" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat1_value" defaultValue={stat1.value} placeholder="Value (e.g. 22+ Years)" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <input type="text" name="stat1_label" defaultValue={stat1.label} placeholder="Label" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat1_detail" defaultValue={stat1.detail} placeholder="Detail" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            {/* Stat 2 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 2</span>
              <input type="text" name="stat2_icon" defaultValue={stat2.icon} placeholder="Icon" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat2_value" defaultValue={stat2.value} placeholder="Value (e.g. 10,000+)" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <input type="text" name="stat2_label" defaultValue={stat2.label} placeholder="Label" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat2_detail" defaultValue={stat2.detail} placeholder="Detail" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            {/* Stat 3 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 3</span>
              <input type="text" name="stat3_icon" defaultValue={stat3.icon} placeholder="Icon" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat3_value" defaultValue={stat3.value} placeholder="Value (e.g. 50,000+)" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <input type="text" name="stat3_label" defaultValue={stat3.label} placeholder="Label" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat3_detail" defaultValue={stat3.detail} placeholder="Detail" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            {/* Stat 4 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Metric 4</span>
              <input type="text" name="stat4_icon" defaultValue={stat4.icon} placeholder="Icon" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat4_value" defaultValue={stat4.value} placeholder="Value (e.g. 6–8 Hours)" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <input type="text" name="stat4_label" defaultValue={stat4.label} placeholder="Label" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
              <input type="text" name="stat4_detail" defaultValue={stat4.detail} placeholder="Detail" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link
            href="/admin/about"
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Save Hero Banner
          </button>
        </div>
      </form>
    </div>
  );
}

