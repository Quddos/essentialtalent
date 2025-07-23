import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export const runtime = 'edge';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const applicationId = formData.get('applicationId');
  if (!file || !applicationId) {
    return NextResponse.json({ error: 'Missing file or applicationId' }, { status: 400 });
  }
  const blob = await put((file as File).name, file, { access: 'public', addRandomSuffix: true });
  await sql`INSERT INTO application_documents (application_id, file_url, file_name) VALUES (${applicationId}, ${blob.url}, ${(file as File).name})`;
  return NextResponse.json({ url: blob.url });
} 