import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);

export async function POST(req: Request) {
  const data = await req.json();
  const result = await sql`
    INSERT INTO applications (
      full_name, email, phone_number, address, country, state_province, passport_number, date_of_birth,
      secondary_school_grade, secondary_school_name, bachelor_university_name, bachelor_program, bachelor_grade,
      graduate_university_name, graduate_program, graduate_grade, country_applying_for, funding_type, referral_source
    ) VALUES (
      ${data.fullName}, ${data.email}, ${data.phoneNumber}, ${data.address}, ${data.country}, ${data.stateProvince}, ${data.passportNumber}, ${data.dateOfBirth},
      ${data.secondarySchoolGrade}, ${data.secondarySchoolName}, ${data.bachelorUniversityName}, ${data.bachelorProgram}, ${data.bachelorGrade},
      ${data.graduateUniversityName}, ${data.graduateProgram}, ${data.graduateGrade}, ${data.countryApplyingFor}, ${data.fundingType}, ${data.referralSource}
    ) RETURNING id`;
  return NextResponse.json({ id: result[0].id });
}

export async function GET() {
  const applications = await sql`SELECT * FROM applications ORDER BY created_at DESC`;
  return NextResponse.json(applications);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await sql`DELETE FROM applications WHERE id = ${id}`;
  return NextResponse.json({ success: true });
} 