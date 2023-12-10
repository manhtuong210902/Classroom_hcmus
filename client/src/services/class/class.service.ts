import {
    CHECK_HAS_CLASS_API,
    CREATE_CLASS_API,
    GET_CLASS_DETAIL,
    GET_INVITE_URL_API,
    JOIN_CLASS_WITH_EMAIL_LINK,
    JOIN_CLASS_WITH_INVITE_LINK_API,
    LIST_CLASS_API,
    LIST_USER_IN_CLASS_API,
    SEND_EMAIL_INVITE_API,
} from "./api";
import axiosClient from "../axiosClient";

export const classService = {
    createClass: (params: any) => {
        return axiosClient.post(CREATE_CLASS_API, params);
    },

    getListClass: () => {
        return axiosClient.get(LIST_CLASS_API);
    },

    getClassById: (classId: string) => {
        return axiosClient.get(`${GET_CLASS_DETAIL}/${classId}`);
    },

    getListUsersInClass: (classId: string) => {
        return axiosClient.get(`${LIST_USER_IN_CLASS_API}/?class_id=${classId}`);
    },

    getInviteUrl: (classId: string) => {
        return axiosClient.get(`${GET_INVITE_URL_API}?class_id=${classId}`);
    },

    sendMailInvite: (params: any) => {
        return axiosClient.post(`${SEND_EMAIL_INVITE_API}`, params);
    },

    joinClassWithInviteLink: (params: any) => {
        return axiosClient.post(`${JOIN_CLASS_WITH_INVITE_LINK_API}`, params);
    },

    joinClassWithEmail: (params: any) => {
        return axiosClient.post(`${JOIN_CLASS_WITH_EMAIL_LINK}`, params);
    },

    checkHasClass: (classId: string, userId: string) => {
        return axiosClient.get(`${CHECK_HAS_CLASS_API}?class_id=${classId}&user_id=${userId}`);
    },
};
