import axios from 'axios';

// Configure axios with base URL and credentials
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, add it to the request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle known error codes
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.log('Unauthorized access. Redirecting to login page...');

        // Clear any tokens or user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to auth page
        window.location.href = '/auth';
      }

      // Log specific error code for debugging
      console.error(`API Error (${status}):`, error.response.data);
    } else {
      console.error('API Error (no response):', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
