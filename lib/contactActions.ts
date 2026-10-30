'use server';

import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ContactContentItem, ContactCardItem } from '@/types/contact';

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export async function rowToContactContent(row: any): Promise<ContactContentItem> {
  return {
    id: row.id,
    
    // 1. Home
    homeBadge: row.home_badge || 'Fast Response Studio',
    homeHeading: row.home_heading || 'Get Your Free Quote & Sewout Estimate',
    homeDescription: row.home_description || '',
    homeSupportTitle: row.home_support_title || 'Need an Instant Answer?',
    homeSupportDesc: row.home_support_desc || '',
    homeSupportPhone: row.home_support_phone || '+91 99237 90520',
    homeSupportEmail: row.home_support_email || 'info@newleafskills.com',
    homeFaqBadge: row.home_faq_badge || 'Got Questions?',
    homeFaqHeading: row.home_faq_heading || 'Frequently Asked Questions',
    homeFaqDesc: row.home_faq_desc || '',
    
    // 2. Hero
    heroBadge: row.hero_badge || '24/7 Global Commercial Punching Studio',
    heroTitle: row.hero_title || 'Contact',
    heroTitleAccent: row.hero_title_accent || 'Inquiries & Quotes',
    heroDescription: row.hero_description || '',
    heroBgImage: row.hero_bg_image || '/contact/studio-hero.jpg',
    
    // 3. Intro
    introBadge: row.intro_badge || '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response',
    introTitlePrefix: row.intro_title_prefix || 'Contact Us :',
    introTitleHighlight: row.intro_title_highlight || 'We Love to Hear',
    introTitleSuffix: row.intro_title_suffix || 'From Our Customers',
    introDescription: row.intro_description || '',
    trustHighlights: safeParseJson<string[]>(row.trust_highlights, []),
    
    // 4. Cards
    contactCards: safeParseJson<ContactCardItem[]>(row.contact_cards, []),
    
    // 5. Form & Showcase
    formBadge: row.form_badge || '✨ Fast-Track Inquiry',
    formHeading: row.form_heading || 'Send Us a Message or Request a Quote',
    formDescription: row.form_description || '',
    studioImage1: row.studio_image_1 || '/contact/studio-hero.jpg',
    studioTitle1: row.studio_title_1 || '',
    studioDesc1: row.studio_desc_1 || '',
    studioBadge1: row.studio_badge_1 || '',
    studioStat1: row.studio_stat_1 || '',
    studioStatSub1: row.studio_stat_sub_1 || '',
    studioStatTag1: row.studio_stat_tag_1 || '',
    
    studioImage2: row.studio_image_2 || '/contact/support-specialist.jpg',
    studioBadge2: row.studio_badge_2 || '',
    studioTitle2: row.studio_title_2 || '',
    studioDesc2: row.studio_desc_2 || '',
    
    urgentBadge: row.urgent_badge || '⚡ Instant Studio Messenger',
    urgentHeading: row.urgent_heading || 'Need Emergency Rush Digitizing or Urgent Revision?',
    urgentDesc: row.urgent_desc || '',
    urgentWhatsappText: row.urgent_whatsapp_text || '💬 Chat on WhatsApp (+91 9923790520)',
    urgentWhatsappNumber: row.urgent_whatsapp_number || '+91 9923790520',
    urgentCallText: row.urgent_call_text || '📞 Call Studio',
    urgentCallNumber: row.urgent_call_number || '+91 9923790520',
    
    // 6. Office
    mapBadge: row.map_badge || 'Studio Location',
    mapHeading: row.map_heading || 'Visit Our Digitization & Test Production Facility',
    mapDesc: row.map_desc || '',
    officeTitle: row.office_title || 'Registered Office',
    officeName: row.office_name || 'NewLeaf Skills Studio',
    officeLine1: row.office_line1 || '',
    officeLine2: row.office_line2 || '',
    officeCityState: row.office_city_state || '',
    officeCountry: row.office_country || 'India',
    officePhone: row.office_phone || '+91 9923790520',
    officePhoneFormatted: row.office_phone_formatted || '+91 99237 90520',
    officeEmail: row.office_email || 'info@newleafskills.com',
    officeHours: row.office_hours || '24/7 Round-the-clock',
    mapEmbedUrl: row.map_embed_url || '',
    mapDirectionsUrl: row.map_directions_url || '',
    
    // 7. FAQ & CTA
    faqBadge: row.faq_badge || 'Got Questions?',
    faqHeading: row.faq_heading || 'Frequently Asked Questions About Contacting Us',
    faqDescription: row.faq_description || '',
    faqCtaHeading: row.faq_cta_heading || 'Don’t see what you are looking for?',
    faqCtaDesc: row.faq_cta_desc || '',
    
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// 1. Fetch active contact content for public pages (home + contact page)
export async function getActiveContactContent(): Promise<ContactContentItem | null> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM contact_content WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT 1'
    );
    if (!rows || rows.length === 0) return null;
    return rowToContactContent(rows[0]);
  } catch (error) {
    console.error('Failed to fetch active contact content from DB:', error);
    return null;
  }
}

