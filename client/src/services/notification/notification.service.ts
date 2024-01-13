import axiosClient from "../axiosClient";
import { NOTIFICATION_API } from "./api";

export const notificationService = {
    pushNotiMessage: async (params: any) => {
        return axiosClient.post(NOTIFICATION_API, params);
    },
};
