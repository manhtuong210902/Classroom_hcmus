import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  //test
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async test(@Body() body: CreateNotificationDto) {
    const rs = this.notificationService.createNotifycation(body);
    return rs;
  }

}
