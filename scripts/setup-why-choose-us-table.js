const mysql = require('mysql2/promise');

async function setupWhyChooseUsTable() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newleafskills',
  });

  console.log('Connecting to MySQL database `newleafskills`...');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS why_choose_us (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) NOT NULL,
      eyebrow VARCHAR(150) NOT NULL DEFAULT 'Why Choose Us:',
      image VARCHAR(255) NOT NULL,
      studio_badge VARCHAR(150) DEFAULT 'Master Studio & Craftsmanship',
      studio_desc TEXT,
      experience_years VARCHAR(50) DEFAULT '22+',
      experience_title VARCHAR(100) DEFAULT 'Years Experience',
      experience_sub VARCHAR(150) DEFAULT 'Since 2002 • Pioneer Punchers',
      badge2_icon VARCHAR(50) DEFAULT '⚡',
      badge2_title VARCHAR(100) DEFAULT 'Machine-Ready Files',
      badge2_sub VARCHAR(150) DEFAULT 'Zero thread breaks • 100% Tested',
      description_1 TEXT NOT NULL,
      description_2 TEXT,
      description_3 TEXT,
      pillars JSON NOT NULL,
      capabilities JSON NOT NULL,
      btn1_text VARCHAR(100) DEFAULT 'Request Free Digitizing Quote',
      btn1_link VARCHAR(255) DEFAULT '#quote',
      btn2_text VARCHAR(100) DEFAULT 'View Our Work',
      btn2_link VARCHAR(255) DEFAULT '/our-work',
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableQuery);
  console.log('✓ Table `why_choose_us` created or verified successfully in database.');

  // Check if any record exists
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM why_choose_us');
  if (rows[0].count === 0) {
    console.log('No Why Choose Us records found. Seeding initial data from current UI...');

    const defaultPillars = [
      {
        icon: '⏱️',
        title: 'Fast Turnaround',
        description: '6–8 hour standard turnaround with 2–4 hour rush dispatch available.'
      },
      {
        icon: '🎯',
        title: 'Error-Free Digitizing',
        description: 'Calibrated stitch density, smart underlay, and zero thread breaks.'
      },
      {
        icon: '💰',
        title: 'Affordable Pricing',
        description: 'Transparent flat rates from $10 / ₹350 without any hidden setup costs.'
      },
      {
        icon: '🤝',
        title: 'Reliable 24/7 Support',
        description: '100% free unlimited edits until your sewout runs perfectly on fabric.'
      }
    ];

    const defaultCapabilities = [
      'Custom Logo Digitizing',
      '3D Puff Digitizing',
      'Cap Digitizing',
      'Patch Digitizing',
      'Applique Digitizing',
      'Vestments Embroidery',
      'Irish Dance Dress Embroidery'
    ];

    const desc1 = 'With over 22 years of experience, New Leaf Skills delivers professional Embroidery Digitizing Services with a strong focus on quality, accuracy, and customer satisfaction. Our skilled digitizers create machine-ready embroidery files that ensure smooth production and excellent stitch results.';
    const desc2 = 'We provide a wide range of services, including Custom Logo Digitizing, 3D Puff Digitizing, Cap Digitizing, Patch Digitizing, Applique Digitizing, Vestments Embroidery, and Irish Dance Dress Embroidery for clients across India and worldwide.';
    const desc3 = 'Our commitment to fast turnaround, affordable pricing, error-free digitizing, and reliable support makes us a trusted choice for embroidery businesses, apparel brands, and designers looking for high-quality embroidery solutions.';

    await pool.query(
      `INSERT INTO why_choose_us 
       (title, subtitle, eyebrow, image, studio_badge, studio_desc, experience_years, experience_title, experience_sub, badge2_icon, badge2_title, badge2_sub, description_1, description_2, description_3, pillars, capabilities, btn1_text, btn1_link, btn2_text, btn2_link, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
      [
        'New Leaf Skills',
        'Global Embroidery Digitizing & Punching Excellence',
        'Why Choose Us:',
        '/why-choose-us.jpg',
        'Master Studio & Craftsmanship',
        'Dedicated digitization facility with live Tajima & Barudan testing beds.',
        '22+',
        'Years Experience',
        'Since 2002 • Pioneer Punchers',
        '⚡',
        'Machine-Ready Files',
        'Zero thread breaks • 100% Tested',
        desc1,
        desc2,
        desc3,
        JSON.stringify(defaultPillars),
        JSON.stringify(defaultCapabilities),
        'Request Free Digitizing Quote',
        '#quote',
        'View Our Work',
        '/our-work'
      ]
    );

    console.log('✓ Successfully seeded initial Why Choose Us section into MySQL!');
  } else {
    console.log(`✓ why_choose_us table already has ${rows[0].count} records.`);
  }

  const [sample] = await pool.query('SELECT id, title, subtitle, experience_years, is_active FROM why_choose_us LIMIT 3');
  console.log('Sample data in MySQL:', sample);

  await pool.end();
}

setupWhyChooseUsTable().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
