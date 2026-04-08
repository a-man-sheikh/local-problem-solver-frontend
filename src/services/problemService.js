import api from '@/lib/axios';

/**
 * Problem reporting API service
 * Endpoint: POST /problems
 *
 * Backend expects a JSON body (not multipart/form-data).
 * Images field is an array of URI strings, not file uploads.
 */
const problemService = {
  /**
   * Submit a new problem report
   * @param {{ title: string, description: string, category: string, images: string[], location: { type: string, coordinates: [number, number], address?: string } }} data
   * @returns {Promise}
   */
  createProblem: (data) => api.post('/problems', data),
};

export default problemService;
