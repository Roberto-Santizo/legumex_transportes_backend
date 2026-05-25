import axios, { AxiosHeaders } from 'axios';

const apiClient = axios.create({
    baseURL: process.env.GOOGLE_MAPS_URL,
});

apiClient.interceptors.request.use(config => {
    return config;
});

export default apiClient;

