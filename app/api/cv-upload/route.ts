import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set")
const sql = neon(process.env.DATABASE_URL)

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, { 
      access: 'public', 
      addRandomSuffix: true 
    })

    // Save CV upload details to database
    const cvUpload = await sql`
      INSERT INTO cv_uploads (
        file_name, 
        file_url, 
        file_size, 
        file_type,
        analysis_status
      ) VALUES (
        ${file.name},
        ${blob.url},
        ${file.size},
        ${file.type},
        'manual_review'
      ) RETURNING id, file_url
    `

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileUrl: blob.url,
      cvId: cvUpload[0].id
    })
  } catch (error) {
    console.error('CV Upload Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error uploading CV'
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const uploads = await sql`
      SELECT id, file_name, file_url, file_size, file_type, analysis_status, uploaded_at AS created_at
      FROM cv_uploads
      ORDER BY uploaded_at DESC
    `
    return NextResponse.json(uploads)
  } catch (error) {
    console.error('CV List Error:', error)
    return NextResponse.json({ error: 'Failed to fetch CV uploads' }, { status: 500 })
  }
}
