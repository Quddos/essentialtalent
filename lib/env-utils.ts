// Check if OpenAI is properly configured
export const isOpenAIConfigured = () => {
  return !!process.env.OPENAI_API_KEY;
};

// Check if we're running on Vercel
export const isVercel = () => {
  return !!process.env.VERCEL;
};

// Check if we're in development mode
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Get environment-specific configuration
export const getConfig = () => {
  return {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: [
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/rtf'
    ],
    uploadPath: isDevelopment() ? 'uploads' : '/tmp/uploads',
    aiAvailable: isOpenAIConfigured()
  };
};
