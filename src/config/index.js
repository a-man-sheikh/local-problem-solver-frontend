/**
 * Centralized app configuration
 * All environment variables are accessed through this module
 */

const config = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  // App
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Local Problem Solver',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};

export default config;
