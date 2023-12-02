import { LOGIN_API, REGISTER_API, REQUEST_REST_PASSWORD, RESET_PASSWORD, VERIFY_ENAIL } from "./api";
import axiosClient from "../axiosClient";

export const authService = {
    login: (params: any) => {
        return axiosClient.post(LOGIN_API, params);
    },

    register: (params: any) => {
        return axiosClient.post(REGISTER_API, params);
    },

    verify: (params: any) => {
        return axiosClient.get(VERIFY_ENAIL, { params });
    },

    requestReset: (params: any) => {
        return axiosClient.post(REQUEST_REST_PASSWORD, params);
    },

    reset: (params: any) => {
        return axiosClient.post(RESET_PASSWORD, params);
    },
};
