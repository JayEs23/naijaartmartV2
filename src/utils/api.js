import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Centralized API call function with interceptors
async function apiRequest(endpoint, { method = 'GET', body, headers = {}, token } = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (body) config.body = JSON.stringify(body);
  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  // Request interceptor (add logging, etc. here)
  // console.log('API Request:', url, config);

  const response = await fetch(url, config);
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  // Response interceptor (handle errors globally)
  if (!response.ok) {
    // Optionally handle specific error codes (e.g., 401, 403)
    // if (response.status === 401) { ... }
    throw data && data.error ? data.error : { message: 'API Error', status: response.status };
  }
  return data;
}

// Custom hook for API calls
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const api = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await apiRequest(endpoint, options);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { api, loading, error, data };
}

// For direct use outside React components
export default apiRequest; 