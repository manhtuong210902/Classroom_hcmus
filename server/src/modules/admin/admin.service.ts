import { Inject, Injectable } from '@nestjs/common';
import { ActiveClass } from './entities/active-class.entity';
import { ActiveUser } from './entities/active-user.entity';
import sequelize from 'sequelize';
import { UserRole } from '../user/entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { RoleType } from 'src/lib/util/constant';

@Injectable()
export class AdminService {

    constructor(
        @Inject('ActiveClassRepository')
        private readonly ativeClassModel: typeof ActiveClass,

        @Inject('ActiveUserRepository')
        private readonly activeUserModel: typeof ActiveUser,

        private readonly roleService: RoleService,

        @Inject('UserRoleRepository')
        private readonly userRoleModle: typeof UserRole
    ){

    }


    async setAdmin(userId: string){
        const role : any = await this.roleService.findOrCreate(RoleType.ADMIN);
        this.userRoleModle.create({
            user_id: userId,
            role_id: role[0].id
        })
    }

    async getClass(){

    }

    async getUser(){
        const list = await this.activeUserModel.sequelize.query(
            `SELECT * FROM users;`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
        return list;
    }

}
