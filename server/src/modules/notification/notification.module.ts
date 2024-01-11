import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { notificationProviders } from './notification.provider';
import { ClassModule } from '../class/class.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [ClassModule, SocketModule],
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationProviders],
  exports: [NotificationService]
})
export class NotificationModule { }
