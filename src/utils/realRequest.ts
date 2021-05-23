import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status: number) => {
    return status < 400;
  },
});

// Alter defaults after instance has been created
instance.interceptors.request.use(
  config => {
    if (process.browser) {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default instance;
