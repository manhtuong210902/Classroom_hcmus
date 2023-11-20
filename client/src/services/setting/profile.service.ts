import { UPDATE_AVATAR, USER_PROFILE } from "./api";
import axiosClient from "../axiosClient";

export const profileService = {
    updateAvatar: (params: any) => {
        return axiosClient.post(UPDATE_AVATAR, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getProfile: (userId : string) =>{
        return axiosClient.get(`${USER_PROFILE}/${userId}`);
    }
};

