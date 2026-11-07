import pool from '../lib/db.js';

async function migrate() {
  console.log('--- 1. Creating service_categories table ---');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      slug VARCHAR(150) NOT NULL UNIQUE,
      parent_id INT NULL DEFAULT NULL,
      description TEXT NULL,
      sort_order INT DEFAULT 0,
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX (parent_id),
      FOREIGN KEY (parent_id) REFERENCES service_categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('✓ service_categories table ready');

  console.log('--- 2. Checking services table columns ---');
  const [cols] = await pool.query('DESCRIBE services');
  const colNames = cols.map(c => c.Field);

  if (!colNames.includes('category_id')) {
    await pool.query('ALTER TABLE services ADD COLUMN category_id INT NULL DEFAULT NULL AFTER category');
    console.log('✓ Added category_id');
  }
  if (!colNames.includes('subcategory_id')) {
    await pool.query('ALTER TABLE services ADD COLUMN subcategory_id INT NULL DEFAULT NULL AFTER category_id');
    console.log('✓ Added subcategory_id');
  }
  if (!colNames.includes('subcategory')) {
    await pool.query('ALTER TABLE services ADD COLUMN subcategory VARCHAR(100) NULL DEFAULT NULL AFTER subcategory_id');
    console.log('✓ Added subcategory');
  }
  if (!colNames.includes('meta_title')) {
    await pool.query('ALTER TABLE services ADD COLUMN meta_title VARCHAR(255) NULL DEFAULT NULL AFTER short_desc');
    console.log('✓ Added meta_title');
  }
  if (!colNames.includes('meta_description')) {
    await pool.query('ALTER TABLE services ADD COLUMN meta_description TEXT NULL DEFAULT NULL AFTER meta_title');
    console.log('✓ Added meta_description');
  }
  if (!colNames.includes('image_alt')) {
    await pool.query('ALTER TABLE services ADD COLUMN image_alt VARCHAR(255) NULL DEFAULT NULL AFTER image');
    console.log('✓ Added image_alt');
  }

  // Populate categories if empty
  const [existingCats] = await pool.query('SELECT COUNT(*) as count FROM service_categories');
  if (existingCats[0].count === 0) {
    console.log('Seeding initial categories from existing services & standard offerings...');
    const mainCategories = [
      { name: 'Embroidery Digitizing', slug: 'embroidery-digitizing', desc: 'Commercial custom embroidery punching & digitizing solutions' },
      { name: 'Vector Art & Artwork Conversion', slug: 'vector-art', desc: 'Raster to high-resolution clean vector conversion' },
      { name: 'Patches & Badges', slug: 'patches-badges', desc: 'Embroidered, woven and PVC patch digitizing' },
      { name: 'Specialty & 3D Embroidery', slug: 'specialty-3d-embroidery', desc: '3D foam puff, applique, chenille, and sacred vestments' },
    ];

    for (let i = 0; i < mainCategories.length; i++) {
      const c = mainCategories[i];
      const [res] = await pool.query(
        'INSERT INTO service_categories (name, slug, parent_id, description, sort_order) VALUES (?, ?, NULL, ?, ?)',
        [c.name, c.slug, c.desc, i + 1]
      );
      const parentId = res.insertId;

      // Subcategories for Embroidery Digitizing
      if (c.slug === 'embroidery-digitizing') {
        const subs = [
          { name: 'Cap & Curved Visor', slug: 'cap-curved-visor' },
          { name: 'Left Chest & Uniform', slug: 'left-chest-uniform' },
          { name: 'Jacket Back & Large Punching', slug: 'jacket-back' },
          { name: 'Computerized Embroidery', slug: 'computerized-embroidery' }
        ];
        for (let j = 0; j < subs.length; j++) {
          await pool.query(
            'INSERT INTO service_categories (name, slug, parent_id, sort_order) VALUES (?, ?, ?, ?)',
            [subs[j].name, subs[j].slug, parentId, j + 1]
          );
        }
      } else if (c.slug === 'specialty-3d-embroidery') {
        const subs = [
          { name: '3D Foam Puff Digitizing', slug: '3d-foam-puff' },
          { name: 'Vestments & Sacred Liturgical', slug: 'vestments-sacred' },
          { name: 'Applique & Laser Cut', slug: 'applique-laser-cut' }
        ];
        for (let j = 0; j < subs.length; j++) {
          await pool.query(
            'INSERT INTO service_categories (name, slug, parent_id, sort_order) VALUES (?, ?, ?, ?)',
            [subs[j].name, subs[j].slug, parentId, j + 1]
          );
        }
      } else if (c.slug === 'vector-art') {
        const subs = [
          { name: 'Logo Vector Conversion', slug: 'logo-vector-conversion' },
          { name: 'Color Separation & Screen Print', slug: 'color-separation' }
        ];
        for (let j = 0; j < subs.length; j++) {
          await pool.query(
            'INSERT INTO service_categories (name, slug, parent_id, sort_order) VALUES (?, ?, ?, ?)',
            [subs[j].name, subs[j].slug, parentId, j + 1]
          );
        }
      } else if (c.slug === 'patches-badges') {
        const subs = [
          { name: 'Embroidered Merrowed Patches', slug: 'embroidered-patches' },
          { name: 'Sublimated & Woven Patches', slug: 'woven-patches' }
        ];
        for (let j = 0; j < subs.length; j++) {
          await pool.query(
            'INSERT INTO service_categories (name, slug, parent_id, sort_order) VALUES (?, ?, ?, ?)',
            [subs[j].name, subs[j].slug, parentId, j + 1]
          );
        }
      }
    }
    console.log('✓ Seeded initial categories & subcategories!');
  }

  // Link existing services to appropriate category/subcategory if needed
  const [services] = await pool.query('SELECT id, slug, title, category FROM services');
  console.log('Services in db count:', services.length);
  for (const s of services) {
    let catName = 'Embroidery Digitizing';
    let subName = s.category;
    if (s.category === 'Vector Art') {
      catName = 'Vector Art & Artwork Conversion';
      subName = 'Logo Vector Conversion';
    } else if (s.category === 'Embroidered Patches') {
      catName = 'Patches & Badges';
      subName = 'Embroidered Merrowed Patches';
    } else if (s.category === '3D Foam Puff') {
      catName = 'Specialty & 3D Embroidery';
      subName = '3D Foam Puff Digitizing';
    }

    const [parent] = await pool.query('SELECT id, name FROM service_categories WHERE name = ? AND parent_id IS NULL LIMIT 1', [catName]);
    const parentId = parent.length > 0 ? parent[0].id : null;

    let subId = null;
    if (parentId && subName) {
      const [sub] = await pool.query('SELECT id, name FROM service_categories WHERE name LIKE ? AND parent_id = ? LIMIT 1', [`%${subName}%`, parentId]);
      if (sub.length > 0) subId = sub[0].id;
    }

    await pool.query(
      `UPDATE services 
        SET category = COALESCE(?, category), 
            subcategory = COALESCE(?, subcategory),
            category_id = COALESCE(?, category_id),
            subcategory_id = COALESCE(?, subcategory_id),
            meta_title = COALESCE(meta_title, CONCAT(title, ' | Commercial Digitizing Studio')),
            meta_description = COALESCE(meta_description, short_desc),
            image_alt = COALESCE(image_alt, title)
        WHERE id = ?`,
      [catName, subName, parentId, subId, s.id]
    );
  }
  console.log('✓ Updated existing services with category links and SEO defaults');

  process.exit(0);
}

migrate().catch(e => {
  console.error('Migration error:', e);
  process.exit(1);
});

