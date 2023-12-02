import { UserInfo } from "@src/utils/types";
import { profileService } from "./profile.service";
import { updateUser } from "@src/store/reducers/authSlice";

export const updateProfileUser = async (dispatch: any, currentUser: UserInfo | null, values: any) => {
    if (!currentUser) {
        return;
    }

    //
    try {
        const res = await profileService.updateProfile(values);
        if (res.data.statusCode === 200) {
            dispatch(
                updateUser({
                    ...currentUser,
                    ...values,
                })
            );
        }
    } catch (error: any) {
        return error.response.data;
    }
};

export const updateAvatarUser = async (dispatch: any, formData: FormData, currentUser: UserInfo | null) => {
    if (!currentUser) {
        return;
    }
    //
    try {
        const res = await profileService.updateAvatar(formData);
        if (res.data.statusCode === 200) {
            dispatch(
                updateUser({
                    ...currentUser,
                    imgUrl: res.data.data.imgUrl,
                })
            );
        }
    } catch (error: any) {
        return error.response.data;
    }
};
