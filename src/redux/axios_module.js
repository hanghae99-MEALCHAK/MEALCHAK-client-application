import axios from 'axios';
import { token } from '../shared/OAuth';

const axiosModule = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  },
  // baseURL: "http://115.85.182.57:8080",
  // baseURL: 'http://52.78.204.238:8080',
  baseURL: "http://52.78.204.238",
});

axiosModule.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  config.headers['Content-Type'] = 'application/json';
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
});

// import axios from 'axios';

// const axiosModule = axios.create({
//     headers: {
//         'Access-Control-Allow-Origin': "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//         "Content-Type": "application/json",
//     },
//     baseURL: "http://115.85.182.57:8080",
// });
export default axiosModule;
