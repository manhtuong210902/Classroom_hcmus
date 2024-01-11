import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Class } from './entities/class.entity';
import {
    convertCamelToSnake,
    convertSnakeToCamel,
    generateHash,
    validateHash,
} from 'src/lib/util/func';
import { CreateClassDto } from './dto/create-class.dto';
import { User } from '../user/entities/user.entity';
import { ClassRoleType, ERROR_CODE, ERROR_MSG } from 'src/utils';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { AddUserToClassDto } from './dto/add-user.dto';
import sequelize from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { INVITE_CLASS } from 'src/lib/util/constant';
import { ListUserOfClassResponse } from './response/users-of-class.response';
import { DataType } from 'sequelize-typescript';

@Injectable()
export class ClassService {
    constructor(
        @Inject('ClassRepository')
        private readonly classModel: typeof Class,
        private readonly roleService: RoleService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
    ) { }

    /**
     * Set default role of the class creator is teacher
     */
    async createClass(
        createClassDto: CreateClassDto,
        user: User,
    ): Promise<Class> {
        const isExisted = await this.isExistClassName(
            createClassDto.name,
            user.id,
        );
        if (isExisted) {
            throw new BadRequestException({
                message: ERROR_MSG.IS_EXIST_CLASS_NAME,
                errorCode: ERROR_CODE.IS_EXIST_CLASS_NAME,
            });
        }

        const convertedData = convertCamelToSnake({
            ownerId: user.id,
            ...createClassDto,
        });

        const newClass = await this.classModel.create(convertedData);

        const teacherRole = await this.roleService.findOrCreate(
            ClassRoleType.TEACHER,
        );

        await newClass.$add('user_classes', user.id, {
            through: { role_id: teacherRole[0].id },
        });

        return newClass;
    }

    async isExistClassName(name: string, owner: string): Promise<Boolean> {
        const listClasses: Class[] = await this.classModel.findAll({
            where: {
                name: name,
                owner_id: owner,
            },
        });

        return listClasses.length !== 0;
    }

    async isExistClassId(classId: string): Promise<Boolean> {
        try {
            const _class: Class = await this.classModel.findOne({
                where: {
                    id: classId,
                },
            });

            return _class !== null;
        } catch (err) {
            throw new BadRequestException({ message: 'Class ID doesnt exist' });
        }
    }

    async addUserToClass(addUserToClassDto: AddUserToClassDto) {
        const hasClass = await this.classModel.findOne({
            where: {
                id: addUserToClassDto.classId,
            },
        });
        if (!hasClass) {
            throw new BadRequestException();
        }

        const hasUser = await this.userService.findOne({
            id: addUserToClassDto.userId,
        });
        if (!hasUser) {
            throw new BadRequestException();
        }
        const role = addUserToClassDto.isTeacher
            ? ClassRoleType.TEACHER
            : ClassRoleType.STUDENT;
        const userRole = await this.roleService.findOrCreate(role);

        await hasClass.$add('user_classes', addUserToClassDto.userId, {
            through: { role_id: userRole[0].id },
        });
    }

    async isExistUserInClass(userId: string, classId: string) {
        try {
            const result = await this.classModel.sequelize.query(
                `SELECT 
                    *
                FROM user_classes
                WHERE class_id = :classId AND user_id = :userId
                `,
                {
                    replacements: { classId, userId },
                    type: sequelize.QueryTypes.SELECT,
                },
            );

            if (result && result.length > 0)
                return true;
            return false;
        } catch (err) {
            return false;
        }
    }

    async getLinkInviteClass(classId: string) {
        const token = generateHash(INVITE_CLASS + classId);
        const isTeacher = false;
        const callbackUrl =
            this.configService.get<string>('CLIENT_URL') +
            `/invite-class?token=${token}&class_id=${classId}&is_teacher=${isTeacher}`;
        return callbackUrl;
    }

    async verifyLinkInviteAndAdd(
        token: string,
        classId: string,
        userId: string,
    ) {
        const isValid = await validateHash(INVITE_CLASS + classId, token);

        if (!isValid) {
            throw new UnauthorizedException({
                errorCode: ERROR_CODE.INVALID_TOKEN,
                message: ERROR_MSG.INVALID_TOKEN,
            });
        }

        await this.addUserToClass({
            userId,
            classId,
            isTeacher: false,
        });

        return true;
    }

    async sendMailInviteClass(
        classId: string,
        fromUser: string,
        email: string,
        isTeacher: boolean,
    ): Promise<Boolean> {
        const token = generateHash(INVITE_CLASS + classId + email + isTeacher);

        const callbackUrl =
            this.configService.get<string>('CLIENT_URL') +
            `/invite-class?token=${token}&class_id=${classId}&email=${email}&is_teacher=${isTeacher}`;

        this.mailerService.sendMail({
            to: email,
            subject: 'Invite Class 🏫',
            html: `<h1>Welcome</h1><br/><h4>${fromUser} has invited you to class</h4><br/><h4>Click here 👉 to join class: <a href=${callbackUrl}>Click here</a></h4>`,
        });

        return true;
    }

