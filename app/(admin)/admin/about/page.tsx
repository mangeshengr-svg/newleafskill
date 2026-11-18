import { getAggregatedAboutData } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminAboutPage() {
  const data = await getAggregatedAboutData();

  const sections = [
    {
      id: 'hero',
      title: 'Hero Banner & Metrics',
      desc: 'Top headline, eyebrow badge, studio description, hero background photo, and the 4 live metrics.',
      count: '4 Metrics',
      href: '/admin/about/hero',
      icon: '✨',
      status: data?.hero ? 'Configured' : 'Empty',
    },
    {
      id: 'story',
      title: 'Studio Story & Roots',
      desc: '22+ years heritage origin, 4 narrative paragraphs, inspection badge card, and 4 key production pillars.',
      count: `${data?.story?.story_features?.length || 4} Features`,
      href: '/admin/about/story',
      icon: '📖',
      status: data?.story ? 'Configured' : 'Empty',
    },
    {
      id: 'craftsmanship',
      title: '5-Layer Stitch Anatomy',
      desc: 'Interactive craftsmanship layers: Underlay, Push-Pull, Stitch Density, Pathing, and Tie-Off locks with technical specs.',
      count: `${data?.craftsmanship?.length || 0} Layers`,
      href: '/admin/about/craftsmanship',
      icon: '🪡',
      status: `${data?.craftsmanship?.length || 0} Active`,
    },
    {
      id: 'machines',
      title: 'Commercial Machines Explorer',
      desc: 'Brand profiles for Tajima, Barudan, Brother, Melco, HappyJapan & Ricoma with SPM, tension & formats.',
      count: `${data?.machines?.length || 0} Brands`,
      href: '/admin/about/machines',
      icon: '🖨️',
      status: `${data?.machines?.length || 0} Active`,
    },
    {
      id: 'timeline',
      title: 'Heritage Timeline Milestones',
      desc: 'Chronological timeline milestones from 2004 to present day with highlights and descriptions.',
      count: `${data?.timeline?.length || 0} Milestones`,
      href: '/admin/about/timeline',
      icon: '⏳',
      status: `${data?.timeline?.length || 0} Active`,
    },
    {
      id: 'why-choose',
      title: 'Why Choose Us Pillars',
      desc: 'Core value propositions: 100% Manual punching, zero thread break guarantee, 6-8 hr turnaround, unlimited edits.',
      count: `${data?.whyChoose?.length || 0} Pillars`,
      href: '/admin/about/why-choose',
      icon: '🎖️',
      status: `${data?.whyChoose?.length || 0} Active`,
    },
    {
      id: 'global-presence',
      title: 'Global Presence & Continents',
      desc: 'Country production percentages, flags, cities, and regional specialization tags.',
      count: `${data?.globalPresence?.length || 0} Regions`,
      href: '/admin/about/global-presence',
      icon: '🌍',
      status: `${data?.globalPresence?.length || 0} Active`,
    },
    {
      id: 'cta',
      title: 'Bottom CTA & Studio Contacts',
      desc: 'Final conversion banner, phone, email, and 24/7 global production operating hours.',
      count: 'Live Contacts',
      href: '/admin/about/cta',
      icon: '⚡',
      status: data?.cta ? 'Configured' : 'Empty',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏢</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">About Us Management Dashboard</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            The About Us page is split into clean, dedicated section modules so you can edit each part independently without large cluttered forms.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <span>Preview Live /about</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Grid of About Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                  {sec.icon}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {sec.status}
                </span>
              </div>
              <h3 className="font-outfit font-black text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                {sec.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {sec.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">
                {sec.count}
              </span>
              <Link
                href={sec.href}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition"
              >
                <span>Manage</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
