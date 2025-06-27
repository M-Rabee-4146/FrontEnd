import axios from 'axios';
import toast from 'react-hot-toast';

const axiosinstance = axios.create({
  baseURL: 'https://learnero-backend-production.up.railway.app/',
});

// Intercept responses for auth/fee errors
axiosinstance.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    const msg = err.response?.data?.message;

    if (status === 401 || status === 403) {
      toast.error(msg || "Session expired or unpaid fee");
      localStorage.clear();
      window.location.href = '/Login'; // Redirect to login
    }

    return Promise.reject(err);
  }
);

export default axiosinstance;
