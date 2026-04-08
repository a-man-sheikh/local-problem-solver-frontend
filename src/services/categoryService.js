import api from '@/lib/axios';

const categoryService = {
  getCategories: () => api.get('/categories'),
};

export default categoryService;
