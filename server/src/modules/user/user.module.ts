import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
    imports: [UserRoleModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [UserService]
})
export class UserModule {}
