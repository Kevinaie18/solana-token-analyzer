const API_BASE_URL = '/api';

export const analyzeTokenData = async (csvFile, parameters) => {
  const formData = new FormData();
  formData.append('file', csvFile);
  
  // Append all parameters to formData
  Object.entries(parameters).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to analyze data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Analysis failed: ${error.message}`);
  }
}; 