import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5115/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add an interceptor to inject the token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('astronomy-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
