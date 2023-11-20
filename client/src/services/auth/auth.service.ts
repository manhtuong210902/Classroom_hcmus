import { LOGIN_API, REGISTER_API } from "./api";
import axiosClient from "../axiosClient";

export const authService = {
    login: (params: any) => {
        return axiosClient.post(LOGIN_API, params);
    },

    register: (params: any) => {
        return axiosClient.post(REGISTER_API, params);
    },
};
