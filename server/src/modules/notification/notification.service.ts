import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Notification } from './class_notifications.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { convertCamelToSnake } from 'src/lib/util/func';
import { ClassService } from '../class/class.service';
import { SOCKET_TYPE } from 'src/utils/project-constants';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationModel: typeof Notification,
    private readonly classService: ClassService,
    private readonly socketService: SocketService
  ) { }

  async createNotifycationForAllStudentInClass(
    createNotificationDto: CreateNotificationDto,
  ): Promise<any> {

    const convertedData = convertCamelToSnake({
      ...createNotificationDto,
    });

    const users: any[] = await this.classService.getAllUsersInClassForNotify(createNotificationDto.classId);

    const students: any[] = users.filter(e => e.isTeacher === false);

    const notifications = students.map(e => ({ ...convertedData, user_class_id: e.userClassId, userId: e.userId }))

    await Promise.all(notifications.map(e => this.notificationModel.create(e)))

    for (let i of notifications) {
      this.socketService.handleEmitToUser(i.userId, SOCKET_TYPE.TEACHER_EMIT, i)
    }

    return { message: "Success" };

    // return newNotification;
  }

}
