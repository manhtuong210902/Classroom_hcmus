import axios from 'axios';
// import { SERVER_API } from 'host';
const SERVER_API = process.env.REACT_APP_BACKEND_SERVER;

import { getUser, removeUser } from 'service';

const axiosClient = axios.create({ withCredentials: false, baseURL: SERVER_API });
axiosClient.interceptors.request.use(
    async (config) => {
        const user = getUser();
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 403) {
            removeUser();
            window.location.href = '/login';
        }
    }
);

export default axiosClient;
