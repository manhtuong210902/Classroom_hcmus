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
