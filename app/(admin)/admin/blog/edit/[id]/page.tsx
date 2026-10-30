import pool from '@/lib/db';
import { updateBlogPost } from '@/lib/blogActions';
import Link from 'next/link';

export const instant = false;

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [rows]: any = await pool.query('SELECT * FROM blogs WHERE id = ? LIMIT 1', [id]);
  const post = rows[0];

  if (!post) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Blog Post Not Found</h2>
        <p className="text-xs text-slate-500">The requested blog post ID #{id} does not exist in the database.</p>
        <Link
          href="/admin/blog"
          className="inline-block bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          ← Back to Blog List
        </Link>
      </div>
    );
  }

  // Parse arrays
  let tagsString = '';
  try {
    const parsed = Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags || '[]');
    tagsString = parsed.join(', ');
  } catch (e) {
    tagsString = typeof post.tags === 'string' ? post.tags : '';
  }

  let takeawaysString = '';
  try {
    const parsed = Array.isArray(post.key_takeaways) ? post.key_takeaways : JSON.parse(post.key_takeaways || '[]');
    takeawaysString = parsed.join('\n');
  } catch (e) {
    takeawaysString = typeof post.key_takeaways === 'string' ? post.key_takeaways : '';
  }

  let contentString = '';
  try {
    const parsed = Array.isArray(post.content) ? post.content : JSON.parse(post.content || '[]');
    contentString = parsed.join('\n\n');
  } catch (e) {
    contentString = typeof post.content === 'string' ? post.content : '';
  }

  const updateActionWithId = updateBlogPost.bind(null, post.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Blog Post: {post.title}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update article copy, modify metadata, or upload a new feature image.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
        >
          ← Back to Blog List
        </Link>
      </div>

      {/* Edit Form */}
      <form action={updateActionWithId} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Core Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Core Information
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
                defaultValue={post.title}
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
                defaultValue={post.category}
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

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={post.slug}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                defaultValue={post.sort_order ?? 0}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Publication Status
              </label>
              <select
                name="is_active"
                defaultValue={post.is_active ? '1' : '0'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="1">Active (Published)</option>
                <option value="0">Inactive (Draft / Hidden)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="relative flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={Boolean(post.featured)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800">Featured Article</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Image File Upload */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            2. Article Photo &amp; Thumbnail
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Current Image Display */}
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Photo
              </label>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative max-w-xs shadow-xs">
                <img
                  src={post.image || '/blog/blog-hero-banner.jpg'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Upload Input */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Upload New Image (Optional)
              </label>
              <p className="text-[11px] text-slate-500">
                Choose a new image file to replace the current photo. Leave blank to keep existing image.
              </p>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
              />
            </div>
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
                defaultValue={post.author || 'Admin'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Author Role
              </label>
              <input
                type="text"
                name="author_role"
                defaultValue={post.author_role || 'Master Digitizing Studio'}
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
                defaultValue={post.date}
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
                defaultValue={post.read_time || '4 min read'}
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
              defaultValue={tagsString}
              placeholder="e.g. Custom Logo Digitizing, 3D Puff, Trends"
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
              defaultValue={post.excerpt}
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
              defaultValue={takeawaysString}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Article Body <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={8}
              required
              defaultValue={contentString}
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
            <span className="text-[10px] text-slate-400">Separate paragraphs with a blank line</span>
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
            Save Changes 💾
          </button>
        </div>

      </form>
    </div>
  );
}
