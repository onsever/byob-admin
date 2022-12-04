import { useState } from "react";
import { api } from "../api/api";

const useDelete = () => {
  const [loading, setIsLoading] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const doDelete = async (path, headers) => {
    setIsLoading(true);
    setIsLoaded(false);
    setResult(null);
    setError(null);
    try {
      const result = await api.delete(path, body, {
        headers: headers,
      });
      setIsLoading(false);
      setResult(result.data);
      setIsLoaded(true);
      setError(null);
    } catch (error) {
      setResult(null);
      setIsLoading(false);
      setError(error.response ? error.response.data : error);
      setIsLoaded(true);
    }
  };
  return { loading, result, error, loaded, doDelete };
};

export { useDelete };
