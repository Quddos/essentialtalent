import 'dotenv/config';
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  // Admin users table
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  // Add role column to admin_users
  await sql`
    ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'admin';
  `;

  // Success stories table
  await sql`
    CREATE TABLE IF NOT EXISTS success_stories (
      id SERIAL PRIMARY KEY,
      type VARCHAR(10) NOT NULL, -- 'video' or 'image'
      title VARCHAR(255) NOT NULL,
      url_or_image TEXT NOT NULL,
      description TEXT,
      name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Demo bookings table
  await sql`
    CREATE TABLE IF NOT EXISTS demo_bookings (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      service VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time VARCHAR(20) NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Applications table
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(50),
      address VARCHAR(255),
      country VARCHAR(100),
      state_province VARCHAR(100),
      passport_number VARCHAR(100),
      date_of_birth VARCHAR(50),
      secondary_school_grade VARCHAR(50),
      secondary_school_name VARCHAR(255),
      bachelor_university_name VARCHAR(255),
      bachelor_program VARCHAR(255),
      bachelor_grade VARCHAR(50),
      graduate_university_name VARCHAR(255),
      graduate_program VARCHAR(255),
      graduate_grade VARCHAR(50),
      country_applying_for VARCHAR(100),
      funding_type VARCHAR(100),
      referral_source VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Application documents table
  await sql`
    CREATE TABLE IF NOT EXISTS application_documents (
      id SERIAL PRIMARY KEY,
      application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
      file_url TEXT NOT NULL,
      file_name VARCHAR(255),
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Bootcamp registrations table
  await sql`
    CREATE TABLE IF NOT EXISTS bootcamp_registrations (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      gender VARCHAR(20) NOT NULL,
      country_of_origin VARCHAR(100) NOT NULL,
      country_willing_to_relocate VARCHAR(100) NOT NULL,
      secondary_school_name VARCHAR(255) NOT NULL,
      university_name VARCHAR(255),
      is_admitted_to_uk_university BOOLEAN DEFAULT FALSE,
      uk_university_name VARCHAR(255),
      available_for_virtual_training BOOLEAN DEFAULT FALSE,
      student_email VARCHAR(255) NOT NULL,
      parent_guardian_email VARCHAR(255),
      mobile_number VARCHAR(50) NOT NULL,
      has_laptop BOOLEAN DEFAULT FALSE,
      has_internet_access BOOLEAN DEFAULT FALSE,
      additional_notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // CV uploads table
  await sql`
    CREATE TABLE IF NOT EXISTS cv_uploads (
      id SERIAL PRIMARY KEY,
      file_name VARCHAR(255) NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER,
      file_type VARCHAR(100),
      analysis_result TEXT,
      analysis_status VARCHAR(50) DEFAULT 'pending',
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_info JSONB
    );
  `;

  console.log("Migration complete!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
}); 