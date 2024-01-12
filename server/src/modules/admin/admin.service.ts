import { Inject, Injectable } from '@nestjs/common';
import { ActiveClass } from './entities/active-class.entity';
import { ActiveUser } from './entities/active-user.entity';
import sequelize from 'sequelize';
import { UserRole } from '../user/entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { RoleType } from 'src/lib/util/constant';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ActivateClassDto } from './dto/activate-class.dto';

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
        try {
            
            const list = await this.ativeClassModel.sequelize.query(
                `
                SELECT classes.*,
                    CASE WHEN COUNT(ac.class_id) = 0 THEN true ELSE false END AS is_active
                FROM classes
                LEFT JOIN 
                    active_classes AS ac ON classes.id = ac.class_id AND ac.is_applied = true
                GROUP BY classes.id;
                `,
                {
                    type: sequelize.QueryTypes.SELECT
                }
            )
            return list;
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(){
        const list = await this.activeUserModel.sequelize.query(
            `
            SELECT
                users.id,
                users.username,
                users.fullname,
                users.address,
                users.gender,
                users.is_verified,
                users.img_url,
                users.created_at,
                CASE WHEN COUNT(au.user_id) = 0 THEN true ELSE false END AS is_active
            FROM
                users
            LEFT JOIN
                active_users AS au ON users.id = au.user_id AND au.is_applied = true
            GROUP BY
                users.id;
            `,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
        return list;
    }


    async activateUser(
        adminId: string, 
        activateUserDto: ActivateUserDto
    ){
        if(activateUserDto.ban){
            await this.activeUserModel.create({
                user_id: activateUserDto.userId,
                banned_by: adminId
            })
        }
        else {
            await this.activeUserModel.sequelize.query(
                `
                UPDATE active_users
                SET is_applied = FALSE
                WHERE user_id = :userId;
                `,
                {
                    replacements: {
                        userId: activateUserDto.userId
                    }
                }
            )
        }
    }

    async activateClass(
        adminId: string, 
        activateClassDto: ActivateClassDto
    ){
        if(activateClassDto.ban){
            await this.activeUserModel.create({
                user_id: activateClassDto.classId,
                banned_by: adminId
            })
        }
        else {
            await this.activeUserModel.sequelize.query(
                `
                UPDATE active_users
                SET is_applied = FALSE
                WHERE class_id = :classId;
                `,
                {
                    replacements: {
                        classId: activateClassDto.classId
                    }
                }
            )
        }
    }

}
