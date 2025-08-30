import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = path.join(process.cwd(), 'uploads')

export async function saveFile(file: File): Promise<string> {
  try {
    // Create unique filename
    const fileExtension = path.extname(file.name)
    const fileName = crypto.randomBytes(16).toString('hex') + fileExtension
    const filePath = path.join(UPLOAD_DIR, fileName)

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Ensure upload directory exists
    await createUploadDir()

    // Write file
    await writeFile(filePath, buffer)
    return fileName
  } catch (error) {
    console.error('Error saving file:', error)
    throw new Error('Failed to save file')
  }
}

async function createUploadDir() {
  try {
    const fs = require('fs')
    if (!fs.existsSync(UPLOAD_DIR)) {
      await fs.promises.mkdir(UPLOAD_DIR, { recursive: true })
    }
  } catch (error) {
    console.error('Error creating upload directory:', error)
    throw new Error('Failed to create upload directory')
  }
}
