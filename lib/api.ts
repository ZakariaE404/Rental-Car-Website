/**
 * Central API helper for cross-origin or proxied requests
 * Supporting InfinityFree security workaround
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const callApi = async (endpoint: string, options: RequestInit = {}) => {
  // InfinityFree Workaround: Adding special headers if requested
  // Some hosts require 'X-Requested-With' to bypass basic bot protection
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Required if you need PHP sessions (admin auth) cross-origin
    credentials: 'include', 
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
