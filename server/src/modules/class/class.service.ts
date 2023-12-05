import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Class } from './entities/class.entity';
import { convertCamelToSnake } from 'src/lib/util/func';
import { CreateClassDto } from './dto/create-class.dto';
import { User } from '../user/entities/user.entity';
import { ClassRoleType, ERROR_CODE, ERROR_MSG } from 'src/utils';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { AddUserToClassDto } from './dto/add-user.dto';
import { parseEnum } from 'src/utils/func';

@Injectable()
export class ClassService {
    constructor(
        @Inject('ClassRepository')
        private readonly classModel: typeof Class,
        private readonly roleService: RoleService,
        private readonly userService: UserService,
    ) { }
    
    /**
     * Set default role of the class creator is teacher 
     */
    async createClass(createClassDto: CreateClassDto, user: User): Promise<Class>{
        
        const isExisted = await this.isExistClassName(createClassDto.name, user.id);
        if(isExisted){
            throw new BadRequestException({
                message: ERROR_MSG.IS_EXIST_CLASS_NAME,
                errorCode : ERROR_CODE.IS_EXIST_CLASS_NAME
            })
        }

        const convertedData = convertCamelToSnake({ownerId: user.id, ...createClassDto});
        
        const newClass = await this.classModel.create(convertedData);
        
        const teacherRole = await this.roleService.findOrCreate(ClassRoleType.TEACHER); 

        await newClass.$add( 'user_classes', user.id, {through : {role_id : teacherRole[0].id}});
        
        return newClass;   
    }

    async isExistClassName(name: string, owner: string): Promise<Boolean>{
        
        const listClasses : Class[] = await this.classModel.findAll({
            where: {
                name: name,
                owner_id: owner
            },
        })

        return listClasses.length !== 0;
    }


    async addUserToClass(addUserToClassDto : AddUserToClassDto){
        const hasClass = await this.classModel.findOne({
            where:{
                id: addUserToClassDto.classId
            }
        })
        if (!hasClass){
            throw new BadRequestException();
        }
        
        const hasUser = await this.userService.findOne({id: addUserToClassDto.userId});
        if(!hasUser){
            throw new BadRequestException();
        }
        const role = addUserToClassDto.isTeacher ? ClassRoleType.TEACHER : ClassRoleType.STUDENT;
        const userRole = await this.roleService.findOrCreate(role);

        await hasClass.$add('user_classes', addUserToClassDto.userId,{through: {role_id : userRole[0].id}})

    }


}
