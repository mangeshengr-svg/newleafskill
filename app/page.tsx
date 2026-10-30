import pool from '@/lib/db';
import Header from '@/components/Header';
import HeroSection, { HeroContent, HeroSlide } from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import StitchCategoriesSection, { StitchCategory } from '@/components/StitchCategoriesSection';
import ServicesSection from '@/components/ServicesSection';
import MainContentWrapper from '@/components/MainContentWrapper';
import EmbroideryInspector from '@/components/EmbroideryInspector';

export const instant = false;

async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM home_hero_content ORDER BY id DESC LIMIT 1');
    if (rows && rows.length > 0) {
      const row = rows[0];
      return {
        badgeText: row.badge_text,
        mainHeading: row.main_heading,
        description: row.description,
        btn1Text: row.btn1_text,
        btn1Link: row.btn1_link,
        btn2Text: row.btn2_text,
        btn2Link: row.btn2_link,
        stats: [
          { value: row.stat1_value, label: row.stat1_label },
          { value: row.stat2_value, label: row.stat2_label },
          { value: row.stat3_value, label: row.stat3_label },
        ]
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch hero content:', error);
    return null;
  }
}

async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM home_hero_slider ORDER BY sort_order ASC, id ASC');
    return rows.map((row: any) => ({
      id: row.id.toString(),
      tabName: row.tab_name,
      mediaType: row.media_type,
      mediaUrl: row.media_url,
      slideTitle: row.slide_title,
      slideDesc: row.slide_desc,
      telemetry: [
        { label: row.spec1_title, value: row.spec1_value },
        { label: row.spec2_title, value: row.spec2_value },
        { label: row.spec3_title, value: row.spec3_value },
        { label: row.spec4_title, value: row.spec4_value },
      ].filter(spec => spec.label && spec.value)
    }));
  } catch (error) {
    console.error('Failed to fetch hero slides:', error);
    return [];
  }
}

async function getEmbroideryInspectors() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM embroidery_inspectors WHERE is_active = 1 ORDER BY sort_order ASC');
    return rows;
  } catch (error) {
    console.error('Failed to fetch embroidery inspectors:', error);
    return [];
  }
}

// Naya function: Stitch Categories fetch karne ke liye
async function getStitchCategories(): Promise<StitchCategory[]> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM stitch_categories ORDER BY sort_order ASC, id ASC');
    return rows.map((row: any) => ({
      key: row.category_key,
      tabLabel: row.tab_label,
      title: row.title,
      badge: row.badge,
      desc: row.description,
      stitches: row.stitches,
      time: row.turnaround_time,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
      image: row.image_url,
    }));
  } catch (error) {
    console.error('Failed to fetch stitch categories:', error);
    return [];
  }
}

import { getActiveServices } from '@/lib/serviceActions';
import { getActiveWorkProjects } from '@/lib/workActions';
import { getActiveBlogPosts } from '@/lib/blogActions';
import { getActiveWhyChooseUs } from '@/lib/whyChooseUsActions';
import { getActiveFaqs } from '@/lib/faqActions';
import { getActiveContactContent } from '@/lib/contactActions';

export default async function Home() {
  const [
    heroContentData,
    heroSlidesData,
    embroideryData,
    stitchCategoriesData,
    servicesData,
    workProjectsData,
    blogPostsData,
    whyChooseUsData,
    faqsData,
    contactContentData,
  ] = await Promise.all([
    getHeroContent(),
    getHeroSlides(),
    getEmbroideryInspectors(),
    getStitchCategories(),
    getActiveServices(),
    getActiveWorkProjects(),
    getActiveBlogPosts(),
    getActiveWhyChooseUs(),
    getActiveFaqs('home'),
    getActiveContactContent(),
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      <Header />
      <HeroSection content={heroContentData} slides={heroSlidesData} />
      <TrustBar />
      <EmbroideryInspector items={embroideryData} />
      
      {/* Dynamic Data Pass kiya ja raha hai */}
      <StitchCategoriesSection categories={stitchCategoriesData} />

      {/* Dynamic Services Data */}
      <ServicesSection services={servicesData} />
      <MainContentWrapper 
        workProjects={workProjectsData} 
        blogs={blogPostsData} 
        whyChooseUs={whyChooseUsData} 
        faqs={faqsData}
        contactContent={contactContentData}
      />
    </main>
  );
}