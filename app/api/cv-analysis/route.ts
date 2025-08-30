import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const text = buffer.toString('utf-8')

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert CV analyzer for teaching positions in UK schools. 
          Analyze the CV for teaching qualifications, experience, and suitability for UK teaching.
          Focus on: 
          1. Educational qualifications and their UK equivalency
          2. Teaching experience and its relevance
          3. Potential fit for UK schools
          4. Areas for development
          5. Visa eligibility indicators
          Provide a structured analysis with clear recommendations.`
        },
        {
          role: "user",
          content: text
        }
      ],
    })

    return NextResponse.json({
      analysis: analysis.choices[0].message.content,
      success: true
    })

  } catch (error) {
    console.error('CV Analysis Error:', error)
    return NextResponse.json({ error: 'Error analyzing CV' }, { status: 500 })
  }
}
