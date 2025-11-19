import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing PEXELS_API_KEY in environment' }, { status: 500 })
  }

  const url = new URL(req.url)
  const query = url.searchParams.get('query') || 'education students graduation'
  const per_page = url.searchParams.get('per_page') || '7'

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}`, {
      headers: {
        Authorization: apiKey,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: 'Pexels API error', detail: text }, { status: res.status })
    }

    const data = await res.json()
    const photos = (data.photos || []).map((p: any) => ({
      id: p.id,
      src: p.src && (p.src.large || p.src.medium || p.src.original || p.src.small),
      photographer: p.photographer,
      url: p.url,
    }))

    return NextResponse.json({ photos })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
