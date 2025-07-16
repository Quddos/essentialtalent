import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  if (email) {
    const result = await sql`SELECT email, role FROM admin_users WHERE email = ${email} LIMIT 1`;
    return NextResponse.json(result[0] || {});
  } else {
    const result = await sql`SELECT email, role FROM admin_users`;
    return NextResponse.json(result);
  }
}

export async function POST(req) {
  const { email, password, role } = await req.json();
  // Read the current admin's email from a custom header
  const adminEmail = req.headers.get('x-admin-email');
  if (adminEmail !== 'superadmin@essentialtalent.co') {
    return NextResponse.json({ error: 'Only super admin can add admin users' }, { status: 403 });
  }
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }
  try {
    await sql`INSERT INTO admin_users (email, password, role) VALUES (${email}, ${password}, ${role || 'admin'})`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Could not add admin user' }, { status: 500 });
  }
}

// PATCH: Change role of an admin user (superadmin only)
export async function PATCH(req) {
  const { email, role } = await req.json();
  const adminEmail = req.headers.get('x-admin-email');
  if (adminEmail !== 'superadmin@essentialtalent.co') {
    return NextResponse.json({ error: 'Only super admin can change roles' }, { status: 403 });
  }
  if (!email || !role) {
    return NextResponse.json({ error: 'Missing email or role' }, { status: 400 });
  }
  await sql`UPDATE admin_users SET role = ${role} WHERE email = ${email}`;
  return NextResponse.json({ success: true });
} 