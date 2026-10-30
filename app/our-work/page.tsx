import { getActiveWorkProjects } from '@/lib/workActions';
import OurWorkPageContent from '@/components/OurWorkPageContent';

export const instant = false;

export const metadata = {
  title: 'Our Work & Embroidery Portfolio | Authentic Production Sewouts | New Leaf Skills',
  description: 'Explore real commercial machine sewouts digitized by our master punching veterans. Over 50,000+ files digitized for apparel decorators worldwide with zero thread breaks.',
};

export default async function OurWorkPage() {
  const dbProjects = await getActiveWorkProjects();
  return <OurWorkPageContent initialProjects={dbProjects} />;
}
