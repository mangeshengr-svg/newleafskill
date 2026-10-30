'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface AboutRecord {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  hero_badge_title: string;
  hero_badge_sub: string;
  hero_badge_tag: string;
  stats: any[];
  intro_eyebrow: string;
  intro_title: string;
  intro_description: string;
  intro_badges: string[];
  story_eyebrow: string;
  story_title: string;
  story_p1: string;
  story_p2: string;
  story_p3: string;
  story_p4: string;
  story_image: string;
  story_image_badge: string;
  story_card_title: string;
  story_card_sub: string;
  story_card_badge: string;
  story_features: { title: string; desc: string }[];
  timeline: any[];
  craftsmanship_layers: any[];
  commercial_machines: any[];
  why_choose_pillars: any[];
  quality_pledges: any[];
  global_presence: any[];
  faqs: any[];
  cta_eyebrow: string;
  cta_title: string;
  cta_description: string;
  contact_phone: string;
  contact_email: string;
  contact_hours: string;
  sort_order: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function rowToAboutRecord(row: any): AboutRecord {
  return {
    id: row.id,
    hero_eyebrow: row.hero_eyebrow || 'About New Leaf Skills • Master Studio Overview',
    hero_title: row.hero_title || '',
    hero_description: row.hero_description || '',
    hero_image: row.hero_image || '/about/about-hero-banner.jpg',
    hero_badge_title: row.hero_badge_title || 'Active Studio Production',
    hero_badge_sub: row.hero_badge_sub || 'Industrial 12-needle Tajima & Barudan heads',
    hero_badge_tag: row.hero_badge_tag || '24/7 Live',
    stats: safeParseJson<any[]>(row.stats, []),
    intro_eyebrow: row.intro_eyebrow || '✨ Artisanal Heritage & Technical Precision',
    intro_title: row.intro_title || '',
    intro_description: row.intro_description || '',
    intro_badges: safeParseJson<string[]>(row.intro_badges, []),
    story_eyebrow: row.story_eyebrow || '📖 Studio Story & Origins',
    story_title: row.story_title || '',
    story_p1: row.story_p1 || '',
    story_p2: row.story_p2 || '',
    story_p3: row.story_p3 || '',
    story_p4: row.story_p4 || '',
    story_image: row.story_image || '/about/roots-story.jpg',
    story_image_badge: row.story_image_badge || 'Master Punching Floor • 22+ Yrs Experience',
    story_card_title: row.story_card_title || 'Micro-Loupe Stitch Inspection',
    story_card_sub: row.story_card_sub || '',
    story_card_badge: row.story_card_badge || '99.8% Pass',
    story_features: safeParseJson<any[]>(row.story_features, []),
    timeline: safeParseJson<any[]>(row.timeline, []),
    craftsmanship_layers: safeParseJson<any[]>(row.craftsmanship_layers, []),
    commercial_machines: safeParseJson<any[]>(row.commercial_machines, []),
    why_choose_pillars: safeParseJson<any[]>(row.why_choose_pillars, []),
    quality_pledges: safeParseJson<any[]>(row.quality_pledges, []),
    global_presence: safeParseJson<any[]>(row.global_presence, []),
    faqs: safeParseJson<any[]>(row.faqs, []),
    cta_eyebrow: row.cta_eyebrow || '',
    cta_title: row.cta_title || '',
    cta_description: row.cta_description || '',
    contact_phone: row.contact_phone || '+91 99237 90520',
    contact_email: row.contact_email || 'info@newleafskills.com',
    contact_hours: row.contact_hours || '24/7 Global Production & Live Dispatch',
    sort_order: row.sort_order ?? 0,
    is_active: row.is_active ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// 1. Fetch active about content for website page
export async function getActiveAboutContent(): Promise<AboutRecord | null> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM about_content WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT 1'
    );
    if (!rows || rows.length === 0) {
      // Fallback: take latest entry even if is_active wasn't explicitly 1
      const [allRows]: any = await pool.query('SELECT * FROM about_content ORDER BY id DESC LIMIT 1');
      if (allRows && allRows.length > 0) return rowToAboutRecord(allRows[0]);
      return null;
    }
    return rowToAboutRecord(rows[0]);
  } catch (error) {
    console.error('Failed to fetch active about content:', error);
    return null;
  }
}

// 2. Fetch all about content for admin list
export async function getAllAboutContent(): Promise<AboutRecord[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM about_content ORDER BY sort_order ASC, id DESC'
    );
    return rows.map(rowToAboutRecord);
  } catch (error) {
    console.error('Failed to fetch about entries for admin:', error);
    return [];
  }
}

