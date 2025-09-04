import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { put } from '@vercel/blob'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set")
const sql = neon(process.env.DATABASE_URL)

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({ apiKey })
}

export const maxDuration = 300; // Set maximum duration to 5 minutes
export const dynamic = 'force-dynamic'; // Disable static optimization

export async function POST(req: Request) {
  try {
    console.log('Starting CV analysis...')
    const formData = await req.formData()
    
    // Check if we received text or file
    let text = formData.get('text') as string
    const file = formData.get('file') as File
    
    if (!text && !file) {
      console.error('No text or file provided')
      return NextResponse.json({ error: 'No text or file provided' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured')
      return NextResponse.json({ 
        error: 'AI analysis is not available at the moment',
        aiAvailable: false 
      }, { status: 503 })
    }

    // Extract text from file if file was provided
    if (file && !text) {
      try {
        if (file.type === 'application/pdf') {
          // For PDFs, we'll do a basic extraction server-side
          const arrayBuffer = await file.arrayBuffer()
          const uint8Array = new Uint8Array(arrayBuffer)
          const textDecoder = new TextDecoder('utf-8', { fatal: false })
          
          try {
            text = textDecoder.decode(uint8Array)
          } catch {
            const latin1Decoder = new TextDecoder('latin1')
            text = latin1Decoder.decode(uint8Array)
          }
          
          // Extract readable text from PDF content
          const lines = text.split(/[\r\n]+/)
          const readableText = lines
            .filter(line => {
              return line.length > 3 && 
                     !/^%PDF|^\/[A-Z]|^obj|^endobj|^stream|^endstream/.test(line) &&
                     /[a-zA-Z]/.test(line)
            })
            .map(line => line.replace(/[^\x20-\x7E]/g, ' ').trim())
            .filter(line => line.length > 0)
            .join(' ')
          
          text = readableText
        } else {
          // For other file types, read as text
          text = await file.text()
        }
      } catch (error) {
        console.error('Error extracting text from file:', error)
        throw new Error('Could not extract text from the uploaded file. Please ensure your CV contains readable text.')
      }
    }

    console.log('Text extracted, length:', text.length)
    
    if (!text || text.length < 50) {
      throw new Error('Could not extract sufficient text from the CV. Please ensure your CV contains readable text.')
    }

    const openai = getOpenAIClient()

    // Add timeout to the OpenAI request
    try {
      // Set a timeout for the OpenAI request
      const timeoutMs = 60000; // 1 minute timeout
      const analysisPromise = openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert CV analyzer for teaching positions in UK schools. 
            Analyze the CV for teaching qualifications, experience, and suitability for UK teaching.
            Format your response in clear sections:
            
            QUALIFICATIONS SUMMARY:
            - List and evaluate educational qualifications
            - Comment on UK equivalency
            
            TEACHING EXPERIENCE:
            - Years of experience
            - Relevant teaching roles
            - Key achievements
            
            UK SUITABILITY:
            - Potential fit for UK schools
            - Strengths for UK education system
            
            DEVELOPMENT AREAS:
            - Required certifications or qualifications
            - Suggested professional development
            
            VISA & ELIGIBILITY:
            - Potential visa routes
            - Key requirements to address
            
            RECOMMENDATION:
            - Clear next steps
            - Suggested teaching roles`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Analysis timeout')), timeoutMs);
      });

      // Race between the analysis and the timeout
      const analysis = await Promise.race([analysisPromise, timeoutPromise]) as OpenAI.Chat.ChatCompletion;

      if (!analysis?.choices?.[0]?.message?.content) {
        throw new Error('No analysis generated');
      }

      console.log('Analysis completed successfully');

      return NextResponse.json({
        analysis: analysis.choices[0].message.content,
        success: true
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Analysis timeout') {
          return NextResponse.json({ 
            error: 'Analysis took too long to complete. Please try again.',
            retry: true
          }, { status: 408 });
        }
        // Handle rate limits
        if (error.message.includes('Rate limit') || error.message.includes('rate limit')) {
          return NextResponse.json({ 
            error: 'Too many requests. Please try again in a few minutes.',
            retry: true
          }, { status: 429 });
        }
      }
      throw error; // Re-throw other errors to be caught by the outer try-catch
    }
  } catch (error) {
    console.error('CV Analysis Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error analyzing CV'
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
