import axios, {AxiosInstance} from 'axios';

const API_URL = 'https://newsapi.org/v2/';
const $http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  axiosInstance: $http,
};
