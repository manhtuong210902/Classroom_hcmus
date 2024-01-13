import axiosClient from "../axiosClient";
import { REVIEW_API } from "./api";

export const reviewService = {
    requestReview: async (classId: string, params: any) => {
        return axiosClient.post(`${REVIEW_API}/${classId}/request`, params);
    },

    getReview: async (classId: string, isTeacher: boolean) => {
        return axiosClient.get(`${REVIEW_API}/${classId}${isTeacher ? "/list" : ""}`);
    },

    addComment: async (classId: string, params: any) => {
        return axiosClient.post(`${REVIEW_API}/${classId}/comment`, params);
    },

    getComments: async (classId: string, reviewId: string, gradeId: string) => {
        return axiosClient.get(`${REVIEW_API}/${classId}/comment?review_id=${reviewId}&grade_id=${gradeId}`);
    },

    updateFinalGrade: async (classId: string, params: any) => {
        return axiosClient.post(`${REVIEW_API}/${classId}/final`, params);
    },
};
