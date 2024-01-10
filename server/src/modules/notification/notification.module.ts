import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { notificationProviders } from './notification.provider';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationProviders],
})
export class NotificationModule { }
