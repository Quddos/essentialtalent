import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import OpenAI from 'openai';
import { getConfig } from '@/lib/env-utils';

// Initialize OpenAI with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const config = getConfig();

    // Validate file size
    if (file.size > config.maxFileSize) {
      return new NextResponse(
        `File size exceeds ${config.maxFileSize / (1024 * 1024)}MB limit`, 
        { status: 400 }
      );
    }

    // Validate file type
    if (!config.allowedFileTypes.includes(file.type)) {
      return new NextResponse(
        'Invalid file type. Please upload a PDF, DOC, DOCX, RTF, or TXT file',
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
    
    // Get upload directory
    const uploadDir = path.join(process.cwd(), config.uploadPath);

    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Extract text content
    const textContent = await file.text();

    // If OpenAI is configured, analyze the CV
    if (process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional CV analyzer. Analyze the CV and provide structured feedback including skills, experience, education, and suggestions for improvement."
          },
          {
            role: "user",
            content: textContent
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return NextResponse.json({
        analysis: completion.choices[0].message.content,
        fileName,
        filePath,
        mimeType: file.type
      });
    }

    // If OpenAI is not configured, just return the file info
    return NextResponse.json({
      fileName,
      filePath,
      mimeType: file.type
    });

  } catch (error) {
    console.error('CV analysis error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
