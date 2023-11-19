import { UPDATE_AVATAR } from "./api";
import axiosClient from "../axiosClient";

export const profileService = {
    updateAvatar: (params: any) => {
        return axiosClient.post(UPDATE_AVATAR, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
};

