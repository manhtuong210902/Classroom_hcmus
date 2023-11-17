import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleType } from 'src/lib/util/constant';

@Injectable()
export class RoleService {
    constructor(
        @Inject('RoleRepository') 
        readonly roleModel: typeof Role
    ){}
    
    async findOneById(id: string): Promise<Role | null>{
        return await this.roleModel.findOne({
            where:{
                id: id
            }
        })
    }

    async findOrCreate(role: RoleType): Promise<[Role,Boolean]>{
        
        const userRole =  await this.roleModel.findOrCreate({
            where: {
                role_name: role.toString()
            }
        })
        return userRole;
    }
}
