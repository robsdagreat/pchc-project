const API_URL = import.meta.env.VITE_API_URL || 'https://pchc-project.onrender.com/api';

// Short-lived cache for GET requests so multiple components mounting at once
// (e.g. Home + Impact + Dashboard all reading /content/homepage) share one
// network round-trip instead of each firing their own request.
const CACHE_TTL_MS = 30_000;
const cache = new Map<string, { data: any; expiresAt: number }>();
const inFlight = new Map<string, Promise<any>>();

export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const isGet = method === 'GET';

  if (isGet) {
    const cached = cache.get(endpoint);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
    const pending = inFlight.get(endpoint);
    if (pending) return pending;
  } else {
    // Any write can change data a previous GET cached, so drop it all
    // rather than tracking per-resource invalidation rules.
    cache.clear();
  }

  const request = (async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      if (response.status === 204) return null;

      if (!response.ok) {
        let errorMsg = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // Fallback if error response is not JSON
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      if (isGet) {
        cache.set(endpoint, { data, expiresAt: Date.now() + CACHE_TTL_MS });
      }
      return data;
    } catch (error) {
      console.error(`Fetch error for ${endpoint}:`, error);
      throw error;
    } finally {
      if (isGet) inFlight.delete(endpoint);
    }
  })();

  if (isGet) inFlight.set(endpoint, request);
  return request;
};
