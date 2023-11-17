import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { roleProviders } from './role.provider';

@Module({
    providers: [RoleService,...roleProviders],
    exports: [RoleService]
})
export class RoleModule {}
