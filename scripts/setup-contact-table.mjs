import pool from '../lib/db.js';

async function setupContactTable() {
  const sql = `
  CREATE TABLE IF NOT EXISTS contact_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    /* Section 1: Home Contact / Free Quote (QuoteFaqSection) */
    home_badge VARCHAR(255) DEFAULT 'Fast Response Studio',
    home_heading VARCHAR(255) DEFAULT 'Get Your Free Quote & Sewout Estimate',
    home_description TEXT,
    home_support_title VARCHAR(255) DEFAULT 'Need an Instant Answer?',
    home_support_desc TEXT,
    home_support_phone VARCHAR(100) DEFAULT '+91 99237 90520',
    home_support_email VARCHAR(150) DEFAULT 'info@newleafskills.com',
    home_faq_badge VARCHAR(100) DEFAULT 'Got Questions?',
    home_faq_heading VARCHAR(255) DEFAULT 'Frequently Asked Questions',
    home_faq_desc TEXT,
    
    /* Section 2: Contact Page Hero Banner */
    hero_badge VARCHAR(255) DEFAULT '24/7 Global Commercial Punching Studio',
    hero_title VARCHAR(255) DEFAULT 'Contact',
    hero_title_accent VARCHAR(255) DEFAULT 'Inquiries & Quotes',
    hero_description TEXT,
    hero_bg_image VARCHAR(500) DEFAULT '/contact/studio-hero.jpg',
    
    /* Section 3: Contact Page Trust Highlights */
    intro_badge VARCHAR(255) DEFAULT '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response',
    intro_title_prefix VARCHAR(255) DEFAULT 'Contact Us :',
    intro_title_highlight VARCHAR(255) DEFAULT 'We Love to Hear',
    intro_title_suffix VARCHAR(255) DEFAULT 'From Our Customers',
    intro_description TEXT,
    trust_highlights JSON,
    
    /* Section 4: Contact Cards (4 Cards) */
    contact_cards JSON,
    
    /* Section 5: Quote / Inquiry Section & Studio Showcase */
    form_badge VARCHAR(255) DEFAULT '✨ Fast-Track Inquiry',
    form_heading VARCHAR(255) DEFAULT 'Send Us a Message or Request a Quote',
    form_description TEXT,
    studio_image_1 VARCHAR(500) DEFAULT '/contact/studio-hero.jpg',
    studio_title_1 VARCHAR(255) DEFAULT 'Tajima & Barudan Commercial Sew-out Lab',
    studio_desc_1 TEXT,
    studio_badge_1 VARCHAR(255) DEFAULT 'Live Digitizing Studio',
    studio_stat_1 VARCHAR(100) DEFAULT '22+ Years',
    studio_stat_sub_1 VARCHAR(100) DEFAULT 'Manual Punching',
    studio_stat_tag_1 VARCHAR(100) DEFAULT '1,000 SPM Calibrated',
    
    studio_image_2 VARCHAR(500) DEFAULT '/contact/support-specialist.jpg',
    studio_badge_2 VARCHAR(255) DEFAULT 'Quality Inspection Desk',
    studio_title_2 VARCHAR(255) DEFAULT 'Dedicated Punching Supervisors On Duty',
    studio_desc_2 TEXT,
    
    urgent_badge VARCHAR(255) DEFAULT '⚡ Instant Studio Messenger',
    urgent_heading VARCHAR(255) DEFAULT 'Need Emergency Rush Digitizing or Urgent Revision?',
    urgent_desc TEXT,
    urgent_whatsapp_text VARCHAR(255) DEFAULT '💬 Chat on WhatsApp (+91 9923790520)',
    urgent_whatsapp_number VARCHAR(100) DEFAULT '+91 9923790520',
    urgent_call_text VARCHAR(100) DEFAULT '📞 Call Studio',
    urgent_call_number VARCHAR(100) DEFAULT '+91 9923790520',
    
    /* Section 6: Office & Map */
    map_badge VARCHAR(255) DEFAULT 'Studio Location',
    map_heading VARCHAR(255) DEFAULT 'Visit Our Digitization & Test Production Facility',
    map_desc TEXT,
    office_title VARCHAR(255) DEFAULT 'Registered Office',
    office_name VARCHAR(255) DEFAULT 'NewLeaf Skills Studio',
    office_line1 VARCHAR(255) DEFAULT 'C/O, Chaudhari Cable Network, 1440',
    office_line2 VARCHAR(255) DEFAULT 'Near Budh Nagar, Asi Nagar Gurudwara',
    office_city_state VARCHAR(255) DEFAULT 'Nagpur, Maharashtra 440017',
    office_country VARCHAR(100) DEFAULT 'India',
    office_phone VARCHAR(100) DEFAULT '+91 9923790520',
    office_phone_formatted VARCHAR(100) DEFAULT '+91 99237 90520',
    office_email VARCHAR(150) DEFAULT 'info@newleafskills.com',
    office_hours VARCHAR(255) DEFAULT '24/7 Round-the-clock',
    map_embed_url TEXT,
    map_directions_url TEXT,
    
    /* Section 7: Contact Page FAQ & Bottom CTA */
    faq_badge VARCHAR(255) DEFAULT 'Got Questions?',
    faq_heading VARCHAR(255) DEFAULT 'Frequently Asked Questions About Contacting Us',
    faq_description TEXT,
    faq_cta_heading VARCHAR(255) DEFAULT 'Don’t see what you are looking for?',
    faq_cta_desc TEXT,
    
    sort_order INT DEFAULT 0,
    is_active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(sql);
  console.log('✅ Table contact_content created successfully or already exists.');

  // Check if initial row exists
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM contact_content');
  if (rows[0].count === 0) {
    const defaultHighlights = JSON.stringify([
      "6–8h Standard Turnaround",
      "2-Hour Rush Available",
      "Zero Thread Break Guarantee",
      "10,000+ Happy Embroidery Shops"
    ]);

    const defaultContactCards = JSON.stringify([
      {
        title: "Phone & Live Hotline",
        badge: "Instant Response",
        description: "Speak directly with our studio manager or production supervisor.",
        primaryDetail: "+91 99237 90520 (India HQ)",
        secondaryDetail: "+91 99237 90520 (US Toll-Free)",
        icon: "📞",
        actionText: "Call India Studio",
        actionHref: "tel:+919923790520"
      },
      {
        title: "Official Email Inquiries",
        badge: "15-Min Reply",
        description: "Send artwork, mockups, or custom quotation specifications.",
        primaryDetail: "info@newleafskills.com",
        secondaryDetail: "newleafskills@gmail.com",
        icon: "✉️",
        actionText: "Send Email",
        actionHref: "mailto:info@newleafskills.com"
      },
      {
        title: "Production Studio & HQ",
        badge: "Nagpur Hub",
        description: "Our physical digitization facility & computerized testing lab.",
        primaryDetail: "1440 Near Budh Nagar, Asi Nagar",
        secondaryDetail: "Nagpur, Maharashtra 440017, India",
        icon: "📍",
        actionText: "Open in Maps",
        actionHref: "https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6"
      },
      {
        title: "Studio Production Hours",
        badge: "24/7 Active",
        description: "Non-stop production shifts serving US, UK, Europe & India.",
        primaryDetail: "24 Hours / 7 Days a Week",
        secondaryDetail: "Turnaround: 6–8 hrs (Rush: 2 hrs)",
        icon: "⚡",
        actionText: "WhatsApp Quick Chat",
        actionHref: "https://wa.me/919923790520?text=Hi%20NewLeaf%20Skills,%20I%20have%20an%20embroidery%20digitizing%20inquiry."
      }
    ]);

    await pool.query(`
      INSERT INTO contact_content (
        home_badge,
        home_heading,
        home_description,
        home_support_title,
        home_support_desc,
        home_support_phone,
        home_support_email,
        home_faq_badge,
        home_faq_heading,
        home_faq_desc,
        
        hero_badge,
        hero_title,
        hero_title_accent,
        hero_description,
        hero_bg_image,
        
        intro_badge,
        intro_title_prefix,
        intro_title_highlight,
        intro_title_suffix,
        intro_description,
        trust_highlights,
        
        contact_cards,
        
        form_badge,
        form_heading,
        form_description,
        studio_image_1,
        studio_title_1,
        studio_desc_1,
        studio_badge_1,
        studio_stat_1,
        studio_stat_sub_1,
        studio_stat_tag_1,
        
        studio_image_2,
        studio_badge_2,
        studio_title_2,
        studio_desc_2,
        
        urgent_badge,
        urgent_heading,
        urgent_desc,
        urgent_whatsapp_text,
        urgent_whatsapp_number,
        urgent_call_text,
        urgent_call_number,
        
        map_badge,
        map_heading,
        map_desc,
        office_title,
        office_name,
        office_line1,
        office_line2,
        office_city_state,
        office_country,
        office_phone,
        office_phone_formatted,
        office_email,
        office_hours,
        map_embed_url,
        map_directions_url,
        
        faq_badge,
        faq_heading,
        faq_description,
        faq_cta_heading,
        faq_cta_desc,
        
        sort_order,
        is_active
      ) VALUES (
        'Fast Response Studio',
        'Get Your Free Quote & Sewout Estimate',
        'Upload your design file and receive an exact price quote, stitch count estimate, and digital preview in 30 minutes.',
        'Need an Instant Answer?',
        'Our digitizers are active 24/7 on WhatsApp & live chat',
        '+91 99237 90520',
        'info@newleafskills.com',
        'Got Questions?',
        'Frequently Asked Questions',
        'Everything you need to know about our digitizing process, machines, file formats & turnaround.',
        
        '24/7 Global Commercial Punching Studio',
        'Contact',
        'Inquiries & Quotes',
        'Connect with our master digitizers. Request free sew-out tests, stitch count estimates, or discuss custom commercial contracts 24/7.',
        '/contact/studio-hero.jpg',
        
        '⚡ 24/7 Global Digitizing Studio • 15-Minute Average Response',
        'Contact Us :',
        'We Love to Hear',
        'From Our Customers',
        'We love to hear from our customers. Please feel free to contact us with any questions you may have. Whether you are an embroidery shop, apparel brand, or custom decorator, our master punchers are here 24/7. Send us your artwork, request a free sew-out estimate, or consult with our commercial punching specialists anytime.',
        ?,
        
        ?,
        
        '✨ Fast-Track Inquiry',
        'Send Us a Message or Request a Quote',
        'Submit your artwork details below. You will receive an exact stitch count, sewout preview, and price estimate within 15 minutes.',
        '/contact/studio-hero.jpg',
        'Tajima & Barudan Commercial Sew-out Lab',
        'Hand-punched stitch paths tested on real machines before customer dispatch.',
        'Live Digitizing Studio',
        '22+ Years',
        'Manual Punching',
        '1,000 SPM Calibrated',
        
        '/contact/support-specialist.jpg',
        'Quality Inspection Desk',
        'Dedicated Punching Supervisors On Duty',
        'Every stitch angle, pull compensation, and tie-off is inspected with a 10x magnifier to guarantee zero thread breaks.',
        
        '⚡ Instant Studio Messenger',
        'Need Emergency Rush Digitizing or Urgent Revision?',
        'Message our shift supervisor directly on WhatsApp or call our hotline for an immediate turnaround slot.',
        '💬 Chat on WhatsApp (+91 9923790520)',
        '+91 9923790520',
        '📞 Call Studio',
        '+91 9923790520',
        
        'Studio Location',
        'Visit Our Digitization & Test Production Facility',
        'Situated in Nagpur, Maharashtra, our facility houses multi-head commercial machines, Wilcom & Pulse digitizing suites, and our 24/7 client dispatch crew.',
        'Registered Office',
        'NewLeaf Skills Studio',
        'C/O, Chaudhari Cable Network, 1440',
        'Near Budh Nagar, Asi Nagar Gurudwara',
        'Nagpur, Maharashtra 440017',
        'India',
        '+91 9923790520',
        '+91 99237 90520',
        'info@newleafskills.com',
        '24/7 Round-the-clock',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0906325510617!2d79.1176211758781!3d21.188556582236353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c70034d650ff%3A0xc39bc6dfa42bf43!2sCodereva%20-%20AI%20and%20Software%20Development%20Company!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
        'https://maps.app.goo.gl/6EQSKCUPYBFZ5knd6',
        
        'Got Questions?',
        'Frequently Asked Questions About Contacting Us',
        'Everything you need to know about placing inquiries, turnarounds, machine sewouts, and revisions.',
        'Don’t see what you are looking for?',
        'Our embroidery digitizers are standing by 24/7. Reach out via email or call our direct hotline for customized commercial quotes.',
        0,
        1
      )
    `, [defaultHighlights, defaultContactCards]);
    console.log('✅ Default row inserted into contact_content successfully!');
  } else {
    console.log('ℹ️ contact_content already contains records.');
  }

  process.exit(0);
}

setupContactTable().catch(err => {
  console.error('❌ Error setting up contact_content table:', err);
  process.exit(1);
});

