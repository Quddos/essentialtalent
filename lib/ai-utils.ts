export const isAIAvailable = async () => {
  try {
    const response = await fetch('/api/cv-analysis/status', {
      method: 'GET',
    });
    const data = await response.json();
    return data.available;
  } catch (error) {
    return false;
  }
};

export async function analyzeCV(file: File): Promise<any> {
  try {
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
    return result;
  } catch (error) {
    console.error('CV analysis error:', error);
    throw error;
  }
}
