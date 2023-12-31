import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from '../role/role.entity';
import { omit } from 'lodash';
import { convertCamelToSnake } from 'src/lib/util/func';
import sequelize from 'sequelize';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userModel: typeof User,
    ) { }


    async findOne(filter: Object){
        const key = Object.keys(filter)[0]
        return await this.userModel.findOne({
            where: {
                [key]: filter[key],
            }
        })
    }

    async findUserWithRoles(filter: Object) {
        const key = Object.keys(filter)[0]
        return await this.userModel.findOne({
            where: {
                [key]: filter[key],
            },
            include: [{
                model: Role,
                attributes: ['role_name']
            }]
        })
    }

    async findUserInClassWithRole(userId: string, classId: string){
        const result = await this.userModel.sequelize.query(
                `SELECT 
                user_classes.role_id , classes.owner_id as owner, roles.role_name, user_classes.id as id
                FROM roles
                JOIN users ON users.id = :userId 
                JOIN (user_classes JOIN classes ON classes.id = user_classes.class_id) 
                ON users.id = user_classes.user_id AND classes.id = :classId 
                WHERE roles.id = user_classes.role_id;`,
            {
                replacements: {classId: classId, userId: userId},
                type: sequelize.QueryTypes.SELECT
            }
        )
        return result;
    }

    async createUser(newUserData: Object, authProvider: string): Promise<User> {

        const userData = omit(newUserData,"confirmPassword")
        
        const convertedData = convertCamelToSnake(userData);
        
        convertedData.auth_provider = authProvider;

        const newUser = await this.userModel.create(convertedData);

        return newUser;
    }

    async updateUser(updateData: Object, userId: string) {
        return await this.userModel.update(
            updateData,
            {
                where: {
                    id: userId
                }
            }
        )
    }
}