// 3. Fetch single about entry by ID
export async function getAboutById(id: number | string): Promise<AboutRecord | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM about_content WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rowToAboutRecord(rows[0]);
  } catch (error) {
    console.error('Failed to fetch about content by id:', error);
    return null;
  }
}

// Helper to handle uploaded files (NO image path input, strictly file upload)
async function handleFileUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || '.jpg';
  const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${Date.now()}-${rawBase}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

// 4. Create new About Entry
export async function createAboutContent(formData: FormData) {
  try {
    const hero_eyebrow = ((formData.get('hero_eyebrow') as string) || '').trim();
    const hero_title = ((formData.get('hero_title') as string) || '').trim();
    const hero_description = ((formData.get('hero_description') as string) || '').trim();
    const hero_badge_title = ((formData.get('hero_badge_title') as string) || '').trim();
    const hero_badge_sub = ((formData.get('hero_badge_sub') as string) || '').trim();
    const hero_badge_tag = ((formData.get('hero_badge_tag') as string) || '24/7 Live').trim();

    // File Uploads
    const heroImageFile = formData.get('hero_image') as File | null;
    const heroImageUrl = (await handleFileUpload(heroImageFile)) || '/about/about-hero-banner.jpg';

    const storyImageFile = formData.get('story_image') as File | null;
    const storyImageUrl = (await handleFileUpload(storyImageFile)) || '/about/roots-story.jpg';

    // Stats
    const stats = [
      {
        value: (formData.get('stat1_value') as string) || '22+ Years',
        label: (formData.get('stat1_label') as string) || 'Studio Craftsmanship',
        detail: (formData.get('stat1_detail') as string) || 'Manual punching excellence since 2004',
        icon: (formData.get('stat1_icon') as string) || '⏳',
      },
      {
        value: (formData.get('stat2_value') as string) || '10,000+',
        label: (formData.get('stat2_label') as string) || 'Global Clients',
        detail: (formData.get('stat2_detail') as string) || 'Apparel brands, shops & decorators worldwide',
        icon: (formData.get('stat2_icon') as string) || '🌍',
      },
      {
        value: (formData.get('stat3_value') as string) || '50,000+',
        label: (formData.get('stat3_label') as string) || 'Sewouts Digitized',
        detail: (formData.get('stat3_detail') as string) || 'Tested across Tajima, Barudan & Brother',
        icon: (formData.get('stat3_icon') as string) || '🪡',
      },
      {
        value: (formData.get('stat4_value') as string) || '6–8 Hours',
        label: (formData.get('stat4_label') as string) || 'Standard Turnaround',
        detail: (formData.get('stat4_detail') as string) || 'Fast rush service delivered in 2 hours',
        icon: (formData.get('stat4_icon') as string) || '⚡',
      },
    ];

    // Intro Section
    const intro_eyebrow = ((formData.get('intro_eyebrow') as string) || '').trim();
    const intro_title = ((formData.get('intro_title') as string) || '').trim();
    const intro_description = ((formData.get('intro_description') as string) || '').trim();
    const intro_badges_raw = (formData.get('intro_badges') as string) || '';
    const intro_badges = intro_badges_raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // Story Section
    const story_eyebrow = ((formData.get('story_eyebrow') as string) || '').trim();
    const story_title = ((formData.get('story_title') as string) || '').trim();
    const story_p1 = ((formData.get('story_p1') as string) || '').trim();
    const story_p2 = ((formData.get('story_p2') as string) || '').trim();
    const story_p3 = ((formData.get('story_p3') as string) || '').trim();
    const story_p4 = ((formData.get('story_p4') as string) || '').trim();
    const story_image_badge = ((formData.get('story_image_badge') as string) || '').trim();
    const story_card_title = ((formData.get('story_card_title') as string) || '').trim();
    const story_card_sub = ((formData.get('story_card_sub') as string) || '').trim();
    const story_card_badge = ((formData.get('story_card_badge') as string) || '99.8% Pass').trim();

    // Story 4 attributes
    const story_features = [
      {
        title: (formData.get('story_f1_title') as string) || 'Manual Push-Pull Calibration',
        desc: (formData.get('story_f1_desc') as string) || 'Fabric-specific stitch tension for pique, fleece, twill, and caps.',
      },
      {
        title: (formData.get('story_f2_title') as string) || '24/7 Global Production Shifts',
        desc: (formData.get('story_f2_desc') as string) || 'Overnight files returned ready for your morning production run.',
      },
      {
        title: (formData.get('story_f3_title') as string) || 'Universal Format Compatibility',
        desc: (formData.get('story_f3_desc') as string) || 'DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet.',
      },
      {
        title: (formData.get('story_f4_title') as string) || 'Zero Auto-Trace Flaws',
        desc: (formData.get('story_f4_desc') as string) || '100% human-plotted underlays and clean concealed tie-offs.',
      },
    ];

    // CTA & Contact Info
    const cta_eyebrow = ((formData.get('cta_eyebrow') as string) || '').trim();
    const cta_title = ((formData.get('cta_title') as string) || '').trim();
    const cta_description = ((formData.get('cta_description') as string) || '').trim();
    const contact_phone = ((formData.get('contact_phone') as string) || '').trim();
    const contact_email = ((formData.get('contact_email') as string) || '').trim();
    const contact_hours = ((formData.get('contact_hours') as string) || '').trim();
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === '0' ? 0 : 1;

    // Grab default json blocks for timeline, craftsmanship, etc. if not provided
    const timeline_json = (formData.get('timeline_json') as string) || null;
    const craftsmanship_json = (formData.get('craftsmanship_json') as string) || null;
    const machines_json = (formData.get('machines_json') as string) || null;
    const why_choose_json = (formData.get('why_choose_json') as string) || null;
    const quality_json = (formData.get('quality_json') as string) || null;
    const global_json = (formData.get('global_json') as string) || null;
    const faqs_json = (formData.get('faqs_json') as string) || null;

    // Check if we need to copy previous record's sub-structures if JSON was not passed
    let timeline = safeParseJson(timeline_json, null);
    let craftsmanship = safeParseJson(craftsmanship_json, null);
    let machines = safeParseJson(machines_json, null);
    let whyChoose = safeParseJson(why_choose_json, null);
    let quality = safeParseJson(quality_json, null);
    let globalPres = safeParseJson(global_json, null);
    let faqs = safeParseJson(faqs_json, null);

    if (!timeline) {
      const [latest]: any = await pool.query('SELECT * FROM about_content ORDER BY id DESC LIMIT 1');
      if (latest && latest.length > 0) {
        timeline = latest[0].timeline;
        craftsmanship = craftsmanship || latest[0].craftsmanship_layers;
        machines = machines || latest[0].commercial_machines;
        whyChoose = whyChoose || latest[0].why_choose_pillars;
        quality = quality || latest[0].quality_pledges;
        globalPres = globalPres || latest[0].global_presence;
        faqs = faqs || latest[0].faqs;
      }
    }

    const insertSql = `
      INSERT INTO about_content (
        hero_eyebrow, hero_title, hero_description, hero_image,
        hero_badge_title, hero_badge_sub, hero_badge_tag,
        stats,
        intro_eyebrow, intro_title, intro_description, intro_badges,
        story_eyebrow, story_title, story_p1, story_p2, story_p3, story_p4,
        story_image, story_image_badge, story_card_title, story_card_sub, story_card_badge,
        story_features,
        timeline, craftsmanship_layers, commercial_machines,
        why_choose_pillars, quality_pledges, global_presence, faqs,
        cta_eyebrow, cta_title, cta_description,
        contact_phone, contact_email, contact_hours,
        sort_order, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(insertSql, [
      hero_eyebrow,
      hero_title,
      hero_description,
      heroImageUrl,
      hero_badge_title,
      hero_badge_sub,
      hero_badge_tag,
      JSON.stringify(stats),
      intro_eyebrow,
      intro_title,
      intro_description,
      JSON.stringify(intro_badges),
      story_eyebrow,
      story_title,
      story_p1,
      story_p2,
      story_p3,
      story_p4,
      storyImageUrl,
      story_image_badge,
      story_card_title,
      story_card_sub,
      story_card_badge,
      JSON.stringify(story_features),
      JSON.stringify(timeline || []),
      JSON.stringify(craftsmanship || []),
      JSON.stringify(machines || []),
      JSON.stringify(whyChoose || []),
      JSON.stringify(quality || []),
      JSON.stringify(globalPres || []),
      JSON.stringify(faqs || []),
      cta_eyebrow,
      cta_title,
      cta_description,
      contact_phone,
      contact_email,
      contact_hours,
      sort_order,
      is_active,
    ]);

    revalidatePath('/about');
    revalidatePath('/admin/about');
  } catch (error) {
    console.error('Failed to create about content:', error);
    throw error;
  }

  redirect('/admin/about');
}

// 5. Update existing About Entry
export async function updateAboutContent(id: number | string, formData: FormData) {
  try {
    const hero_eyebrow = ((formData.get('hero_eyebrow') as string) || '').trim();
    const hero_title = ((formData.get('hero_title') as string) || '').trim();
    const hero_description = ((formData.get('hero_description') as string) || '').trim();
    const hero_badge_title = ((formData.get('hero_badge_title') as string) || '').trim();
    const hero_badge_sub = ((formData.get('hero_badge_sub') as string) || '').trim();
    const hero_badge_tag = ((formData.get('hero_badge_tag') as string) || '24/7 Live').trim();

    // Check existing record for images
    const existing = await getAboutById(id);
    if (!existing) throw new Error('Record not found');

    const heroImageFile = formData.get('hero_image') as File | null;
    let heroImageUrl = existing.hero_image;
    const uploadedHero = await handleFileUpload(heroImageFile);
    if (uploadedHero) {
      heroImageUrl = uploadedHero;
    }

    const storyImageFile = formData.get('story_image') as File | null;
    let storyImageUrl = existing.story_image;
    const uploadedStory = await handleFileUpload(storyImageFile);
    if (uploadedStory) {
      storyImageUrl = uploadedStory;
    }

    // Stats
    const stats = [
      {
        value: (formData.get('stat1_value') as string) || '22+ Years',
        label: (formData.get('stat1_label') as string) || 'Studio Craftsmanship',
        detail: (formData.get('stat1_detail') as string) || 'Manual punching excellence since 2004',
        icon: (formData.get('stat1_icon') as string) || '⏳',
      },
      {
        value: (formData.get('stat2_value') as string) || '10,000+',
        label: (formData.get('stat2_label') as string) || 'Global Clients',
        detail: (formData.get('stat2_detail') as string) || 'Apparel brands, shops & decorators worldwide',
        icon: (formData.get('stat2_icon') as string) || '🌍',
      },
      {
        value: (formData.get('stat3_value') as string) || '50,000+',
        label: (formData.get('stat3_label') as string) || 'Sewouts Digitized',
        detail: (formData.get('stat3_detail') as string) || 'Tested across Tajima, Barudan & Brother',
        icon: (formData.get('stat3_icon') as string) || '🪡',
      },
      {
        value: (formData.get('stat4_value') as string) || '6–8 Hours',
        label: (formData.get('stat4_label') as string) || 'Standard Turnaround',
        detail: (formData.get('stat4_detail') as string) || 'Fast rush service delivered in 2 hours',
        icon: (formData.get('stat4_icon') as string) || '⚡',
      },
    ];

    // Intro Section
    const intro_eyebrow = ((formData.get('intro_eyebrow') as string) || '').trim();
    const intro_title = ((formData.get('intro_title') as string) || '').trim();
    const intro_description = ((formData.get('intro_description') as string) || '').trim();
    const intro_badges_raw = (formData.get('intro_badges') as string) || '';
    const intro_badges = intro_badges_raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // Story Section
    const story_eyebrow = ((formData.get('story_eyebrow') as string) || '').trim();
    const story_title = ((formData.get('story_title') as string) || '').trim();
    const story_p1 = ((formData.get('story_p1') as string) || '').trim();
    const story_p2 = ((formData.get('story_p2') as string) || '').trim();
    const story_p3 = ((formData.get('story_p3') as string) || '').trim();
    const story_p4 = ((formData.get('story_p4') as string) || '').trim();
    const story_image_badge = ((formData.get('story_image_badge') as string) || '').trim();
    const story_card_title = ((formData.get('story_card_title') as string) || '').trim();
    const story_card_sub = ((formData.get('story_card_sub') as string) || '').trim();
    const story_card_badge = ((formData.get('story_card_badge') as string) || '99.8% Pass').trim();

    const story_features = [
      {
        title: (formData.get('story_f1_title') as string) || 'Manual Push-Pull Calibration',
        desc: (formData.get('story_f1_desc') as string) || 'Fabric-specific stitch tension for pique, fleece, twill, and caps.',
      },
      {
        title: (formData.get('story_f2_title') as string) || '24/7 Global Production Shifts',
        desc: (formData.get('story_f2_desc') as string) || 'Overnight files returned ready for your morning production run.',
      },
      {
        title: (formData.get('story_f3_title') as string) || 'Universal Format Compatibility',
        desc: (formData.get('story_f3_desc') as string) || 'DST, PES, EXP, JEF, VP3, HUS, EMB, CND with PDF spec sheet.',
      },
      {
        title: (formData.get('story_f4_title') as string) || 'Zero Auto-Trace Flaws',
        desc: (formData.get('story_f4_desc') as string) || '100% human-plotted underlays and clean concealed tie-offs.',
      },
    ];

    // CTA & Contact Info
    const cta_eyebrow = ((formData.get('cta_eyebrow') as string) || '').trim();
    const cta_title = ((formData.get('cta_title') as string) || '').trim();
    const cta_description = ((formData.get('cta_description') as string) || '').trim();
    const contact_phone = ((formData.get('contact_phone') as string) || '').trim();
    const contact_email = ((formData.get('contact_email') as string) || '').trim();
    const contact_hours = ((formData.get('contact_hours') as string) || '').trim();
    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === '0' ? 0 : 1;

    // Optional JSON fields preservation
    const timeline_json = (formData.get('timeline_json') as string) || null;
    const craftsmanship_json = (formData.get('craftsmanship_json') as string) || null;
    const machines_json = (formData.get('machines_json') as string) || null;
    const why_choose_json = (formData.get('why_choose_json') as string) || null;
    const quality_json = (formData.get('quality_json') as string) || null;
    const global_json = (formData.get('global_json') as string) || null;
    const faqs_json = (formData.get('faqs_json') as string) || null;

    const timeline = timeline_json ? safeParseJson(timeline_json, existing.timeline) : existing.timeline;
    const craftsmanship = craftsmanship_json ? safeParseJson(craftsmanship_json, existing.craftsmanship_layers) : existing.craftsmanship_layers;
    const machines = machines_json ? safeParseJson(machines_json, existing.commercial_machines) : existing.commercial_machines;
    const whyChoose = why_choose_json ? safeParseJson(why_choose_json, existing.why_choose_pillars) : existing.why_choose_pillars;
    const quality = quality_json ? safeParseJson(quality_json, existing.quality_pledges) : existing.quality_pledges;
    const globalPres = global_json ? safeParseJson(global_json, existing.global_presence) : existing.global_presence;
    const faqs = faqs_json ? safeParseJson(faqs_json, existing.faqs) : existing.faqs;

    const updateSql = `
      UPDATE about_content SET
        hero_eyebrow = ?,
        hero_title = ?,
        hero_description = ?,
        hero_image = ?,
        hero_badge_title = ?,
        hero_badge_sub = ?,
        hero_badge_tag = ?,
        stats = ?,
        intro_eyebrow = ?,
        intro_title = ?,
        intro_description = ?,
        intro_badges = ?,
        story_eyebrow = ?,
        story_title = ?,
        story_p1 = ?,
        story_p2 = ?,
        story_p3 = ?,
        story_p4 = ?,
        story_image = ?,
        story_image_badge = ?,
        story_card_title = ?,
        story_card_sub = ?,
        story_card_badge = ?,
        story_features = ?,
        timeline = ?,
        craftsmanship_layers = ?,
        commercial_machines = ?,
        why_choose_pillars = ?,
        quality_pledges = ?,
        global_presence = ?,
        faqs = ?,
        cta_eyebrow = ?,
        cta_title = ?,
        cta_description = ?,
        contact_phone = ?,
        contact_email = ?,
        contact_hours = ?,
        sort_order = ?,
        is_active = ?
      WHERE id = ?
    `;

    await pool.query(updateSql, [
      hero_eyebrow,
      hero_title,
      hero_description,
      heroImageUrl,
      hero_badge_title,
      hero_badge_sub,
      hero_badge_tag,
      JSON.stringify(stats),
      intro_eyebrow,
      intro_title,
      intro_description,
      JSON.stringify(intro_badges),
      story_eyebrow,
      story_title,
      story_p1,
      story_p2,
      story_p3,
      story_p4,
      storyImageUrl,
      story_image_badge,
      story_card_title,
      story_card_sub,
      story_card_badge,
      JSON.stringify(story_features),
      JSON.stringify(timeline || []),
      JSON.stringify(craftsmanship || []),
      JSON.stringify(machines || []),
      JSON.stringify(whyChoose || []),
      JSON.stringify(quality || []),
      JSON.stringify(globalPres || []),
      JSON.stringify(faqs || []),
      cta_eyebrow,
      cta_title,
      cta_description,
      contact_phone,
      contact_email,
      contact_hours,
      sort_order,
      is_active,
      id,
    ]);

    revalidatePath('/about');
    revalidatePath('/admin/about');
  } catch (error) {
    console.error('Failed to update about content:', error);
    throw error;
  }

  redirect('/admin/about');
}

// 6. Delete About Entry
export async function deleteAboutContent(id: number | string) {
  try {
    await pool.query('DELETE FROM about_content WHERE id = ?', [id]);
    revalidatePath('/about');
    revalidatePath('/admin/about');
  } catch (error) {
    console.error('Failed to delete about content:', error);
    throw error;
  }

  redirect('/admin/about');
}
