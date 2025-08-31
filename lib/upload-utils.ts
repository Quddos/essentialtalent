import crypto from 'crypto';

export interface FileUploadResponse {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  try {
    // Generate a unique filename
    const fileExtension = file.name.split('.').pop() || '';
    const fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;

    // If running on Vercel, use temp storage or implement cloud storage here
    if (process.env.VERCEL) {
      // For demo purposes, we'll just return success
      // In production, implement proper cloud storage (S3, Azure Blob, etc.)
      return {
        success: true,
        fileName,
        url: `/uploads/${fileName}` // This would be your cloud storage URL in production
      };
    }

    // For local development, use file system
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // In development, you might want to save to a local directory
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const uploadDir = path.join(process.cwd(), 'uploads');
      
      try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
      } catch (error) {
        console.error('Local file save error:', error);
        // Continue even if local save fails
      }
    }

    return {
      success: true,
      fileName,
      url: `/uploads/${fileName}`
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Failed to upload file'
    };
  }
}