    async verifyMailInviteClass(
        token: string,
        classId: string,
        userId: string,
        email: string,
    ) {


        let isTeacher = false;
        const isValid = await validateHash(
            INVITE_CLASS + classId + email + isTeacher,
            token,
        );

        if (isValid) {
            await this.addUserToClass({
                userId,
                classId,
                isTeacher,
            });

            return true;
        }

        isTeacher = true;
        const isValidTeacher = await validateHash(
            INVITE_CLASS + classId + email + isTeacher,
            token,
        );

        if (isValidTeacher) {
            await this.addUserToClass({
                userId,
                classId,
                isTeacher,
            });

            return true;
        }

        if (!isValid && !isValidTeacher) {
            throw new UnauthorizedException({
                errorCode: ERROR_CODE.INVALID_TOKEN,
                message: ERROR_MSG.INVALID_TOKEN,
            });
        }
    }

    async getAllUsersInClass(classId: string) {
        const result = await this.classModel.sequelize.query(
            `SELECT 
                users.id, users.gender, users.address, 
                users.img_url as img_url, users.fullname, 
                classes.owner_id AS owner_id,
                CASE WHEN roles.role_name = 'TEACHER' THEN true ELSE false END as is_teacher,
                CASE WHEN classes.owner_id = users.id THEN true ELSE false END as is_creator
            FROM users
            JOIN user_classes ON user_classes.user_id = users.id
            JOIN classes ON classes.id = user_classes.class_id
            JOIN user_roles ON user_roles.user_id = users.id
            JOIN roles ON roles.id = user_classes.role_id
            WHERE classes.id = :classId;
            `,
            {
                replacements: { classId: classId },
                type: sequelize.QueryTypes.SELECT,
            },
        );
        return convertSnakeToCamel(result);
    }

    listUSersOfClass(data): ListUserOfClassResponse {
        let listTeachers = [];
        let listStudents = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].isTeacher) {
                delete data[i].isTeacher;
                listTeachers.push(data[i]);
            }
            else {
                delete data[i].isTeacher;
                listStudents.push(data[i]);
            }
        }
        const dataResponse: ListUserOfClassResponse = {
            listTeachers,
            listStudents
        }
        return dataResponse;
    }

    async getClassByClassIdAndUserId(userId: string, classId: string) {
        const result = await this.classModel.sequelize.query(
            `
            SELECT 
                classes.id, classes.title, classes.name, classes.subject, classes.description, classes.owner_id as owner_id,
                owner.fullname AS creator, owner.img_url AS avatar,
                CASE WHEN roles.role_name = 'TEACHER' THEN true ELSE false END as is_teacher,
                CASE WHEN classes.owner_id = :userId THEN true ELSE false END as is_creator
            FROM classes
            JOIN user_classes ON classes.id = user_classes.class_id
            JOIN users ON users.id = user_classes.user_id
            JOIN user_roles ON user_roles.user_id = users.id
            JOIN roles ON roles.id = user_classes.role_id
            JOIN users AS owner ON owner.id = classes.owner_id
            WHERE classes.id = user_classes.class_id AND users.id = :userId AND classes.id = :classId;
            `,
            {
                replacements: {
                    userId: userId,
                    classId: classId
                },
                type: sequelize.QueryTypes.SELECT,
            },
        );
        return convertSnakeToCamel(result[0]);
    }

    async getAllClassesOfUSer(userId: string) {
        const result = await this.classModel.sequelize.query(
            `
            SELECT 
                classes.id, classes.title, classes.name, classes.subject, classes.description, classes.owner_id as owner_id,
                owner.fullname AS creator, owner.img_url AS avatar,
                CASE WHEN roles.role_name = 'TEACHER' THEN true ELSE false END as is_teacher,
                CASE WHEN classes.owner_id = :userId THEN true ELSE false END as is_creator
            FROM classes
            JOIN user_classes ON classes.id = user_classes.class_id
            JOIN users ON users.id = user_classes.user_id
            JOIN user_roles ON user_roles.user_id = users.id
            JOIN roles ON roles.id = user_classes.role_id
            JOIN users AS owner ON owner.id = classes.owner_id
            WHERE classes.id = user_classes.class_id AND users.id = :userId;
            `,
            {
                replacements: {
                    userId: userId,
                },
                type: sequelize.QueryTypes.SELECT,
            },
        );
        return convertSnakeToCamel(result);
    }

    async updateStudentId(
        userId : string,
        classId : string,
        studentId: string
    )
        : Promise<Boolean>
    {
        try {
            const result = await this.classModel.sequelize.query(
                `
                UPDATE user_classes
                SET student_id = :studentId
                WHERE user_classes.class_id = :classId AND user_classes.user_id = :userId;
                `,
                {
                    replacements:{
                        userId,
                        classId,
                        studentId
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            )
            if (result.length > 0){
                return true;
            }
            return false;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getAllUsersInClassForNotify(classId: string) {
        const result = await this.classModel.sequelize.query(
            `SELECT 
                users.id as user_id,
                user_classes.id as user_class_id,
                CASE WHEN roles.role_name = 'TEACHER' THEN true ELSE false END as is_teacher,
                CASE WHEN classes.owner_id = users.id THEN true ELSE false END as is_creator
            FROM users
            JOIN user_classes ON user_classes.user_id = users.id
            JOIN classes ON classes.id = user_classes.class_id
            JOIN user_roles ON user_roles.user_id = users.id
            JOIN roles ON roles.id = user_classes.role_id
            WHERE classes.id = :classId;
            `,
            {
                replacements: { classId: classId },
                type: sequelize.QueryTypes.SELECT,
            },
        );
        return convertSnakeToCamel(result);
    }
}
