import { BASE_URL_API } from "@src/utils/constants";
import { LocalStorage } from "@src/utils/LocalStorage";
import axios, { AxiosResponse } from "axios";
import { AUTH, PREFIX } from "./endpoints";

export const ROUTE = "api";
const axiosClient = axios.create({
    baseURL: BASE_URL_API,
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = LocalStorage.getAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

//Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return handleResponse(response);
    },
    (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return axiosClient.request(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = LocalStorage.getRefreshToken();
            const userId = LocalStorage.getUserId();

            return new Promise(function (resolve, reject) {
                axios
                    .post(`${BASE_URL_API}${ROUTE}/${PREFIX}/${AUTH}/request-token`, {
                        refreshToken: refreshToken,
                        userId: userId,
                    })
                    .then((res) => {
                        const { data } = res.data;

                        // 1) put token to LocalStorage
                        LocalStorage.setToken(data.accessToken);
                        LocalStorage.setRefreshToken(data.refreshToken);

                        // 2) Change Authorization header
                        axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
                        originalRequest.headers["Authorization"] = "Bearer " + data.accessToken;

                        processQueue(null, data.accessToken);

                        // 3) return originalRequest object with Axios
                        resolve(axiosClient.request(originalRequest));
                    })
                    .catch((err) => {
                        const { status } = err.response;

                        if (status === 404) {
                            clearAuthToken();
                        }

                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }
        return Promise.reject(handleError(error));
    }
);

const handleResponse = (res: AxiosResponse<any>) => {
    return res;
};

const handleError = (error: AxiosResponse<any>) => {
    return error;
};

const clearAuthToken = () => {
    LocalStorage.clearToken();
};

export default axiosClient;
