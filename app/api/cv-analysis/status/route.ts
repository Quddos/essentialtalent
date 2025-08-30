import { NextResponse } from 'next/server'

export async function GET() {
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY

  return NextResponse.json({
    available: hasOpenAIKey,
  })
}
