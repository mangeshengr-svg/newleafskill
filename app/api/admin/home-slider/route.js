import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

// 1. Saari slides fetch karne ke liye (GET)
export async function GET() {
  try {
    const [slides] = await pool.query('SELECT * FROM home_hero_slider ORDER BY sort_order ASC, id DESC');
    return NextResponse.json({ slides }, { status: 200 });
  } catch (error) {
    console.error('Fetch Slider Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Nayi slide aur file upload karne ke liye (POST)
export async function POST(request) {
  try {
    const data = await request.formData();
    
    const tab_name = data.get('tab_name');
    const media_type = data.get('media_type');
    const slide_title = data.get('slide_title');
    const slide_desc = data.get('slide_desc');
    const spec1_value = data.get('spec1_value');
    const spec2_value = data.get('spec2_value');
    const spec3_value = data.get('spec3_value');
    const spec4_value = data.get('spec4_value');
    const sort_order = data.get('sort_order');
    
    const file = data.get('media_file');
    let media_url = '';

    // Agar file upload ki gayi hai
    if (file && typeof file !== 'string') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Unique filename banayein taaki naam repeat na ho
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + '-' + file.name.replaceAll(' ', '_');
      
      // Server par public/uploads folder me save karein
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);

      media_url = `/uploads/${filename}`;
    }

    if (!tab_name || !media_url || !slide_title) {
      return NextResponse.json({ message: 'Required fields or media file are missing' }, { status: 400 });
    }

    // Database me insert query
    await pool.query(
      `INSERT INTO home_hero_slider 
        (tab_name, media_type, media_url, slide_title, slide_desc, spec1_value, spec2_value, spec3_value, spec4_value, sort_order) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tab_name,
        media_type || 'image',
        media_url,
        slide_title,
        slide_desc || '',
        spec1_value || '',
        spec2_value || '',
        spec3_value || '',
        spec4_value || '',
        sort_order || 0,
      ]
    );

    return NextResponse.json({ message: 'Slide added successfully with file upload' }, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. Slide delete karne ke liye (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Slide ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM home_hero_slider WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Slide deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete Slide Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. Slide update karne ke liye (PUT)
export async function PUT(request) {
  try {
    const data = await request.formData();
    
    const id = data.get('id');
    const tab_name = data.get('tab_name');
    const media_type = data.get('media_type');
    const slide_title = data.get('slide_title');
    const slide_desc = data.get('slide_desc');
    const spec1_value = data.get('spec1_value');
    const spec2_value = data.get('spec2_value');
    const spec3_value = data.get('spec3_value');
    const spec4_value = data.get('spec4_value');
    const sort_order = data.get('sort_order');
    
    const file = data.get('media_file');
    let media_url = data.get('existing_media_url'); // Agar nayi file nahi di toh purani image/video hi rahegi

    // Agar nayi file upload ki gayi hai
    if (file && typeof file !== 'string') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + '-' + file.name.replaceAll(' ', '_');
      
      const filepath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filepath, buffer);

      media_url = `/uploads/${filename}`;
    }

    if (!id || !tab_name || !slide_title) {
      return NextResponse.json({ message: 'Required fields are missing' }, { status: 400 });
    }

    // Database me UPDATE query
    await pool.query(
      `UPDATE home_hero_slider SET 
        tab_name = ?, media_type = ?, media_url = ?, slide_title = ?, slide_desc = ?, 
        spec1_value = ?, spec2_value = ?, spec3_value = ?, spec4_value = ?, sort_order = ? 
        WHERE id = ?`,
      [
        tab_name,
        media_type || 'image',
        media_url,
        slide_title,
        slide_desc || '',
        spec1_value || '',
        spec2_value || '',
        spec3_value || '',
        spec4_value || '',
        sort_order || 0,
        id,
      ]
    );

    return NextResponse.json({ message: 'Slide updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update Slide Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}