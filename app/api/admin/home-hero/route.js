import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// 1. Existing content fetch karne ke liye (GET)
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM home_hero_content LIMIT 1');
    return NextResponse.json({ content: rows[0] || null }, { status: 200 });
  } catch (error) {
    console.error('Fetch Hero Content Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Content update ya insert karne ke liye (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      badge_text,
      main_heading,
      description,
      btn1_text,
      btn1_link,
      btn2_text,
      btn2_link,
      stat1_value,
      stat1_label,
      stat2_value,
      stat2_label,
      stat3_value,
      stat3_label,
    } = body;

    // Check karein ki pehle se row exist karti hai ya nahi
    const [existing] = await pool.query('SELECT id FROM home_hero_content LIMIT 1');

    if (existing.length > 0) {
      // Agar hai toh UPDATE karein
      await pool.query(
        `UPDATE home_hero_content SET 
          badge_text = ?, main_heading = ?, description = ?, 
          btn1_text = ?, btn1_link = ?, btn2_text = ?, btn2_link = ?, 
          stat1_value = ?, stat1_label = ?, stat2_value = ?, stat2_label = ?, 
          stat3_value = ?, stat3_label = ? WHERE id = ?`,
        [
          badge_text, main_heading, description,
          btn1_text, btn1_link, btn2_text, btn2_link,
          stat1_value, stat1_label, stat2_value, stat2_label,
          stat3_value, stat3_label, existing[0].id
        ]
      );
    } else {
      // Agar nahi hai toh INSERT karein
      await pool.query(
        `INSERT INTO home_hero_content 
          (badge_text, main_heading, description, btn1_text, btn1_link, btn2_text, btn2_link, stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          badge_text, main_heading, description,
          btn1_text, btn1_link, btn2_text, btn2_link,
          stat1_value, stat1_label, stat2_value, stat2_label,
          stat3_value, stat3_label
        ]
      );
    }

    return NextResponse.json({ message: 'Hero content updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Save Hero Content Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}