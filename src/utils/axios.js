import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://101410211-comp-3123-assignment2-nodejs.vercel.app/api', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
