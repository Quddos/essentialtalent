"use client"

// Use dynamic import for client-side PDF processing
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // For client-side, we'll use a simpler approach
    // First try to read as text (for text-based PDFs)
    const arrayBuffer = await file.arrayBuffer()
    
    // Try to extract text using a basic approach
    // This is a simplified version - for production, you might want to use a proper PDF library
    const uint8Array = new Uint8Array(arrayBuffer)
    const textDecoder = new TextDecoder('utf-8', { fatal: false })
    let text = ''
    
    try {
      // Try to decode as UTF-8 first
      text = textDecoder.decode(uint8Array)
    } catch {
      // If UTF-8 fails, try latin1
      const latin1Decoder = new TextDecoder('latin1')
      text = latin1Decoder.decode(uint8Array)
    }
    
    // Extract readable text from PDF content
    // This is a basic approach - remove PDF markup and extract readable content
    const lines = text.split(/[\r\n]+/)
    const readableText = lines
      .filter(line => {
        // Filter out PDF markup and keep readable text
        return line.length > 3 && 
               !/^%PDF|^\/[A-Z]|^obj|^endobj|^stream|^endstream/.test(line) &&
               /[a-zA-Z]/.test(line)
      })
      .map(line => line.replace(/[^\x20-\x7E]/g, ' ').trim())
      .filter(line => line.length > 0)
      .join(' ')
    
    if (readableText.length < 50) {
      throw new Error('Could not extract sufficient readable text from PDF')
    }
    
    return readableText
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    throw new Error('Failed to extract text from PDF. Please ensure your PDF contains readable text or try uploading a Word document instead.')
  }
}
