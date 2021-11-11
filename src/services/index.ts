import axios from "axios";
const API = axios.create({
  baseURL : "http://127.0.0.1:8000/api/v1"
});
API.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] =  `Bearer ${token}`;
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default API;