import { getActiveBlogPosts } from '@/lib/blogActions';
import BlogPageContent from '@/components/BlogPageContent';

export const instant = false;

export const metadata = {
  title: 'Blog & Commercial Embroidery Guides | New Leaf Skills',
  description: 'Fabric pull compensation, 3D puff headwear secrets, zero-break density rules, and commercial case studies from 22+ years of manual punching.',
};

export default async function BlogPage() {
  const dbPosts = await getActiveBlogPosts();
  return <BlogPageContent initialPosts={dbPosts} />;
}
