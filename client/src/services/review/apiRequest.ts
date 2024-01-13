import { reviewService } from "./review.service";

export const requestReview = async (classId: string, params: any) => {
    if (!classId) {
        return;
    }

    try {
        const res = await reviewService.requestReview(classId, params);
        return res.data;
    } catch (error: any) {
        return error?.response.data;
    }
};

export const getReview = async (classId: string, isTeacher: boolean) => {
    if (!classId) {
        return;
    }

    try {
        const res = await reviewService.getReview(classId, isTeacher);
        return res.data;
    } catch (error: any) {
        return error?.response.data;
    }
};

export const getComments = async (classId: string, reviewId: string, gradeId: string) => {
    if (!classId) {
        return;
    }

    try {
        const res = await reviewService.getComments(classId, reviewId, gradeId);
        return res.data;
    } catch (error: any) {
        return error?.response.data;
    }
};

export const addComment = async (classId: string, params: any) => {
    if (!classId) {
        return;
    }

    try {
        const res = await reviewService.addComment(classId, params);
        return res.data;
    } catch (error: any) {
        return error?.response.data;
    }
};
