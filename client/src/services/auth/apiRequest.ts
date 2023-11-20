import { loadUserFail, loadUserSuccess } from "@src/store/reducers/authSlice";
import { LocalStorage } from "@src/utils/LocalStorage";
import { profileService } from "../setting/profile.service";
import { UserInfo } from "@src/utils/types";
import { authService } from "./auth.service";

export const loaderUser = async (dispatch: any) => {
    const userId = LocalStorage.getUserId();
    if (!userId) {
        dispatch(loadUserFail());
    }

    try {
        const res = await profileService.getProfile(userId || "");
        const user: UserInfo = res.data;

        dispatch(loadUserSuccess(user));
    } catch (error) {
        LocalStorage.clearToken();
        dispatch(loadUserFail());
    }
};

export const registerUser = async (dispatch: any, params: any) => {
    try {
        const res = await authService.register(params);
        LocalStorage.setToken(res.data.accessToken);
        LocalStorage.setRefreshToken(res.data.refreshToken);
        LocalStorage.setUserId(res.data.userId);

        const user: UserInfo = {
            id: res.data.userId,
            username: res.data.username,
            imgUrl: res.data.imgUrl,
        };

        dispatch(loadUserSuccess(user));
        return user;
    } catch (error: any) {
        LocalStorage.clearToken();
        dispatch(loadUserFail());
        return error.response.data;
    }
};

export const loginUser = async (dispatch: any, params: any) => {
    try {
        const res = await authService.login(params);
        LocalStorage.setToken(res.data.accessToken);
        LocalStorage.setRefreshToken(res.data.refreshToken);
        LocalStorage.setUserId(res.data.userId);

        const user: UserInfo = {
            id: res.data.userId,
            username: res.data.username,
            imgUrl: res.data.imgUrl,
        };

        dispatch(loadUserSuccess(user));
        return user;
    } catch (error: any) {
        LocalStorage.clearToken();
        dispatch(loadUserFail());
        return error.response.data;
    }
};
