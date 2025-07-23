import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const applicationId = searchParams.get('applicationId');
  if (!applicationId || isNaN(Number(applicationId))) return NextResponse.json([], { status: 200 });
  const docs = await sql`SELECT * FROM application_documents WHERE application_id = ${Number(applicationId)}`;
  return NextResponse.json(docs);
} 