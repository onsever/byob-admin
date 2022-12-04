import { useState } from "react";
import { api } from "../api/api";

const useFetch = () => {
  const [loading, setIsLoading] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetch = async (path, headers) => {
    setIsLoading(true);
    setIsLoaded(false);
    setResult(null);
    setError(null);
    try {
      const result = await api.get(path, {
        headers: headers,
      });
      setResult(result.data.data);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.response ? error.response.data : error);
      setIsLoaded(true);
      setResult(null);
    }
  };

  const resetResult = () => {
    setResult([]);
  };

  const setLoader = (flag) => {
    setIsLoading(flag);
  };

  return { loading, result, error, loaded, fetch, resetResult, setLoader };
};

export { useFetch };
