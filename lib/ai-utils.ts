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
