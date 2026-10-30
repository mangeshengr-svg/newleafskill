const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupOurWorkTable() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newleafskills',
  });

  console.log('Connecting to database...');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS our_work (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      tag VARCHAR(150) NOT NULL,
      stitches VARCHAR(100) NOT NULL,
      colors VARCHAR(150) NOT NULL,
      fabric VARCHAR(150) NOT NULL,
      machine VARCHAR(150) NOT NULL,
      turnaround VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      punching_notes TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableQuery);
  console.log('✓ Table `our_work` created or already exists.');

  // Check if any projects exist
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM our_work');
  if (rows[0].count === 0) {
    console.log('No work projects found in database. Seeding default projects from data/workProjects.ts...');

    const tsFile = fs.readFileSync(path.join(__dirname, '../data/workProjects.ts'), 'utf8');
    const jsonMatch = tsFile.match(/export const workProjects: WorkProject\[\] = (\[[\s\S]*?\]);/);
    if (jsonMatch) {
      const rawData = jsonMatch[1];
      const projects = eval(rawData);

      for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await pool.query(
          `INSERT INTO our_work 
           (id, title, category, image, tag, stitches, colors, fabric, machine, turnaround, description, punching_notes, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            p.id,
            p.title,
            p.category,
            p.image,
            p.tag,
            p.stitches,
            p.colors,
            p.fabric,
            p.machine,
            p.turnaround,
            p.description,
            p.punchingNotes,
            i + 1
          ]
        );
      }
      console.log(`✓ Successfully seeded ${projects.length} work projects!`);
    } else {
      console.warn('Could not match workProjects in workProjects.ts');
    }
  } else {
    console.log(`✓ our_work table already has ${rows[0].count} records.`);
  }

  const [all] = await pool.query('SELECT id, title, category, stitches FROM our_work LIMIT 5');
  console.log('Sample work projects in DB:', all);
  await pool.end();
}

setupOurWorkTable().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
