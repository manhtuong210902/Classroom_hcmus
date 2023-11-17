import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { userRoleProviders } from './user-role.provider';

@Module({
  providers: [UserRoleService,...userRoleProviders],
  exports: [UserRoleService]
})
export class UserRoleModule {}
