// axios 모듈화
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

// axios 호출 후 중간에서 헤더와 토큰 정보를 실어서 서버와 통신
axiosModule.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  config.headers['Content-Type'] = 'application/json';
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
});

export default axiosModule;
