import { NextResponse } from 'next/server'
import { saveFile } from '@/lib/file-storage'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Save the file
    const fileName = await saveFile(file)

    // Here you could also save the file details to a database
    // Or trigger an email notification to your team

    return NextResponse.json({
      success: true,
      fileName: fileName
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
