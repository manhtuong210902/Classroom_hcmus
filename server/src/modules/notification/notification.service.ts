import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Notification } from './class_notifications.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { convertCamelToSnake } from 'src/lib/util/func';

@Injectable()
export class NotificationService {
  constructor(@Inject('NotificationRepository') private readonly notificationModel: typeof Notification) { }

  async createClass(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {

    const convertedData = convertCamelToSnake({
      ...createNotificationDto,
    });

    const newNotification = await this.notificationModel.create(convertedData);

    return newNotification;
  }

}
