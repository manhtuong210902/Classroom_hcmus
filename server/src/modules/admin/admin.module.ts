import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.provider';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [AdminService, ...AdminProvider],
  controllers: [AdminController],
  imports: [RoleModule]
})
export class AdminModule {

}
