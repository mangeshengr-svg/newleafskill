import { getAboutStory, updateAboutStory } from '@/lib/aboutSplitActions';
import Link from 'next/link';

export const instant = false;

export default async function AdminAboutStoryPage() {
  const story = await getAboutStory();

  const features = story?.story_features || [];
  const f1 = features[0] || { title: 'Manual Push-Pull Calibration', desc: 'Fabric-specific stitch tension for pique, fleece, twill, and caps.' };
  const f2 = features[1] || { title: '24/7 Global Production Shifts', desc: 'Overnight files returned ready for your morning production run.' };
  const f3 = features[2] || { title: 'Universal Format Compatibility', desc: 'DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet.' };
  const f4 = features[3] || { title: 'Zero Auto-Trace Flaws', desc: '100% human-plotted underlays and clean concealed tie-offs.' };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Studio Story & Origins</h1>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Manage the studio introduction block, 4 narrative story paragraphs, workshop picture, inspection card, and 4 pillars.
          </p>
        </div>
        <Link
          href="/admin/about"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Sections
        </Link>
      </div>

      <form action={updateAboutStory} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        {/* Intro Block */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Studio Intro Highlight Block
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Eyebrow</label>
              <input
                type="text"
                name="intro_eyebrow"
                defaultValue={story?.intro_eyebrow || '✨ Artisanal Heritage & Technical Precision'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Headline</label>
              <input
                type="text"
                name="intro_title"
                defaultValue={story?.intro_title || 'Transforming Designs into Exceptional Embroidery for Over 22 Years'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Intro Description Paragraph</label>
            <textarea
              name="intro_description"
              rows={3}
              defaultValue={story?.intro_description || ''}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Intro Trust Badges (One per line)
            </label>
            <textarea
              name="intro_badges"
              rows={3}
              defaultValue={(story?.intro_badges || []).join('\n')}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Narrative Story Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Heritage Story & 4 Narrative Paragraphs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Story Eyebrow</label>
              <input
                type="text"
                name="story_eyebrow"
                defaultValue={story?.story_eyebrow || '📖 Studio Story & Origins'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Story Headline</label>
              <input
                type="text"
                name="story_title"
                defaultValue={story?.story_title || 'From Local Embroidery Roots to a Global Master Digitizing Partner'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 1 (Origins)</label>
              <textarea name="story_p1" rows={3} defaultValue={story?.story_p1 || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 2 (Growth & Expansion)</label>
              <textarea name="story_p2" rows={3} defaultValue={story?.story_p2 || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 3 (Philosophy & Craftsmanship)</label>
              <textarea name="story_p3" rows={3} defaultValue={story?.story_p3 || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 4 (Present Day Worldwide Impact)</label>
              <textarea name="story_p4" rows={3} defaultValue={story?.story_p4 || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
          </div>

          {/* Story Image Upload */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800">Heritage Story Image</label>
            {story?.story_image && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <img src={story.story_image} alt="Story Image" className="w-20 h-14 object-cover rounded-lg border" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Photo</span>
                  <span className="text-xs text-slate-500 truncate block max-w-md">{story.story_image}</span>
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload New Story Photo (Optional)</label>
              <input
                type="file"
                name="story_image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Image Tag</label>
              <input type="text" name="story_image_badge" defaultValue={story?.story_image_badge || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Card Title</label>
              <input type="text" name="story_card_title" defaultValue={story?.story_card_title || 'Micro-Loupe Stitch Inspection'} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Card Subtitle</label>
              <input type="text" name="story_card_sub" defaultValue={story?.story_card_sub || ''} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Card Badge</label>
              <input type="text" name="story_card_badge" defaultValue={story?.story_card_badge || '99.8% Pass'} className="w-full p-3 border border-slate-300 rounded-xl text-xs" />
            </div>
          </div>
        </div>

        {/* 4 Story Attributes */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Four Distinct Studio Feature Highlights
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Feature 1</span>
              <input type="text" name="story_f1_title" defaultValue={f1.title} placeholder="Title" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <textarea name="story_f1_desc" rows={2} defaultValue={f1.desc} placeholder="Description" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Feature 2</span>
              <input type="text" name="story_f2_title" defaultValue={f2.title} placeholder="Title" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <textarea name="story_f2_desc" rows={2} defaultValue={f2.desc} placeholder="Description" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Feature 3</span>
              <input type="text" name="story_f3_title" defaultValue={f3.title} placeholder="Title" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <textarea name="story_f3_desc" rows={2} defaultValue={f3.desc} placeholder="Description" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-700">Feature 4</span>
              <input type="text" name="story_f4_title" defaultValue={f4.title} placeholder="Title" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-bold" />
              <textarea name="story_f4_desc" rows={2} defaultValue={f4.desc} placeholder="Description" className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white" />
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
            Save Studio Story
          </button>
        </div>
      </form>
    </div>
  );
}

