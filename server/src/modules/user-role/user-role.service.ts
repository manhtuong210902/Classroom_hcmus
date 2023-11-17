import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
    constructor(
        @Inject('UserRoleRepository')
        private readonly userRoleModel: typeof UserRole,
    ) {}   

    async getUserRoles(userId: string){
        return await this.userRoleModel.findAll({
            where:{
                "user_id": userId
            }
        })
    }
}
