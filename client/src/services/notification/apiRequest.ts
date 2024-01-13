import { notificationService } from "./notification.service";

export const getNotification = async () => {
    try {
        const res = await notificationService.getNotification();
        return res.data;
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};
