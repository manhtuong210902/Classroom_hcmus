import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Get, Param, Query, Req } from '@nestjs/common/decorators';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant';
import { CreateClassResponse } from './response/create-class.response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { AddUserToClassDto } from './dto/add-user.dto';
import { ClassRole } from 'src/lib/security/decorators/class-role.decorator';
import { ClassRoleType } from 'src/utils';
import { ClassOfUserResponse } from './response/classes-of-user.response';
import { ListUserOfClassResponse } from './response/users-of-class.response';
import { SendMailInviteDto } from './dto/send-mail-invite.dto';
import { VerifyMailInviteDto } from './dto/verify-mail-invite.dto';

@Controller('class')
@ApiTags('class')
export class ClassController {

    constructor(
        private readonly classService: ClassService,
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/management')
    @Role(RoleType.USER)
    @ApiExtraModels(CreateClassResponse)
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(CreateClassResponse),
        },
    })
    async createClass(@Body() createClassDto: CreateClassDto, @Req() req)
        : Promise<ResponseTemplate<CreateClassResponse>> {
        const newClass = await this.classService.createClass(createClassDto, req.user)

        const createClassResponse: CreateClassResponse = {
            id: newClass.id,
            owner: newClass.owner_id,
            name: newClass.name,
            title: newClass.title,
            description: newClass.description,
            subject: newClass.subject
        }

        const response: ResponseTemplate<CreateClassResponse> = {
            data: createClassResponse,
            message: `Create a class ${newClass.name} successfully`,
            statusCode: HttpStatus.CREATED
        }

        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/detail/:classId')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT, ClassRoleType.TEACHER])
    @ApiExtraModels(ClassOfUserResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(ClassOfUserResponse),
        },
    })
    async getClassByClassIdAndUserId(@Param('classId') classId: string, @Req() req)
        : Promise<ResponseTemplate<Object>> 
    {
        const userId = req.user.id;
        let data: any[] = await this.classService.getClassByClassIdAndUserId(userId,classId);
        
        const response: ResponseTemplate<Object> = {
            data: data,
            message: 'Success',
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/users')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT, ClassRoleType.TEACHER])
    @ApiExtraModels(ListUserOfClassResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(ListUserOfClassResponse),
        },
    })
    async getAllUsersInClass(@Query() query)
        : Promise<ResponseTemplate<Object>> {
        const classId = query.class_id;
        let data: any[] = await this.classService.getAllUsersInClass(classId);
        
        const dataResponse : ListUserOfClassResponse = this.classService.listUSersOfClass(data);
        
        const response: ResponseTemplate<Object> = {
            data: dataResponse,
            message: 'Success',
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/user-classes')
    @Role(RoleType.USER)
    @ApiExtraModels(ClassOfUserResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            type: 'array',
            items: {
                $ref: getSchemaPath(ClassOfUserResponse),
            }
        },
    })
    async getAllClassesOfUser(@Req() req)
        : Promise<ResponseTemplate<Object[]>> {
        const userId = req.user.id;
        const data: Object[] = await this.classService.getAllClassesOfUSer(userId);

        const response: ResponseTemplate<Object[]> = {
            data: data,
            message: 'Successfully',
            statusCode: HttpStatus.OK
        }
        return response;
    }

    // Get invite link
    @HttpCode(HttpStatus.OK)
    @Post('/invite')
    @Role(RoleType.USER)
    async getLinkInvite(@Body() body): Promise<ResponseTemplate<String>> {
        const classId = body.classId;

        await this.classService.isExistClassId(classId);

        const link = await this.classService.getLinkInviteClass(classId);
        const response: ResponseTemplate<String> = {
            data: link,
            message: 'Successfully',
            statusCode: HttpStatus.OK
        }
        return response
    }

    // Verify invite link and add user
    @HttpCode(HttpStatus.OK)
    @Post('/verify-invite')
    // @Role(RoleType.USER)
    async verifyLinkInvite(@Body() body): Promise<ResponseTemplate<Object>> {
        const isSuccess = await this.classService.verifyLinkInviteAndAdd(body.token, body.classId, body.userId);

        const response: ResponseTemplate<Object> = {
            data: { isSuccess },
            message: 'Successfully',
            statusCode: HttpStatus.OK
        }
        return response
    }

    //send mail to invite class
    @HttpCode(HttpStatus.OK)
    @Post('/send-mail-invite')
    @Role(RoleType.USER)
    async sendMailInviteClass(@Body() sendMailInviteDto : SendMailInviteDto): Promise<ResponseTemplate<Object>> {
        const isSuccess = await 
                            this.classService.sendMailInviteClass(
                                sendMailInviteDto.classId,
                                sendMailInviteDto.fromUser,
                                sendMailInviteDto.email,
                                sendMailInviteDto.isTeacher
                            );

        const response: ResponseTemplate<Object> = {
            data: { isSuccess },
            message: 'Successfully',
            statusCode: HttpStatus.OK
        }
        return response
    }

    //verify mail invite class
    @HttpCode(HttpStatus.OK)
    @Post('/verify-mail-invite')
    @Role(RoleType.USER)
    async verifyMailInviteClass(@Body() verifyMailInviteDto : VerifyMailInviteDto)
    : Promise<ResponseTemplate<Object>> 
    {
        const isSuccess = 
                await this.classService.verifyMailInviteClass(
                    verifyMailInviteDto.token,
                    verifyMailInviteDto.classId,
                    verifyMailInviteDto.userId,
                    verifyMailInviteDto.email
                );

        const response: ResponseTemplate<Object> = {
            data: { isSuccess },
            message: 'Successfully',
            statusCode: HttpStatus.OK
        }
        return response
    }


}
