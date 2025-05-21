import { useState } from 'react';
import { analyzeTokenData } from '../api';

export const useTokenAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const analyzeData = async (csvFile, parameters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyzeTokenData(csvFile, parameters);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    results,
    analyzeData
  };
}; 