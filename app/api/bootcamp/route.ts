import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await sql`
      INSERT INTO bootcamp_registrations (
        full_name, gender, country_of_origin, country_willing_to_relocate,
        secondary_school_name, university_name, is_admitted_to_uk_university,
        uk_university_name, available_for_virtual_training, student_email,
        parent_guardian_email, mobile_number, has_laptop, has_internet_access,
        additional_notes
      ) VALUES (
        ${data.fullName}, ${data.gender}, ${data.countryOfOrigin}, ${data.countryWillingToRelocate},
        ${data.secondarySchoolName}, ${data.universityName}, ${data.isAdmittedToUkUniversity},
        ${data.ukUniversityName}, ${data.availableForVirtualTraining}, ${data.studentEmail},
        ${data.parentGuardianEmail}, ${data.mobileNumber}, ${data.hasLaptop}, ${data.hasInternetAccess},
        ${data.additionalNotes}
      ) RETURNING id`;
    
    return NextResponse.json({ 
      success: true, 
      id: result[0].id,
      message: "Bootcamp registration successful! We'll contact you soon with further details."
    });
  } catch (error) {
    console.error('Bootcamp registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register for bootcamp' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registrations = await sql`
      SELECT * FROM bootcamp_registrations 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Bootcamp registrations fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bootcamp registrations' },
      { status: 500 }
    );
  }
} 