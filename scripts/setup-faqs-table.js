const mysql = require('mysql2/promise');

async function setupFaqsTable() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newleafskills',
  });

  console.log('Connecting to MySQL database `newleafskills`...');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question VARCHAR(500) NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(100) DEFAULT 'General',
      page_location VARCHAR(50) DEFAULT 'all',
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableQuery);
  console.log('✓ Table `faqs` created or verified successfully in database.');

  // Check if any record exists
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM faqs');
  if (rows[0].count === 0) {
    console.log('No FAQs found. Seeding initial data from current website...');

    const seedFaqs = [
      {
        question: 'How fast can I receive my digitized embroidery file?',
        answer: 'Standard delivery takes only 6 to 8 hours. We also provide a dedicated 2–3 hour rush turnaround option for emergency apparel production runs.',
        category: 'Turnaround',
        page_location: 'all',
        sort_order: 1
      },
      {
        question: 'What embroidery machine formats do you provide?',
        answer: 'We deliver all commercial and home machine formats including Tajima (.DST), Brother (.PES), Melco/Bernina (.EXP), Janome (.JEF), Husqvarna (.HUS), Pfaff (.VP3), Singer (.XXX), Wilcom (.EMB), plus a full color-stop PDF production worksheet.',
        category: 'Formats',
        page_location: 'all',
        sort_order: 2
      },
      {
        question: 'Do you offer free revisions if adjustments are needed?',
        answer: 'Yes, 100% unlimited free revisions on every order. If you need stitch density adjusted, sizing tweaked, or thread color changes, our team updates it promptly at no extra charge.',
        category: 'Quality & Revisions',
        page_location: 'all',
        sort_order: 3
      },
      {
        question: 'How do you guarantee zero thread breakage?',
        answer: 'Every stitch path is manually punched by master artists using optimal underlay sequencing, pull compensation tailored to your specific fabric (cap, fleece, polo), and calibrated stitch angles that run effortlessly at 1,000+ SPM.',
        category: 'Quality & Revisions',
        page_location: 'all',
        sort_order: 4
      },
      {
        question: 'Can you convert low-resolution images into clean vector art?',
        answer: 'Absolutely. We redraw raster photos, sketches, or low-res PNG/JPG logos into infinitely scalable vector files (AI, EPS, SVG, PDF) calibrated with exact Pantone colors.',
        category: 'Design & Vector',
        page_location: 'all',
        sort_order: 5
      },
      {
        question: 'How is New Leaf Skills different from cheap automated auto-digitizing websites?',
        answer: 'Cheap automated online tools use rudimentary vector-tracing algorithms that do not account for fabric stretch, needle deflection, or stitch pathing. At New Leaf Skills, every single file is manually hand-punched by digitizers with 22+ years of embroidery machine experience, ensuring zero thread breaks and crisp sewouts on the first run.',
        category: 'Studio Craftsmanship',
        page_location: 'all',
        sort_order: 6
      },
      {
        question: 'Do you offer computerized embroidery production or just digitizing files?',
        answer: 'We specialize in both master embroidery digitizing and computerized commercial embroidery production. Whether you need machine-ready embroidery files for your own factory or full-service stitched garment production, our team has the capacity to support your brand.',
        category: 'Services',
        page_location: 'all',
        sort_order: 7
      }
    ];

    for (const item of seedFaqs) {
      await pool.query(
        'INSERT INTO faqs (question, answer, category, page_location, sort_order, is_active) VALUES (?, ?, ?, ?, ?, 1)',
        [item.question, item.answer, item.category, item.page_location, item.sort_order]
      );
    }

    console.log(`✓ Successfully seeded ${seedFaqs.length} initial FAQs into MySQL!`);
  } else {
    console.log(`✓ faqs table already has ${rows[0].count} records.`);
  }

  const [sample] = await pool.query('SELECT id, question, page_location, is_active FROM faqs LIMIT 5');
  console.log('Sample data in MySQL:', sample);

  await pool.end();
}

setupFaqsTable().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
