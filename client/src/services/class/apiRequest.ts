import { MessageInfo, UserInfo } from "@src/utils/types";
import { classService } from "./class.service";
import { addClass, setClassList } from "@src/store/reducers/classSlice";
import { errorMessage } from "@src/utils/constants";

export const getListClass = async (dispatch: any): Promise<MessageInfo> => {
    try {
        const res = await classService.getListClass();
        dispatch(setClassList(res.data.data));

        return {
            statusCode: res.data.statusCode,
            message: res.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};
export const getListUsersInClass = async (classId: string | null | undefined) => {
    if (!classId) {
        return;
    }
    try {
        const res = await classService.getListUsersInClass(classId);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createClass = async (params: any, dispatch: any, currentUser: UserInfo | null): Promise<MessageInfo> => {
    if (!currentUser) {
        return errorMessage;
    }

    try {
        const res = await classService.createClass(params);
        if (res.data.statusCode === 201) {
            dispatch(
                addClass({
                    ...res.data.data,
                    creator: currentUser.fullname,
                    avatar: currentUser.imgUrl,
                    isTeacher: true,
                    isCreator: true,
                })
            );
        }

        return {
            statusCode: res.data.statusCode,
            message: res.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};
