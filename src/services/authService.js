import api from '@/lib/axios';

/**
 * Authentication API service
 * Keep one service file per domain/resource
 */
const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export default authService;
