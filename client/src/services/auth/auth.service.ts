import { LOGIN_API, REGISTER_API } from "./api";
import axiosClient from "../axiosClient";

export const login = (params: any) => {
    return axiosClient.post(LOGIN_API, params);
};

export const register = (params: any) => {
    return axiosClient.post(REGISTER_API, params);
};
