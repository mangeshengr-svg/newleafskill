const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// We will extract servicesData from data/servicesData.ts
async function setupServicesTable() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newleafskills',
  });

  console.log('Connecting to database...');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_id VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      num VARCHAR(10) NOT NULL,
      title VARCHAR(255) NOT NULL,
      tag VARCHAR(150) NOT NULL,
      badge VARCHAR(150) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      secondary_image VARCHAR(255) DEFAULT '',
      short_desc TEXT NOT NULL,
      full_desc JSON NOT NULL,
      key_highlights JSON NOT NULL,
      sub_offerings JSON NOT NULL,
      fabrics JSON NOT NULL,
      machine_formats JSON NOT NULL,
      turnaround VARCHAR(100) NOT NULL,
      revisions VARCHAR(100) NOT NULL,
      target_industries JSON NOT NULL,
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableQuery);
  console.log('✓ Table `services` created or already exists.');

  // Check if any services exist
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM services');
  if (rows[0].count === 0) {
    console.log('No services found in database. Seeding default services from data/servicesData.ts...');
    
    // Read and parse data/servicesData.ts
    // Let's load the data from TS file
    const tsFile = fs.readFileSync(path.join(__dirname, '../data/servicesData.ts'), 'utf8');
    // Extract servicesData array
    const jsonMatch = tsFile.match(/export const servicesData: ServiceItem\[\] = (\[[\s\S]*?\]);/);
    if (jsonMatch) {
      // Evaluate or parse the JS object literal safely
      const rawData = jsonMatch[1];
      const services = eval(rawData);
      
      for (let i = 0; i < services.length; i++) {
        const s = services[i];
        await pool.query(
          `INSERT INTO services 
           (service_id, slug, num, title, tag, badge, category, image, secondary_image, short_desc, full_desc, key_highlights, sub_offerings, fabrics, machine_formats, turnaround, revisions, target_industries, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id,
            s.slug,
            s.num,
            s.title,
            s.tag,
            s.badge,
            s.category,
            s.image,
            s.secondaryImage || '',
            s.shortDesc,
            JSON.stringify(s.fullDesc || []),
            JSON.stringify(s.keyHighlights || []),
            JSON.stringify(s.subOfferings || []),
            JSON.stringify(s.fabrics || []),
            JSON.stringify(s.machineFormats || []),
            s.turnaround,
            s.revisions,
            JSON.stringify(s.targetIndustries || []),
            i + 1
          ]
        );
      }
      console.log(`✓ Successfully seeded ${services.length} services!`);
    } else {
      console.warn('Could not match servicesData in servicesData.ts');
    }
  } else {
    console.log(`✓ Services table already has ${rows[0].count} records.`);
  }

  const [all] = await pool.query('SELECT id, num, slug, title FROM services');
  console.log('Current services in DB:', all);
  await pool.end();
}

setupServicesTable().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
