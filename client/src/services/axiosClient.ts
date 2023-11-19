import { BASE_URL_API } from "@src/utils/constants";
import { LocalStorage } from "@src/utils/LocalStorage";
import axios, { AxiosResponse } from "axios";
import { PREFIX, USER } from "./endpoints";

const ROUTE = "api";
let isRefreshing: boolean = false;
let refreshPromise: any = null;

const handleResponse = (res: AxiosResponse<any>) => {
    return res;
};

const handleError = (error: AxiosResponse<any>) => {
    return error;
};

const axiosClient = axios.create({
    baseURL: BASE_URL_API,
    // adapter:fetchAdapter
});

//config access token
axiosClient.interceptors.request.use(
    (config) => {
        const token = LocalStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

//config refesh token
axiosClient.interceptors.response.use(
    (response) => {
        return handleResponse(response);
    },
    async (error) => {
        console.log(error);
        const originalRequest = error.config;
        if (error.response.status === 403) {
            originalRequest._retry = true;
            console.log("Log-check: accessToken expired");
            // Refresh the access token using the refresh token
            // const refreshToken = LocalStorage.getRefreshToken()

            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = refreshToken();
            }

            // Wait for token refresh before retrying the request
            const accessToken = refreshPromise;

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            // Retry the original request
            return axiosClient(originalRequest);
        }

        return Promise.reject(handleError(error));
    }
);

async function refreshToken() {
    try {
        const refreshToken = LocalStorage.getRefreshToken();
        const response = await axiosClient.post(`${PREFIX}/${ROUTE}/${USER}/auth/request-token`, {
            refresh_token: refreshToken,
        });

        let accessToken = response.data.accessToken;
        LocalStorage.setToken(accessToken);
        LocalStorage.setRefreshToken(response.data.refreshToken);
        isRefreshing = false;

        return accessToken;
    } catch (error) {
        // Handle refresh token failure
        isRefreshing = false;
        LocalStorage.clearToken();
    }
}

export default axiosClient;
