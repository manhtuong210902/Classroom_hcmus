import { LOGIN_API } from "./api";
import axiosClient from "../axiosClient";

export const login = (params: any) => {
    return axiosClient.post(LOGIN_API, params);
};
