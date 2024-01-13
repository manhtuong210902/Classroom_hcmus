import { LocalStorage } from "@src/utils/LocalStorage";
import axiosClient from "../axiosClient";
import { NOTIFICATION_API } from "./api";

export const notificationService = {
    getNotification: async () => {
        const userId = LocalStorage.getUserId();
        return axiosClient.get(`${NOTIFICATION_API}?user_id=${userId}`);
    },
};
