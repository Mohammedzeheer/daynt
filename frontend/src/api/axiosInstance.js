import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:4000/',
});
export const AxiosAdmin = axios.create({
  baseURL: 'http://localhost:4000/admin/',
});

