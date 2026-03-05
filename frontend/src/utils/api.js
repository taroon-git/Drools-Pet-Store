import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add admin authentication if needed
    if (config.requiresAuth) {
      const credentials = btoa('admin:drools2024');
      config.headers.Authorization = `Basic ${credentials}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data, { requiresAuth: true }),
  update: (id, data) => api.put(`/api/products/${id}`, data, { requiresAuth: true }),
  delete: (id) => api.delete(`/api/products/${id}`, { requiresAuth: true }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => api.get('/api/reviews'),
  create: (data) => api.post('/api/reviews', data),
  approve: (id) => api.post(`/api/reviews/${id}/approve`, {}, { requiresAuth: true }),
};

// Gallery API
export const galleryAPI = {
  getAll: () => api.get('/api/gallery'),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/api/contact', data),
};

// Stats API
export const statsAPI = {
  get: () => api.get('/api/stats', { requiresAuth: true }),
};

export default api;
