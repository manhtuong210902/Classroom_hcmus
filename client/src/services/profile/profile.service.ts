import { UPDATE_AVATAR, UPDATE_PROFILE, USER_PROFILE } from "./api";
import axiosClient from "../axiosClient";
import { LocalStorage } from "@src/utils/LocalStorage";

export const profileService = {
    updateAvatar: (params: any) => {
        return axiosClient.post(UPDATE_AVATAR, params, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateProfile: (params: any) => {
        const userId = LocalStorage.getUserId();
        return axiosClient.put(UPDATE_PROFILE, {
            userId,
            ...params,
        });
    },

    getProfile: () => {
        const userId = LocalStorage.getUserId();
        return axiosClient.get(`${USER_PROFILE}/${userId}`);
    },
};
