import axios from 'axios';

// Get API_BE from environment variables
// Supports both API_BE and VITE_API_BE
const ENV_API_BE = import.meta.env.API_BE || import.meta.env.VITE_API_BE || 'https://api-uat.vinhomes.biz.vn/hovixi/api/v1';

// In local browser dev, we route through Vite proxy /proxy-api to avoid CORS & WAF 403 errors
const isDev = import.meta.env.DEV;
const defaultBaseURL = isDev ? '/proxy-api' : ENV_API_BE;

const axiosClient = axios.create({
  baseURL: defaultBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
axiosClient.interceptors.request.use(
  (config) => {
    // Attach authorization token if stored (ready for future auth)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (isDev) {
      console.log(`[API Request] [${config.method?.toUpperCase()}] ${config.baseURL || ''}${config.url}`, config.params || config.data || '');
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================
axiosClient.interceptors.response.use(
  (response) => {
    if (isDev) {
      console.log(`[API Response] [${response.config.url}]`, response.data);
    }
    // Return data directly from response
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // If direct request failed with CORS/403 or network error and hasn't retried with proxy yet
    if (isDev && !originalRequest._retry && originalRequest.baseURL !== '/proxy-api') {
      originalRequest._retry = true;
      originalRequest.baseURL = '/proxy-api';
      console.warn('[API Interceptor] Retrying request via dev proxy /proxy-api...');
      return axiosClient(originalRequest);
    }

    // Standardized error handling
    const errorDetails = {
      message: error.response?.data?.message || error.message || 'Lỗi kết nối máy chủ',
      code: error.response?.data?.code || error.code || 'UNKNOWN_ERROR',
      status: error.response?.status,
      data: error.response?.data,
    };

    console.error('[API Response Error]', errorDetails);
    return Promise.reject(errorDetails);
  }
);

export default axiosClient;

