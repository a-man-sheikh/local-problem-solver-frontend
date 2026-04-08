import api from '@/lib/axios';

/**
 * Problem / Report API service
 * Keep one service file per domain resource.
 */
const problemService = {
  /**
   * Submit a new problem report
   * @param {{ title: string, description: string, category: string, images: string[], location: object }} data
   * @returns {Promise}
   */
  createProblem: (data) => api.post('/problems', data),

  /**
   * Fetch all reports with optional query params
   * @param {object} [params] - { page, limit, status, category }
   * @returns {Promise}
   */
  getReports: (params = {}) => api.get('/reports', { params }),
};

export default problemService;
