import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { Role } from '../role/role.entity';
import { omit } from 'lodash';
import { convertCamelToSnake } from 'src/lib/util/func';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userModel: typeof User,
    ) { }

    async findOne(filter: Object) {
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
