import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Notification } from './class_notifications.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { convertCamelToSnake } from 'src/lib/util/func';
import { ClassService } from '../class/class.service';
import { SocketService } from 'src/socket/socket.service';
import { SOCKET_TYPE } from 'src/utils/project-constants';
import { CreateNotificationOneDto } from './dto/create-notification-one.dto';

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

    const notifications = students.map(e => ({ ...convertedData, user_class_id: e.userClassId, user_id: e.userId }))

    await Promise.all(notifications.map(e => this.notificationModel.create(e)))

    for (let i of notifications) {
      this.socketService.handleEmitToUser(i.userId, SOCKET_TYPE.TEACHER_EMIT, i)
    }

    return { message: "Success" };
  }

  async createNotifycationForOneStudent(
    createNotificationDto: CreateNotificationOneDto,
  ): Promise<any> {

    const convertedData = convertCamelToSnake({
      ...createNotificationDto,
    });

    const users: any[] = await this.classService.getAllUsersInClassForNotify(createNotificationDto.classId);

    const student: any = users.filter(e => e.id === createNotificationDto.userClassId);

    const notification = { ...convertedData, user_class_id: createNotificationDto.userClassId, user_id: student.userId }

    await this.notificationModel.create(notification)

    this.socketService.handleEmitToUser(student.userId, SOCKET_TYPE.TEACHER_EMIT, notification)

    return { message: "Success" };
  }

  async createNotifycationForOneTeacher(
    createNotificationDto: CreateNotificationOneDto,
  ): Promise<any> {

    const convertedData = convertCamelToSnake({
      ...createNotificationDto,
    });

    const users: any[] = await this.classService.getAllUsersInClassForNotify(createNotificationDto.classId);

    const teacher: any = users.filter(e => e.id === createNotificationDto.userClassId);

    const notification = { ...convertedData, user_class_id: createNotificationDto.userClassId, user_id: teacher.userId }

    await this.notificationModel.create(notification)

    this.socketService.handleEmitToUser(teacher.userId, SOCKET_TYPE.STUDENT_EMIT, notification)

    return { message: "Success" };
  }

  async createNotifycationForAllTeacherInClass(
    createNotificationDto: CreateNotificationDto,
  ): Promise<any> {

    const convertedData = convertCamelToSnake({
      ...createNotificationDto,
    });

    const users: any[] = await this.classService.getAllUsersInClassForNotify(createNotificationDto.classId);

    const teachers: any[] = users.filter(e => e.isTeacher === true);

    const notifications = teachers.map(e => ({ ...convertedData, user_class_id: e.userClassId, userId: e.userId }))

    await Promise.all(notifications.map(e => this.notificationModel.create(e)))

    for (let i of notifications) {
      this.socketService.handleEmitToUser(i.userId, SOCKET_TYPE.STUDENT_EMIT, i)
    }

    return { message: "Success" };

    // return newNotification;
  }

}
