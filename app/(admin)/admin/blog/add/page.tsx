'use client';

import { createBlogPost } from '@/lib/blogActions';
import Link from 'next/link';

export default function AddBlogPostPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Blog Post</h1>
          <p className="text-slate-500 text-xs mt-1">
            Publish a new embroidery case study, technical guide, or digitizing insight to the website.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Blog List
        </Link>
      </div>

      {/* Add Form */}
      <form action={createBlogPost} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Core Article Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Core Article Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Why Pull Compensation Determines Commercial Stitch Quality"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Embroidery Service">Embroidery Service</option>
                <option value="Fashion Designer">Fashion Designer</option>
                <option value="Irish Dance Dress Designer">Irish Dance Dress Designer</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technical Guides">Technical Guides</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custom URL Slug (Optional)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. why-pull-compensation-matters"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[10px] text-slate-400">Leave blank to auto-generate from title</span>
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

            <div className="flex items-center pt-5">
              <label className="relative flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800">Feature on Page Top Banner</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Image File Upload (File Input) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Article Banner Photo Upload
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Upload Article Image <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              Upload genuine sewout photo, article banner or graphic (PNG, JPG, WEBP).
            </p>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
            />
          </div>
        </div>

        {/* Section 3: Author and Meta Info */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Author &amp; Reading Metadata
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                defaultValue="Admin"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Author Role / Subtitle
              </label>
              <input
                type="text"
                name="author_role"
                defaultValue="Master Digitizing Studio"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Publish Date
              </label>
              <input
                type="text"
                name="date"
                defaultValue={currentDate}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Read Time
              </label>
              <input
                type="text"
                name="read_time"
                defaultValue="4 min read"
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Topic Tags (Comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. Custom Logo Digitizing, 3D Puff, Commercial Embroidery, Push Pull Compensation"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-400">Separate multiple tags with commas</span>
          </div>
        </div>

        {/* Section 4: Content & Takeaways */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            4. Article Content &amp; Summary
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Article Excerpt / Card Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              rows={3}
              required
              placeholder="Brief summary that appears on blog cards and search snippets (2–3 sentences)..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Key Technical Takeaways (One per line)
            </label>
            <textarea
              name="key_takeaways"
              rows={3}
              placeholder="Enter key highlights/rules, one per line:&#10;Automated tools lack fabric pull compensation.&#10;Hand-punched underlays prevent needle breaks.&#10;Save downtime on Barudan and Tajima machines."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="text-[10px] text-slate-400">Each line will be rendered as a bullet point inside the reading modal</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Article Body <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={8}
              required
              placeholder="Write the full article body. Separate paragraphs with an empty blank line..."
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
            <span className="text-[10px] text-slate-400">Separate each paragraph with a blank line</span>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link
            href="/admin/blog"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Publish Blog Post 🚀
          </button>
        </div>

      </form>
    </div>
  );
}
