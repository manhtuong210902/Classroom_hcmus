import { loadUserFail, loadUserSuccess } from "@src/store/reducers/authSlice";
import { LocalStorage } from "@src/utils/LocalStorage";
import { profileService } from "../profile/profile.service";
import { UserInfo } from "@src/utils/types";
import { authService } from "./auth.service";

export const loaderUser = async (dispatch: any) => {
    const userId = LocalStorage.getUserId();
    console.log("Log check userId: ", userId);
    if (!userId) {
        dispatch(loadUserFail());
        return;
    }

    try {
        const res = await profileService.getProfile();
        const user: UserInfo = res.data.data;

        dispatch(loadUserSuccess(user));
    } catch (error) {
        LocalStorage.clearToken();
        dispatch(loadUserFail());
    }
};

export const registerUser = async (params: any) => {
    try {
        const res = await authService.register(params);
        return res.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const loginUser = async (dispatch: any, params: any) => {
    try {
        const res = await authService.login(params);
        const data = res.data.data;
        LocalStorage.setToken(data.accessToken);
        LocalStorage.setRefreshToken(data.refreshToken);
        LocalStorage.setUserId(data.userId);

        const user: UserInfo = {
            id: data.userId,
            username: data.username,
            imgUrl: data.imgUrl,
            ...data,
        };

        dispatch(loadUserSuccess(user));
        return user;
    } catch (error: any) {
        LocalStorage.clearToken();
        dispatch(loadUserFail());
        return error?.response?.data;
    }
};

export const logoutUser = (dispatch: any) => {
    LocalStorage.clearToken();
    dispatch(loadUserFail());
};
