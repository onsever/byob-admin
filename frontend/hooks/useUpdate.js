import { useState } from "react";
import { api } from "../api/api";

const useUpdate = () => {
  const [loading, setIsLoading] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const update = async (path, body, headers) => {
    setIsLoading(true);
    setIsLoaded(false);
    setResult(null);
    setError(null);
    try {
      const result = await api.put(path, body, {
        headers: headers,
      });
      setIsLoading(false);
      setResult(result.data);
      setIsLoaded(true);
      setError(null);
    } catch (error) {
      console.log(error);
      setResult(null);
      setIsLoading(false);
      setError(error.response ? error.response.data : error);
      setIsLoaded(true);
    }
  };
  return { loading, result, error, loaded, update };
};

export { useUpdate };
