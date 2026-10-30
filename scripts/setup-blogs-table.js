const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupBlogsTable() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newleafskills',
  });

  console.log('Connecting to MySQL database `newleafskills`...');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      tags JSON NOT NULL,
      author VARCHAR(100) NOT NULL DEFAULT 'Admin',
      author_role VARCHAR(150) NOT NULL DEFAULT 'Master Digitizing Studio',
      date VARCHAR(100) NOT NULL,
      read_time VARCHAR(50) NOT NULL,
      image VARCHAR(255) NOT NULL,
      featured TINYINT DEFAULT 0,
      content JSON NOT NULL,
      key_takeaways JSON NULL,
      comments_count INT DEFAULT 0,
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createTableQuery);
  console.log('✓ Table `blogs` created or verified successfully in database.');

  // Check if any blog posts exist
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM blogs');
  if (rows[0].count === 0) {
    console.log('No blogs found in database. Seeding existing blogs from data/blogPosts.ts...');

    const tsFile = fs.readFileSync(path.join(__dirname, '../data/blogPosts.ts'), 'utf8');
    // Extract blogPosts array
    const jsonMatch = tsFile.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
    if (jsonMatch) {
      const rawData = jsonMatch[1];
      const posts = eval(rawData);

      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        await pool.query(
          `INSERT INTO blogs 
           (slug, title, excerpt, category, tags, author, author_role, date, read_time, image, featured, content, key_takeaways, comments_count, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            p.slug,
            p.title,
            p.excerpt,
            p.category,
            JSON.stringify(p.tags || []),
            p.author || 'Admin',
            p.authorRole || 'Master Digitizing Studio',
            p.date || 'October 20, 2026',
            p.readTime || '4 min read',
            p.image || '/blog/blog-hero-banner.jpg',
            p.featured ? 1 : 0,
            JSON.stringify(p.content || []),
            JSON.stringify(p.keyTakeaways || []),
            p.commentsCount || 0,
            i + 1
          ]
        );
      }
      console.log(`✓ Successfully seeded ${posts.length} blog posts into MySQL!`);
    } else {
      console.warn('Could not match blogPosts in blogPosts.ts');
    }
  } else {
    console.log(`✓ blogs table already has ${rows[0].count} records.`);
  }

  const [sample] = await pool.query('SELECT id, slug, title, category, date FROM blogs LIMIT 3');
  console.log('Sample blogs in MySQL:', sample);

  await pool.end();
}

setupBlogsTable().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
