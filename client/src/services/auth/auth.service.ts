import { LOGIN_API } from "./api";
import axiosClient from "../axiosClient";

export const userService = {
    login: (params: any) => {
        return axiosClient.post(LOGIN_API, params);
    },
};
