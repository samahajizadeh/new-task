import React from "react";

const useHttp = (requestConfig, applyData) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      if (!response.ok) {
        throw new Error("no Task");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};
export default useHttp;