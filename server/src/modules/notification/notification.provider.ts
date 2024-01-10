import { Notification } from './class_notifications.entity';

export const notificationProviders = [{ provide: 'NotificationRepository', useValue: Notification }];