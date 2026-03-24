const API_URL = import.meta.env.VITE_API_URL || 'https://pchc-project.onrender.com/api';

export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
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

    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
};
