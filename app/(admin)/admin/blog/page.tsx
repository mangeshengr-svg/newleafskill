import pool from '@/lib/db';
import Link from 'next/link';
import DeleteBlogButton from '@/components/admin/DeleteBlogButton';

export const instant = false;

export default async function AdminBlogPage() {
  const [rows]: any = await pool.query(
    'SELECT * FROM blogs ORDER BY sort_order ASC, id ASC'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blog &amp; Knowledge Base Management</h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage industry insights, technical guides, pull compensation articles, and machine embroidery tips.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <span>Live Blog Page</span>
            <span>↗</span>
          </Link>
          <Link
            href="/admin/blog/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>+ Add New Blog Post</span>
            <span>⚡</span>
          </Link>
        </div>
      </div>

      {/* Blogs Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
          <span className="font-semibold text-slate-700">Total Blog Posts: {rows.length}</span>
          <span className="text-[11px] text-slate-400">Synchronized with Home Page Blog Section &amp; Blog Knowledge Hub Page</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">ID</th>
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Title &amp; Category</th>
                <th className="p-4">Author &amp; Date</th>
                <th className="p-4 text-center">Read Time</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Sort</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No blog posts found. Click &quot;+ Add New Blog Post&quot; to publish your first article.
                  </td>
                </tr>
              ) : (
                rows.map((post: any) => {
                  let parsedTags: string[] = [];
                  try {
                    parsedTags = Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags || '[]');
                  } catch (e) {
                    parsedTags = [];
                  }

                  return (
                    <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* ID */}
                      <td className="p-4 text-center">
                        <span className="text-slate-400 font-mono text-xs">
                          #{post.id}
                        </span>
                      </td>

                      {/* Image Thumbnail */}
                      <td className="p-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex-shrink-0">
                          <img
                            src={post.image || '/blog/blog-hero-banner.jpg'}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="p-4 max-w-sm">
                        <div className="space-y-1">
                          <p className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-200">
                              {post.category}
                            </span>
                            {parsedTags.slice(0, 2).map((t, idx) => (
                              <span key={idx} className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Author & Date */}
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{post.author || 'Admin'}</p>
                        <p className="text-[11px] text-slate-400">{post.date}</p>
                      </td>

                      {/* Read Time */}
                      <td className="p-4 text-center font-medium text-slate-600">
                        {post.read_time || '4 min read'}
                      </td>

                      {/* Featured */}
                      <td className="p-4 text-center">
                        {post.featured ? (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-amber-200">
                            ★ Featured
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Sort Order */}
                      <td className="p-4 text-center font-bold text-slate-600">
                        {post.sort_order ?? 0}
                      </td>

                      {/* Active Status */}
                      <td className="p-4 text-center">
                        {post.is_active ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-slate-200">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer"
                        >
                          Edit
                        </Link>
                        <DeleteBlogButton id={post.id} title={post.title} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
