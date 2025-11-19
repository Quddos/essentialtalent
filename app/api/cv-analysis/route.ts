import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({ apiKey })
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    let text = formData.get('text') as string | null
    const file = formData.get('file') as File | null

    if (!text && !file) {
      return NextResponse.json({ error: 'No text or file provided' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'AI analysis is not available', aiAvailable: false }, { status: 503 })
    }

    if (file && !text) {
      try {
        if (file.type === 'application/pdf') {
          const arrayBuffer = await file.arrayBuffer()
          const uint8Array = new Uint8Array(arrayBuffer)
          const textDecoder = new TextDecoder('utf-8', { fatal: false })
          try {
            text = textDecoder.decode(uint8Array)
          } catch {
            text = new TextDecoder('latin1').decode(uint8Array)
          }
          const lines = text.split(/[\r\n]+/)
          text = lines
            .filter(l => l.length > 3 && /[a-zA-Z]/.test(l))
            .map(l => l.replace(/[^\x20-\x7E]/g, ' ').trim())
            .join(' ')
        } else {
          text = await file.text()
        }
      } catch (e) {
        return NextResponse.json({ error: 'Failed to extract text from file' }, { status: 400 })
      }
    }

    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Insufficient text for analysis' }, { status: 400 })
    }

    const openai = getOpenAIClient()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional CV analyzer. Provide structured feedback.' },
        { role: 'user', content: text }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = response?.choices?.[0]?.message?.content || ''
    return NextResponse.json({ analysis: content })
  } catch (err) {
    const e = err as Error
    console.error('cv-analysis error', e)
    return NextResponse.json({ error: e.message || 'Analysis error' }, { status: 500 })
  }
}
