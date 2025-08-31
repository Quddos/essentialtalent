// Configuration object for API endpoints
export const apiConfig = {
  // Maximum file size (10MB)
  maxFileSize: 10 * 1024 * 1024,
  
  // Allowed MIME types
  allowedFileTypes: [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/rtf'
  ],
  
  // OpenAI Configuration
  openai: {
    timeoutMs: 60000, // 1 minute
    maxTokens: 1000,
    temperature: 0.7,
    model: 'gpt-3.5-turbo-16k',
    fallbackModel: 'gpt-3.5-turbo'
  },
  
  // Upload Configuration
  upload: {
    directory: process.env.NODE_ENV === 'production' ? '/tmp/uploads' : 'uploads'
  }
};
