import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, service, date, time, message } = body;
  if (!name || !email || !service || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  await sql`
    INSERT INTO demo_bookings (name, email, phone, service, date, time, message)
    VALUES (${name}, ${email}, ${phone}, ${service}, ${date}, ${time}, ${message})
  `;
  return NextResponse.json({ success: true });
}

export async function GET() {
  const bookings = await sql`SELECT * FROM demo_bookings ORDER BY created_at DESC`;
  return NextResponse.json(bookings);
} 