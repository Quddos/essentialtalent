import { NextResponse } from 'next/server';
import { isOpenAIConfigured, getConfig } from '@/lib/env-utils';

export async function GET() {
  const config = getConfig();
  
  return NextResponse.json({
    available: isOpenAIConfigured(),
    config: {
      maxFileSize: config.maxFileSize,
      allowedFileTypes: config.allowedFileTypes
    }
  });
}
