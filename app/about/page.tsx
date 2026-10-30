import { getActiveAboutContent } from '@/lib/aboutActions';
import { getActiveFaqs } from '@/lib/faqActions';
import pool from '@/lib/db';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const instant = false;

export const metadata: Metadata = {
  title: 'About Us — 22+ Years of Master Digitizing & Commercial Craftsmanship | New Leaf Skills',
  description:
    'Discover New Leaf Skills: Master embroidery digitizing studio operating for over 22 years. Manual hand-punching, zero thread breaks, high-speed multi-head calibration, and trusted by 10,000+ decorators worldwide.',
};

export default async function AboutPage() {
  // 1. Fetch dynamic about content from MySQL
  const aboutData = await getActiveAboutContent();

  // 2. Fetch dynamic FAQs from MySQL faqs table
  const faqsList = await getActiveFaqs('about');

  // 3. Fetch active services dynamically from MySQL services table
  let servicesList: any[] = [];
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    servicesList = rows.map((row: any) => {
      let specs: string[] = [];
      try {
        if (typeof row.key_highlights === 'string') {
          specs = JSON.parse(row.key_highlights);
        } else if (Array.isArray(row.key_highlights)) {
          specs = row.key_highlights;
        }
      } catch {
        specs = [];
      }

      let fabrics: string[] = [];
      try {
        if (typeof row.fabrics === 'string') {
          fabrics = JSON.parse(row.fabrics);
        } else if (Array.isArray(row.fabrics)) {
          fabrics = row.fabrics;
        }
      } catch {
        fabrics = [];
      }

      return {
        id: row.service_id || String(row.id),
        slug: row.slug,
        title: row.title,
        badge: row.badge || row.category || 'Core Studio Offering',
        shortDesc: row.short_desc || row.tag || '',
        icon: row.category === 'Digitizing Services' ? '🪡' : row.category === 'Computerized Stitching' ? '⚡' : row.category === 'Liturgical & Sacred' ? '✝️' : '🎨',
        suitableFor: fabrics.length > 0 ? fabrics.join(', ') : 'Corporate apparel, uniforms, polos, jackets & headwear',
        image: row.image || '/services/embroidery-digitizing.png',
        specs: specs.length > 0 ? specs : ['Manual Hand-Punched', 'Zero Auto-Trace Flaws', 'Fabric-Tuned Density'],
      };
    });
  } catch (error) {
    console.error('Failed to load services in about page:', error);
  }

  return <AboutClient initialAbout={aboutData} servicesList={servicesList} faqsList={faqsList} />;
}
