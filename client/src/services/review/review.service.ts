import axiosClient from "../axiosClient";
import { REVIEW_API } from "./api";

export const reviewService = {
    requestReview: async (classId: string, params: any) => {
        return axiosClient.post(`${REVIEW_API}/${classId}/request`, params);
    },
};
