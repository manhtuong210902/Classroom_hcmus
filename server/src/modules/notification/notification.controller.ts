import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant/role-type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  //test
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async test(@Body() body: CreateNotificationDto) {
    const rs = await this.notificationService.createNotifycationForAllStudentInClass(body);
    return rs;
  }


  @HttpCode(HttpStatus.OK)
  @Role(RoleType.USER)
  @Patch('/')
  async updateSeen(@Body() body) {
    await this.notificationService.updateSeenNotification(body.id);
    return {
      data: {},
      message: 'Success',
      statusCode: HttpStatus.OK
    }
  }

}
