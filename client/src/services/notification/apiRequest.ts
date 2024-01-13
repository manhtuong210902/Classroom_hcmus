import { notificationService } from "./notification.service";

export const createNotification = async (params: any) => {
    try {
        const res = await notificationService.pushNotiMessage(params);
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};
