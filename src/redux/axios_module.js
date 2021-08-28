import axios from 'axios';
import { token } from '../shared/OAuth';

const env = process.env.NODE_ENV;

const devTarget = env === "development" ? "http://115.85.182.57" : "https://gorokke.shop";

const axiosModule = axios.create({
  baseURL: devTarget,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  },
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
