import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant/role-type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  //get list notify
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllNotification(@Req() req) {
    const rs = await this.notificationService.getAllNofitications(req.query.user_id);
    return {
      data: rs,
      message: 'Success',
      statusCode: HttpStatus.OK
    }
  }

  //test
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async test(@Body() body: CreateNotificationDto) {
    const rs = await this.notificationService.createNotifycationForAllStudentInClass(body);
    return rs;
    // await this.notificationService.createNotifycationForOneStudent({
    //   ...body,
    //   studentId: '20120612'
    // });
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
