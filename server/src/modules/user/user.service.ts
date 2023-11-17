import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { generateHash } from 'src/lib/util/func';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userModel: typeof User,
    ) {}

    async findOne(filter : Object){
        const key = Object.keys(filter)[0]
        return await this.userModel.findOne({
            where:{
                [key] : filter[key],
            },
            include: [{
                model: Role,
                attributes: ['role_name'] 
            }]
        })
    }

    async createUser(registerDto: RegisterDto):Promise<User>{
        
        const newUser = await  this.userModel.create({
            username: registerDto.username,
            password: generateHash(registerDto.password),
            email: registerDto.email
        })

        return newUser;
    }

    async updateUser(updateData: Object,userId: string){
        await this.userModel.update(
            updateData,
            {
                where:{
                    id: userId
                }
            }
        )
    }
}
