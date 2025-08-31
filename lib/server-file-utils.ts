import { getConfig } from './env-utils';

export interface UploadResult {
  success: boolean;
  fileName?: string;
  filePath?: string;
  error?: string;
  mimeType?: string;
}

export function validateFileType(file: File): string | null {
  const config = getConfig();
  if (!config.allowedFileTypes.includes(file.type)) {
    return 'Invalid file type. Please upload a PDF, DOC, DOCX, RTF, or TXT file';
  }
  if (file.size > config.maxFileSize) {
    return `File size exceeds ${config.maxFileSize / (1024 * 1024)}MB limit`;
  }
  return null;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  try {
    const validationError = validateFileType(file);
    if (validationError) {
      return {
        success: false,
        error: validationError
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/cv-analysis', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const result = await response.json();
    return {
      success: true,
      ...result
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file'
    };
  }
}
