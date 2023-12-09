import { CREATE_CLASS_API, LIST_CLASS_API, LIST_USER_IN_CLASS_API } from "./api";
import axiosClient from "../axiosClient";

export const classService = {
    createClass: (params: any) => {
        return axiosClient.post(CREATE_CLASS_API, params);
    },

    getListClass: () => {
        return axiosClient.get(LIST_CLASS_API);
    },

    getListUsersInClass: (classId: string) => {
        return axiosClient.get(`${LIST_USER_IN_CLASS_API}/?class_id=${classId}`);
    },
};
