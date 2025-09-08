"use client"

import { extractTextFromPDF } from './pdf-utils'

export async function readFileAsText(file: File): Promise<string> {
  if (file.type === 'application/pdf') {
    // Use PDF extraction for PDF files
    return extractTextFromPDF(file)
  }
  
  // For other text-based files, use FileReader
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === 'string') {
        resolve(text)
      } else {
        reject(new Error('Failed to read file as text'))
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
