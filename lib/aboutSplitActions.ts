'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

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

// ==========================================
// 1. GET FULL ABOUT PAGE DATA (Aggregated from split tables)
// ==========================================
export async function getAggregatedAboutData() {
  try {
    // 1. Hero
    const [heroRows]: any = await pool.query('SELECT * FROM about_hero WHERE is_active = 1 LIMIT 1');
    const hero = heroRows[0] || null;

    // 2. Story
    const [storyRows]: any = await pool.query('SELECT * FROM about_story WHERE is_active = 1 LIMIT 1');
    const story = storyRows[0] || null;

    // 3. Craftsmanship
    const [craftsmanship]: any = await pool.query('SELECT * FROM about_craftsmanship WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    // 4. Machines
    const [machines]: any = await pool.query('SELECT * FROM about_machines WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    // 5. Timeline
    const [timeline]: any = await pool.query('SELECT * FROM about_timeline WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    // 6. Why Choose
    const [whyChoose]: any = await pool.query('SELECT * FROM about_why_choose WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    // 7. Global Presence
    const [globalPresence]: any = await pool.query('SELECT * FROM about_global_presence WHERE is_active = 1 ORDER BY sort_order ASC, id ASC');

    // 8. CTA
    const [ctaRows]: any = await pool.query('SELECT * FROM about_cta WHERE is_active = 1 LIMIT 1');
    const cta = ctaRows[0] || null;

    return {
      hero: hero ? {
        ...hero,
        stats: safeParseJson(hero.stats, []),
      } : null,
      story: story ? {
        ...story,
        intro_badges: safeParseJson(story.intro_badges, []),
        story_features: safeParseJson(story.story_features, []),
      } : null,
      craftsmanship: craftsmanship.map((c: any) => ({
        id: c.layer_id,
        layerNumber: c.layer_number,
        name: c.name,
        badge: c.badge,
        tagline: c.tagline,
        icon: c.icon,
        description: c.description,
        technicalSpec: c.technical_spec,
        autoTraceProblem: c.auto_trace_problem,
        ourManualSolution: c.our_manual_solution,
      })),
      machines: machines.map((m: any) => ({
        id: m.machine_id,
        brand: m.brand,
        tagline: m.tagline,
        nativeFormat: m.native_format,
        allFormats: safeParseJson(m.all_formats, []),
        maxSPM: m.max_spm,
        trimSystem: m.trim_system,
        tensionPreset: m.tension_preset,
        needleRecommendation: m.needle_recommendation,
        bestUse: m.best_use,
      })),
      timeline: timeline.map((t: any) => ({
        year: t.year,
        title: t.title,
        tagline: t.tagline,
        description: t.description,
        highlight: t.highlight,
      })),
      whyChoose: whyChoose.map((w: any) => ({
        title: w.title,
        subtitle: w.subtitle,
        description: w.description,
        icon: w.icon,
        badge: w.badge,
      })),
      globalPresence: globalPresence.map((g: any) => ({
        country: g.country,
        flag: g.flag,
        percentage: g.percentage,
        highlight: g.highlight,
        cities: g.cities,
      })),
      cta: cta || null,
    };
  } catch (error) {
    console.error('Failed to load aggregated about data:', error);
    return null;
  }
}

// Backward-compatible getActiveAboutContent for components
export async function getActiveAboutContent() {
  const data = await getAggregatedAboutData();
  if (!data) return null;

  return {
    id: 1,
    hero_eyebrow: data.hero?.hero_eyebrow || 'About New Leaf Skills • Master Studio Overview',
    hero_title: data.hero?.hero_title || '',
    hero_description: data.hero?.hero_description || '',
    hero_image: data.hero?.hero_image || '/about/about-hero-banner.jpg',
    hero_badge_title: data.hero?.hero_badge_title || '',
    hero_badge_sub: data.hero?.hero_badge_sub || '',
    hero_badge_tag: data.hero?.hero_badge_tag || '24/7 Live',
    stats: data.hero?.stats || [],

    intro_eyebrow: data.story?.intro_eyebrow || '✨ Artisanal Heritage & Technical Precision',
    intro_title: data.story?.intro_title || '',
    intro_description: data.story?.intro_description || '',
    intro_badges: data.story?.intro_badges || [],
    story_eyebrow: data.story?.story_eyebrow || '📖 Studio Story & Origins',
    story_title: data.story?.story_title || '',
    story_p1: data.story?.story_p1 || '',
    story_p2: data.story?.story_p2 || '',
    story_p3: data.story?.story_p3 || '',
    story_p4: data.story?.story_p4 || '',
    story_image: data.story?.story_image || '/about/roots-story.jpg',
    story_image_badge: data.story?.story_image_badge || '',
    story_card_title: data.story?.story_card_title || '',
    story_card_sub: data.story?.story_card_sub || '',
    story_card_badge: data.story?.story_card_badge || '99.8% Pass',
    story_features: data.story?.story_features || [],

    craftsmanship_layers: data.craftsmanship,
    commercial_machines: data.machines,
    timeline: data.timeline,
    why_choose_pillars: data.whyChoose,
    global_presence: data.globalPresence,

    cta_eyebrow: data.cta?.cta_eyebrow || '',
    cta_title: data.cta?.cta_title || '',
    cta_description: data.cta?.cta_description || '',
    contact_phone: data.cta?.contact_phone || '+91 99237 90520',
    contact_email: data.cta?.contact_email || 'info@newleafskills.com',
    contact_hours: data.cta?.contact_hours || '24/7 Global Production & Live Dispatch',

    sort_order: 0,
    is_active: 1,
  };
}

// ==========================================
// 2. HERO SECTION ACTIONS
// ==========================================
export async function getAboutHero() {
  const [rows]: any = await pool.query('SELECT * FROM about_hero ORDER BY id ASC LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const r = rows[0];
  return {
    ...r,
    stats: safeParseJson(r.stats, []),
  };
}

export async function updateAboutHero(formData: FormData): Promise<void> {
  const hero_eyebrow = ((formData.get('hero_eyebrow') as string) || '').trim();
  const hero_title = ((formData.get('hero_title') as string) || '').trim();
  const hero_description = ((formData.get('hero_description') as string) || '').trim();
  const hero_badge_title = ((formData.get('hero_badge_title') as string) || '').trim();
  const hero_badge_sub = ((formData.get('hero_badge_sub') as string) || '').trim();
  const hero_badge_tag = ((formData.get('hero_badge_tag') as string) || '24/7 Live').trim();

  const [existing]: any = await pool.query('SELECT * FROM about_hero LIMIT 1');
  let heroImageUrl = existing?.[0]?.hero_image || '/about/about-hero-banner.jpg';

  const heroImageFile = formData.get('hero_image') as File | null;
  const uploaded = await handleFileUpload(heroImageFile);
  if (uploaded) heroImageUrl = uploaded;

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

  if (existing && existing.length > 0) {
    await pool.query(
      `UPDATE about_hero SET
        hero_eyebrow = ?, hero_title = ?, hero_description = ?,
        hero_image = ?, hero_badge_title = ?, hero_badge_sub = ?, hero_badge_tag = ?,
        stats = ? WHERE id = ?`,
      [hero_eyebrow, hero_title, hero_description, heroImageUrl, hero_badge_title, hero_badge_sub, hero_badge_tag, JSON.stringify(stats), existing[0].id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_hero (hero_eyebrow, hero_title, hero_description, hero_image, hero_badge_title, hero_badge_sub, hero_badge_tag, stats, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [hero_eyebrow, hero_title, hero_description, heroImageUrl, hero_badge_title, hero_badge_sub, hero_badge_tag, JSON.stringify(stats)]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/hero');
  redirect('/admin/about');
}

// ==========================================
// 3. STORY & INTRO ACTIONS
// ==========================================
export async function getAboutStory() {
  const [rows]: any = await pool.query('SELECT * FROM about_story ORDER BY id ASC LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const r = rows[0];
  return {
    ...r,
    intro_badges: safeParseJson(r.intro_badges, []),
    story_features: safeParseJson(r.story_features, []),
  };
}

export async function updateAboutStory(formData: FormData): Promise<void> {
  const intro_eyebrow = ((formData.get('intro_eyebrow') as string) || '').trim();
  const intro_title = ((formData.get('intro_title') as string) || '').trim();
  const intro_description = ((formData.get('intro_description') as string) || '').trim();
  const intro_badges_raw = (formData.get('intro_badges') as string) || '';
  const intro_badges = intro_badges_raw.split('\n').map((s) => s.trim()).filter(Boolean);

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

  const [existing]: any = await pool.query('SELECT * FROM about_story LIMIT 1');
  let storyImageUrl = existing?.[0]?.story_image || '/about/roots-story.jpg';

  const storyImageFile = formData.get('story_image') as File | null;
  const uploaded = await handleFileUpload(storyImageFile);
  if (uploaded) storyImageUrl = uploaded;

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

  if (existing && existing.length > 0) {
    await pool.query(
      `UPDATE about_story SET
        intro_eyebrow = ?, intro_title = ?, intro_description = ?, intro_badges = ?,
        story_eyebrow = ?, story_title = ?, story_p1 = ?, story_p2 = ?, story_p3 = ?, story_p4 = ?,
        story_image = ?, story_image_badge = ?, story_card_title = ?, story_card_sub = ?, story_card_badge = ?,
        story_features = ? WHERE id = ?`,
      [
        intro_eyebrow, intro_title, intro_description, JSON.stringify(intro_badges),
        story_eyebrow, story_title, story_p1, story_p2, story_p3, story_p4,
        storyImageUrl, story_image_badge, story_card_title, story_card_sub, story_card_badge,
        JSON.stringify(story_features), existing[0].id,
      ]
    );
  } else {
    await pool.query(
      `INSERT INTO about_story (
        intro_eyebrow, intro_title, intro_description, intro_badges,
        story_eyebrow, story_title, story_p1, story_p2, story_p3, story_p4,
        story_image, story_image_badge, story_card_title, story_card_sub, story_card_badge,
        story_features, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        intro_eyebrow, intro_title, intro_description, JSON.stringify(intro_badges),
        story_eyebrow, story_title, story_p1, story_p2, story_p3, story_p4,
        storyImageUrl, story_image_badge, story_card_title, story_card_sub, story_card_badge,
        JSON.stringify(story_features),
      ]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/story');
  redirect('/admin/about');
}

// ==========================================
// 4. CRAFTSMANSHIP (5 LAYERS)
// ==========================================
export async function getCraftsmanshipLayers() {
  const [rows]: any = await pool.query('SELECT * FROM about_craftsmanship ORDER BY sort_order ASC, id ASC');
  return rows || [];
}

export async function getCraftsmanshipById(id: number | string) {
  const [rows]: any = await pool.query('SELECT * FROM about_craftsmanship WHERE id = ? LIMIT 1', [id]);
  return rows?.[0] || null;
}

export async function saveCraftsmanshipLayer(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | null;
  const layer_id = ((formData.get('layer_id') as string) || '').trim();
  const layer_number = ((formData.get('layer_number') as string) || '').trim();
  const name = ((formData.get('name') as string) || '').trim();
  const badge = ((formData.get('badge') as string) || '').trim();
  const tagline = ((formData.get('tagline') as string) || '').trim();
  const icon = ((formData.get('icon') as string) || '🪡').trim();
  const description = ((formData.get('description') as string) || '').trim();
  const technical_spec = ((formData.get('technical_spec') as string) || '').trim();
  const auto_trace_problem = ((formData.get('auto_trace_problem') as string) || '').trim();
  const our_manual_solution = ((formData.get('our_manual_solution') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (id) {
    await pool.query(
      `UPDATE about_craftsmanship SET
        layer_id = ?, layer_number = ?, name = ?, badge = ?, tagline = ?, icon = ?,
        description = ?, technical_spec = ?, auto_trace_problem = ?, our_manual_solution = ?,
        sort_order = ?, is_active = ? WHERE id = ?`,
      [layer_id, layer_number, name, badge, tagline, icon, description, technical_spec, auto_trace_problem, our_manual_solution, sort_order, is_active, id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_craftsmanship (layer_id, layer_number, name, badge, tagline, icon, description, technical_spec, auto_trace_problem, our_manual_solution, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [layer_id, layer_number, name, badge, tagline, icon, description, technical_spec, auto_trace_problem, our_manual_solution, sort_order, is_active]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/craftsmanship');
  redirect('/admin/about/craftsmanship');
}

export async function deleteCraftsmanshipLayer(id: number | string): Promise<void> {
  await pool.query('DELETE FROM about_craftsmanship WHERE id = ?', [id]);
  revalidatePath('/about');
  revalidatePath('/admin/about/craftsmanship');
  redirect('/admin/about/craftsmanship');
}

// ==========================================
// 5. COMMERCIAL MACHINES
// ==========================================
export async function getAboutMachines() {
  const [rows]: any = await pool.query('SELECT * FROM about_machines ORDER BY sort_order ASC, id ASC');
  return (rows || []).map((m: any) => ({
    ...m,
    all_formats: safeParseJson(m.all_formats, []),
  }));
}

export async function getMachineById(id: number | string) {
  const [rows]: any = await pool.query('SELECT * FROM about_machines WHERE id = ? LIMIT 1', [id]);
  if (!rows || rows.length === 0) return null;
  return {
    ...rows[0],
    all_formats: safeParseJson(rows[0].all_formats, []),
  };
}

export async function saveAboutMachine(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | null;
  const machine_id = ((formData.get('machine_id') as string) || '').trim();
  const brand = ((formData.get('brand') as string) || '').trim();
  const tagline = ((formData.get('tagline') as string) || '').trim();
  const native_format = ((formData.get('native_format') as string) || '').trim();
  const all_formats_raw = (formData.get('all_formats') as string) || '';
  const all_formats = all_formats_raw.split(',').map((s) => s.trim()).filter(Boolean);
  const max_spm = ((formData.get('max_spm') as string) || '1,000 SPM').trim();
  const trim_system = ((formData.get('trim_system') as string) || '').trim();
  const tension_preset = ((formData.get('tension_preset') as string) || '').trim();
  const needle_recommendation = ((formData.get('needle_recommendation') as string) || '').trim();
  const best_use = ((formData.get('best_use') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (id) {
    await pool.query(
      `UPDATE about_machines SET
        machine_id = ?, brand = ?, tagline = ?, native_format = ?, all_formats = ?,
        max_spm = ?, trim_system = ?, tension_preset = ?, needle_recommendation = ?,
        best_use = ?, sort_order = ?, is_active = ? WHERE id = ?`,
      [machine_id, brand, tagline, native_format, JSON.stringify(all_formats), max_spm, trim_system, tension_preset, needle_recommendation, best_use, sort_order, is_active, id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_machines (machine_id, brand, tagline, native_format, all_formats, max_spm, trim_system, tension_preset, needle_recommendation, best_use, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [machine_id, brand, tagline, native_format, JSON.stringify(all_formats), max_spm, trim_system, tension_preset, needle_recommendation, best_use, sort_order, is_active]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/machines');
  redirect('/admin/about/machines');
}

export async function deleteAboutMachine(id: number | string): Promise<void> {
  await pool.query('DELETE FROM about_machines WHERE id = ?', [id]);
  revalidatePath('/about');
  revalidatePath('/admin/about/machines');
  redirect('/admin/about/machines');
}

// ==========================================
// 6. TIMELINE MILESTONES
// ==========================================
export async function getAboutTimeline() {
  const [rows]: any = await pool.query('SELECT * FROM about_timeline ORDER BY sort_order ASC, id ASC');
  return rows || [];
}

export async function getTimelineById(id: number | string) {
  const [rows]: any = await pool.query('SELECT * FROM about_timeline WHERE id = ? LIMIT 1', [id]);
  return rows?.[0] || null;
}

export async function saveAboutTimeline(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | null;
  const year = ((formData.get('year') as string) || '').trim();
  const title = ((formData.get('title') as string) || '').trim();
  const tagline = ((formData.get('tagline') as string) || '').trim();
  const description = ((formData.get('description') as string) || '').trim();
  const highlight = ((formData.get('highlight') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (id) {
    await pool.query(
      `UPDATE about_timeline SET
        year = ?, title = ?, tagline = ?, description = ?, highlight = ?, sort_order = ?, is_active = ?
        WHERE id = ?`,
      [year, title, tagline, description, highlight, sort_order, is_active, id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_timeline (year, title, tagline, description, highlight, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [year, title, tagline, description, highlight, sort_order, is_active]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/timeline');
  redirect('/admin/about/timeline');
}

export async function deleteAboutTimeline(id: number | string): Promise<void> {
  await pool.query('DELETE FROM about_timeline WHERE id = ?', [id]);
  revalidatePath('/about');
  revalidatePath('/admin/about/timeline');
  redirect('/admin/about/timeline');
}

// ==========================================
// 7. WHY CHOOSE US PILLARS
// ==========================================
export async function getAboutWhyChoose() {
  const [rows]: any = await pool.query('SELECT * FROM about_why_choose ORDER BY sort_order ASC, id ASC');
  return rows || [];
}

export async function getWhyChooseById(id: number | string) {
  const [rows]: any = await pool.query('SELECT * FROM about_why_choose WHERE id = ? LIMIT 1', [id]);
  return rows?.[0] || null;
}

export async function saveAboutWhyChoose(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | null;
  const title = ((formData.get('title') as string) || '').trim();
  const subtitle = ((formData.get('subtitle') as string) || '').trim();
  const description = ((formData.get('description') as string) || '').trim();
  const icon = ((formData.get('icon') as string) || '🎖️').trim();
  const badge = ((formData.get('badge') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (id) {
    await pool.query(
      `UPDATE about_why_choose SET
        title = ?, subtitle = ?, description = ?, icon = ?, badge = ?, sort_order = ?, is_active = ?
        WHERE id = ?`,
      [title, subtitle, description, icon, badge, sort_order, is_active, id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_why_choose (title, subtitle, description, icon, badge, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, subtitle, description, icon, badge, sort_order, is_active]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/why-choose');
  redirect('/admin/about/why-choose');
}

export async function deleteAboutWhyChoose(id: number | string): Promise<void> {
  await pool.query('DELETE FROM about_why_choose WHERE id = ?', [id]);
  revalidatePath('/about');
  revalidatePath('/admin/about/why-choose');
  redirect('/admin/about/why-choose');
}

// ==========================================
// 8. GLOBAL PRESENCE
// ==========================================
export async function getAboutGlobalPresence() {
  const [rows]: any = await pool.query('SELECT * FROM about_global_presence ORDER BY sort_order ASC, id ASC');
  return rows || [];
}

export async function getGlobalPresenceById(id: number | string) {
  const [rows]: any = await pool.query('SELECT * FROM about_global_presence WHERE id = ? LIMIT 1', [id]);
  return rows?.[0] || null;
}

export async function saveAboutGlobalPresence(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | null;
  const country = ((formData.get('country') as string) || '').trim();
  const flag = ((formData.get('flag') as string) || '🌍').trim();
  const percentage = ((formData.get('percentage') as string) || '').trim();
  const highlight = ((formData.get('highlight') as string) || '').trim();
  const cities = ((formData.get('cities') as string) || '').trim();
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
  const is_active = formData.get('is_active') === '0' ? 0 : 1;

  if (id) {
    await pool.query(
      `UPDATE about_global_presence SET
        country = ?, flag = ?, percentage = ?, highlight = ?, cities = ?, sort_order = ?, is_active = ?
        WHERE id = ?`,
      [country, flag, percentage, highlight, cities, sort_order, is_active, id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_global_presence (country, flag, percentage, highlight, cities, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [country, flag, percentage, highlight, cities, sort_order, is_active]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/global-presence');
  redirect('/admin/about/global-presence');
}

export async function deleteAboutGlobalPresence(id: number | string): Promise<void> {
  await pool.query('DELETE FROM about_global_presence WHERE id = ?', [id]);
  revalidatePath('/about');
  revalidatePath('/admin/about/global-presence');
  redirect('/admin/about/global-presence');
}

// ==========================================
// 9. CTA & CONTACT DETAILS
// ==========================================
export async function getAboutCta() {
  const [rows]: any = await pool.query('SELECT * FROM about_cta ORDER BY id ASC LIMIT 1');
  return rows?.[0] || null;
}

export async function updateAboutCta(formData: FormData): Promise<void> {
  const cta_eyebrow = ((formData.get('cta_eyebrow') as string) || '').trim();
  const cta_title = ((formData.get('cta_title') as string) || '').trim();
  const cta_description = ((formData.get('cta_description') as string) || '').trim();
  const contact_phone = ((formData.get('contact_phone') as string) || '').trim();
  const contact_email = ((formData.get('contact_email') as string) || '').trim();
  const contact_hours = ((formData.get('contact_hours') as string) || '').trim();

  const [existing]: any = await pool.query('SELECT * FROM about_cta LIMIT 1');
  if (existing && existing.length > 0) {
    await pool.query(
      `UPDATE about_cta SET
        cta_eyebrow = ?, cta_title = ?, cta_description = ?,
        contact_phone = ?, contact_email = ?, contact_hours = ?
        WHERE id = ?`,
      [cta_eyebrow, cta_title, cta_description, contact_phone, contact_email, contact_hours, existing[0].id]
    );
  } else {
    await pool.query(
      `INSERT INTO about_cta (cta_eyebrow, cta_title, cta_description, contact_phone, contact_email, contact_hours, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [cta_eyebrow, cta_title, cta_description, contact_phone, contact_email, contact_hours]
    );
  }

  revalidatePath('/about');
  revalidatePath('/admin/about/cta');
  redirect('/admin/about');
}