// 2. Fetch all contact records for admin
export async function getAllContactAdmin(): Promise<any[]> {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM contact_content ORDER BY sort_order ASC, id DESC'
    );
    return rows;
  } catch (error) {
    console.error('Failed to fetch contact content for admin:', error);
    return [];
  }
}

// 3. Fetch single contact record by ID
export async function getContactById(id: number | string): Promise<any | null> {
  try {
    const [rows]: any = await pool.query('SELECT * FROM contact_content WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Failed to fetch contact content by id:', error);
    return null;
  }
}

// Helper: Handle file upload and save to public/uploads
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

// 4. Create new contact content
export async function createContactContent(formData: FormData) {
  try {
    const heroBgFile = formData.get('hero_bg_image') as File | null;
    const studioImg1File = formData.get('studio_image_1') as File | null;
    const studioImg2File = formData.get('studio_image_2') as File | null;

    let heroBg = (await handleFileUpload(heroBgFile)) || '/contact/studio-hero.jpg';
    let studioImg1 = (await handleFileUpload(studioImg1File)) || '/contact/studio-hero.jpg';
    let studioImg2 = (await handleFileUpload(studioImg2File)) || '/contact/support-specialist.jpg';

    // Highlights
    const rawHighlights = (formData.get('trust_highlights') as string) || '';
    const trustHighlights = rawHighlights
      ? rawHighlights.split('\n').map(s => s.trim()).filter(Boolean)
      : [];

    // Contact Cards
    const contactCards: ContactCardItem[] = [];
    for (let i = 1; i <= 4; i++) {
      const title = (formData.get(`card_${i}_title`) as string) || '';
      if (title) {
        contactCards.push({
          title,
          badge: (formData.get(`card_${i}_badge`) as string) || '',
          description: (formData.get(`card_${i}_desc`) as string) || '',
          primaryDetail: (formData.get(`card_${i}_primary`) as string) || '',
          secondaryDetail: (formData.get(`card_${i}_secondary`) as string) || '',
          icon: (formData.get(`card_${i}_icon`) as string) || '📞',
          actionText: (formData.get(`card_${i}_action_text`) as string) || '',
          actionHref: (formData.get(`card_${i}_action_href`) as string) || '',
        });
      }
    }

    const home_badge = (formData.get('home_badge') as string) || 'Fast Response Studio';
    const home_heading = (formData.get('home_heading') as string) || 'Get Your Free Quote & Sewout Estimate';
    const home_description = (formData.get('home_description') as string) || '';
    const home_support_title = (formData.get('home_support_title') as string) || 'Need an Instant Answer?';
    const home_support_desc = (formData.get('home_support_desc') as string) || '';
    const home_support_phone = (formData.get('home_support_phone') as string) || '+91 99237 90520';
    const home_support_email = (formData.get('home_support_email') as string) || 'info@newleafskills.com';
    const home_faq_badge = (formData.get('home_faq_badge') as string) || 'Got Questions?';
    const home_faq_heading = (formData.get('home_faq_heading') as string) || 'Frequently Asked Questions';
    const home_faq_desc = (formData.get('home_faq_desc') as string) || '';

    const hero_badge = (formData.get('hero_badge') as string) || '24/7 Global Commercial Punching Studio';
    const hero_title = (formData.get('hero_title') as string) || 'Contact';
    const hero_title_accent = (formData.get('hero_title_accent') as string) || 'Inquiries & Quotes';
    const hero_description = (formData.get('hero_description') as string) || '';

    const intro_badge = (formData.get('intro_badge') as string) || '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response';
    const intro_title_prefix = (formData.get('intro_title_prefix') as string) || 'Contact Us :';
    const intro_title_highlight = (formData.get('intro_title_highlight') as string) || 'We Love to Hear';
    const intro_title_suffix = (formData.get('intro_title_suffix') as string) || 'From Our Customers';
    const intro_description = (formData.get('intro_description') as string) || '';

    const form_badge = (formData.get('form_badge') as string) || '✨ Fast-Track Inquiry';
    const form_heading = (formData.get('form_heading') as string) || 'Send Us a Message or Request a Quote';
    const form_description = (formData.get('form_description') as string) || '';

    const studio_title_1 = (formData.get('studio_title_1') as string) || '';
    const studio_desc_1 = (formData.get('studio_desc_1') as string) || '';
    const studio_badge_1 = (formData.get('studio_badge_1') as string) || '';
    const studio_stat_1 = (formData.get('studio_stat_1') as string) || '';
    const studio_stat_sub_1 = (formData.get('studio_stat_sub_1') as string) || '';
    const studio_stat_tag_1 = (formData.get('studio_stat_tag_1') as string) || '';

    const studio_badge_2 = (formData.get('studio_badge_2') as string) || '';
    const studio_title_2 = (formData.get('studio_title_2') as string) || '';
    const studio_desc_2 = (formData.get('studio_desc_2') as string) || '';

    const urgent_badge = (formData.get('urgent_badge') as string) || '';
    const urgent_heading = (formData.get('urgent_heading') as string) || '';
    const urgent_desc = (formData.get('urgent_desc') as string) || '';
    const urgent_whatsapp_text = (formData.get('urgent_whatsapp_text') as string) || '';
    const urgent_whatsapp_number = (formData.get('urgent_whatsapp_number') as string) || '';
    const urgent_call_text = (formData.get('urgent_call_text') as string) || '';
    const urgent_call_number = (formData.get('urgent_call_number') as string) || '';

    const map_badge = (formData.get('map_badge') as string) || '';
    const map_heading = (formData.get('map_heading') as string) || '';
    const map_desc = (formData.get('map_desc') as string) || '';
    const office_title = (formData.get('office_title') as string) || '';
    const office_name = (formData.get('office_name') as string) || '';
    const office_line1 = (formData.get('office_line1') as string) || '';
    const office_line2 = (formData.get('office_line2') as string) || '';
    const office_city_state = (formData.get('office_city_state') as string) || '';
    const office_country = (formData.get('office_country') as string) || 'India';
    const office_phone = (formData.get('office_phone') as string) || '';
    const office_phone_formatted = (formData.get('office_phone_formatted') as string) || '';
    const office_email = (formData.get('office_email') as string) || '';
    const office_hours = (formData.get('office_hours') as string) || '';
    const map_embed_url = (formData.get('map_embed_url') as string) || '';
    const map_directions_url = (formData.get('map_directions_url') as string) || '';

    const faq_badge = (formData.get('faq_badge') as string) || '';
    const faq_heading = (formData.get('faq_heading') as string) || '';
    const faq_description = (formData.get('faq_description') as string) || '';
    const faq_cta_heading = (formData.get('faq_cta_heading') as string) || '';
    const faq_cta_desc = (formData.get('faq_cta_desc') as string) || '';

    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === '1' ? 1 : 0;

    await pool.query(
      `INSERT INTO contact_content (
        home_badge, home_heading, home_description, home_support_title, home_support_desc, home_support_phone, home_support_email, home_faq_badge, home_faq_heading, home_faq_desc,
        hero_badge, hero_title, hero_title_accent, hero_description, hero_bg_image,
        intro_badge, intro_title_prefix, intro_title_highlight, intro_title_suffix, intro_description, trust_highlights,
        contact_cards,
        form_badge, form_heading, form_description,
        studio_image_1, studio_title_1, studio_desc_1, studio_badge_1, studio_stat_1, studio_stat_sub_1, studio_stat_tag_1,
        studio_image_2, studio_badge_2, studio_title_2, studio_desc_2,
        urgent_badge, urgent_heading, urgent_desc, urgent_whatsapp_text, urgent_whatsapp_number, urgent_call_text, urgent_call_number,
        map_badge, map_heading, map_desc, office_title, office_name, office_line1, office_line2, office_city_state, office_country, office_phone, office_phone_formatted, office_email, office_hours, map_embed_url, map_directions_url,
        faq_badge, faq_heading, faq_description, faq_cta_heading, faq_cta_desc,
        sort_order, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        home_badge, home_heading, home_description, home_support_title, home_support_desc, home_support_phone, home_support_email, home_faq_badge, home_faq_heading, home_faq_desc,
        hero_badge, hero_title, hero_title_accent, hero_description, heroBg,
        intro_badge, intro_title_prefix, intro_title_highlight, intro_title_suffix, intro_description, JSON.stringify(trustHighlights),
        JSON.stringify(contactCards),
        form_badge, form_heading, form_description,
        studioImg1, studio_title_1, studio_desc_1, studio_badge_1, studio_stat_1, studio_stat_sub_1, studio_stat_tag_1,
        studioImg2, studio_badge_2, studio_title_2, studio_desc_2,
        urgent_badge, urgent_heading, urgent_desc, urgent_whatsapp_text, urgent_whatsapp_number, urgent_call_text, urgent_call_number,
        map_badge, map_heading, map_desc, office_title, office_name, office_line1, office_line2, office_city_state, office_country, office_phone, office_phone_formatted, office_email, office_hours, map_embed_url, map_directions_url,
        faq_badge, faq_heading, faq_description, faq_cta_heading, faq_cta_desc,
        sort_order, is_active
      ]
    );

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/contact');
  } catch (error) {
    console.error('Failed to create contact content:', error);
    throw error;
  }

  redirect('/admin/contact');
}

// 5. Update contact content
export async function updateContactContent(id: number, formData: FormData) {
  try {
    const existingHeroBg = (formData.get('existing_hero_bg_image') as string) || '/contact/studio-hero.jpg';
    const existingStudioImg1 = (formData.get('existing_studio_image_1') as string) || '/contact/studio-hero.jpg';
    const existingStudioImg2 = (formData.get('existing_studio_image_2') as string) || '/contact/support-specialist.jpg';

    const heroBgFile = formData.get('hero_bg_image') as File | null;
    const studioImg1File = formData.get('studio_image_1') as File | null;
    const studioImg2File = formData.get('studio_image_2') as File | null;

    const heroBg = (await handleFileUpload(heroBgFile)) || existingHeroBg;
    const studioImg1 = (await handleFileUpload(studioImg1File)) || existingStudioImg1;
    const studioImg2 = (await handleFileUpload(studioImg2File)) || existingStudioImg2;

    // Highlights
    const rawHighlights = (formData.get('trust_highlights') as string) || '';
    const trustHighlights = rawHighlights
      ? rawHighlights.split('\n').map(s => s.trim()).filter(Boolean)
      : [];

    // Contact Cards
    const contactCards: ContactCardItem[] = [];
    for (let i = 1; i <= 4; i++) {
      const title = (formData.get(`card_${i}_title`) as string) || '';
      if (title) {
        contactCards.push({
          title,
          badge: (formData.get(`card_${i}_badge`) as string) || '',
          description: (formData.get(`card_${i}_desc`) as string) || '',
          primaryDetail: (formData.get(`card_${i}_primary`) as string) || '',
          secondaryDetail: (formData.get(`card_${i}_secondary`) as string) || '',
          icon: (formData.get(`card_${i}_icon`) as string) || '📞',
          actionText: (formData.get(`card_${i}_action_text`) as string) || '',
          actionHref: (formData.get(`card_${i}_action_href`) as string) || '',
        });
      }
    }

    const home_badge = (formData.get('home_badge') as string) || 'Fast Response Studio';
    const home_heading = (formData.get('home_heading') as string) || 'Get Your Free Quote & Sewout Estimate';
    const home_description = (formData.get('home_description') as string) || '';
    const home_support_title = (formData.get('home_support_title') as string) || 'Need an Instant Answer?';
    const home_support_desc = (formData.get('home_support_desc') as string) || '';
    const home_support_phone = (formData.get('home_support_phone') as string) || '+91 99237 90520';
    const home_support_email = (formData.get('home_support_email') as string) || 'info@newleafskills.com';
    const home_faq_badge = (formData.get('home_faq_badge') as string) || 'Got Questions?';
    const home_faq_heading = (formData.get('home_faq_heading') as string) || 'Frequently Asked Questions';
    const home_faq_desc = (formData.get('home_faq_desc') as string) || '';

    const hero_badge = (formData.get('hero_badge') as string) || '24/7 Global Commercial Punching Studio';
    const hero_title = (formData.get('hero_title') as string) || 'Contact';
    const hero_title_accent = (formData.get('hero_title_accent') as string) || 'Inquiries & Quotes';
    const hero_description = (formData.get('hero_description') as string) || '';

    const intro_badge = (formData.get('intro_badge') as string) || '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response';
    const intro_title_prefix = (formData.get('intro_title_prefix') as string) || 'Contact Us :';
    const intro_title_highlight = (formData.get('intro_title_highlight') as string) || 'We Love to Hear';
    const intro_title_suffix = (formData.get('intro_title_suffix') as string) || 'From Our Customers';
    const intro_description = (formData.get('intro_description') as string) || '';

    const form_badge = (formData.get('form_badge') as string) || '✨ Fast-Track Inquiry';
    const form_heading = (formData.get('form_heading') as string) || 'Send Us a Message or Request a Quote';
    const form_description = (formData.get('form_description') as string) || '';

    const studio_title_1 = (formData.get('studio_title_1') as string) || '';
    const studio_desc_1 = (formData.get('studio_desc_1') as string) || '';
    const studio_badge_1 = (formData.get('studio_badge_1') as string) || '';
    const studio_stat_1 = (formData.get('studio_stat_1') as string) || '';
    const studio_stat_sub_1 = (formData.get('studio_stat_sub_1') as string) || '';
    const studio_stat_tag_1 = (formData.get('studio_stat_tag_1') as string) || '';

    const studio_badge_2 = (formData.get('studio_badge_2') as string) || '';
    const studio_title_2 = (formData.get('studio_title_2') as string) || '';
    const studio_desc_2 = (formData.get('studio_desc_2') as string) || '';

    const urgent_badge = (formData.get('urgent_badge') as string) || '';
    const urgent_heading = (formData.get('urgent_heading') as string) || '';
    const urgent_desc = (formData.get('urgent_desc') as string) || '';
    const urgent_whatsapp_text = (formData.get('urgent_whatsapp_text') as string) || '';
    const urgent_whatsapp_number = (formData.get('urgent_whatsapp_number') as string) || '';
    const urgent_call_text = (formData.get('urgent_call_text') as string) || '';
    const urgent_call_number = (formData.get('urgent_call_number') as string) || '';

    const map_badge = (formData.get('map_badge') as string) || '';
    const map_heading = (formData.get('map_heading') as string) || '';
    const map_desc = (formData.get('map_desc') as string) || '';
    const office_title = (formData.get('office_title') as string) || '';
    const office_name = (formData.get('office_name') as string) || '';
    const office_line1 = (formData.get('office_line1') as string) || '';
    const office_line2 = (formData.get('office_line2') as string) || '';
    const office_city_state = (formData.get('office_city_state') as string) || '';
    const office_country = (formData.get('office_country') as string) || 'India';
    const office_phone = (formData.get('office_phone') as string) || '';
    const office_phone_formatted = (formData.get('office_phone_formatted') as string) || '';
    const office_email = (formData.get('office_email') as string) || '';
    const office_hours = (formData.get('office_hours') as string) || '';
    const map_embed_url = (formData.get('map_embed_url') as string) || '';
    const map_directions_url = (formData.get('map_directions_url') as string) || '';

    const faq_badge = (formData.get('faq_badge') as string) || '';
    const faq_heading = (formData.get('faq_heading') as string) || '';
    const faq_description = (formData.get('faq_description') as string) || '';
    const faq_cta_heading = (formData.get('faq_cta_heading') as string) || '';
    const faq_cta_desc = (formData.get('faq_cta_desc') as string) || '';

    const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10);
    const is_active = formData.get('is_active') === '1' ? 1 : 0;

    await pool.query(
      `UPDATE contact_content SET
        home_badge = ?, home_heading = ?, home_description = ?, home_support_title = ?, home_support_desc = ?, home_support_phone = ?, home_support_email = ?, home_faq_badge = ?, home_faq_heading = ?, home_faq_desc = ?,
        hero_badge = ?, hero_title = ?, hero_title_accent = ?, hero_description = ?, hero_bg_image = ?,
        intro_badge = ?, intro_title_prefix = ?, intro_title_highlight = ?, intro_title_suffix = ?, intro_description = ?, trust_highlights = ?,
        contact_cards = ?,
        form_badge = ?, form_heading = ?, form_description = ?,
        studio_image_1 = ?, studio_title_1 = ?, studio_desc_1 = ?, studio_badge_1 = ?, studio_stat_1 = ?, studio_stat_sub_1 = ?, studio_stat_tag_1 = ?,
        studio_image_2 = ?, studio_badge_2 = ?, studio_title_2 = ?, studio_desc_2 = ?,
        urgent_badge = ?, urgent_heading = ?, urgent_desc = ?, urgent_whatsapp_text = ?, urgent_whatsapp_number = ?, urgent_call_text = ?, urgent_call_number = ?,
        map_badge = ?, map_heading = ?, map_desc = ?, office_title = ?, office_name = ?, office_line1 = ?, office_line2 = ?, office_city_state = ?, office_country = ?, office_phone = ?, office_phone_formatted = ?, office_email = ?, office_hours = ?, map_embed_url = ?, map_directions_url = ?,
        faq_badge = ?, faq_heading = ?, faq_description = ?, faq_cta_heading = ?, faq_cta_desc = ?,
        sort_order = ?, is_active = ?
      WHERE id = ?`,
      [
        home_badge, home_heading, home_description, home_support_title, home_support_desc, home_support_phone, home_support_email, home_faq_badge, home_faq_heading, home_faq_desc,
        hero_badge, hero_title, hero_title_accent, hero_description, heroBg,
        intro_badge, intro_title_prefix, intro_title_highlight, intro_title_suffix, intro_description, JSON.stringify(trustHighlights),
        JSON.stringify(contactCards),
        form_badge, form_heading, form_description,
        studioImg1, studio_title_1, studio_desc_1, studio_badge_1, studio_stat_1, studio_stat_sub_1, studio_stat_tag_1,
        studioImg2, studio_badge_2, studio_title_2, studio_desc_2,
        urgent_badge, urgent_heading, urgent_desc, urgent_whatsapp_text, urgent_whatsapp_number, urgent_call_text, urgent_call_number,
        map_badge, map_heading, map_desc, office_title, office_name, office_line1, office_line2, office_city_state, office_country, office_phone, office_phone_formatted, office_email, office_hours, map_embed_url, map_directions_url,
        faq_badge, faq_heading, faq_description, faq_cta_heading, faq_cta_desc,
        sort_order, is_active,
        id
      ]
    );

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/contact');
  } catch (error) {
    console.error('Failed to update contact content:', error);
    throw error;
  }

  redirect('/admin/contact');
}

// 6. Delete contact content
export async function deleteContactContent(id: number) {
  try {
    await pool.query('DELETE FROM contact_content WHERE id = ?', [id]);
    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/contact');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete contact content:', error);
    throw error;
  }
}

