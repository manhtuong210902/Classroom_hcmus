import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Get, Req} from '@nestjs/common/decorators';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant';
import { CreateClassResponse } from './response/create-class.response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { AddUserToClassDto } from './dto/add-user.dto';
import { ClassRole } from 'src/lib/security/decorators/class-role.decorator';
import { ClassRoleType } from 'src/utils';

@Controller('class')
@ApiTags('class')
export class ClassController {

    constructor(
        private readonly classService: ClassService,
    ) {}

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
    async createClass(@Body() createClassDto: CreateClassDto,@Req() req)
        : Promise<ResponseTemplate<CreateClassResponse>> 
    {
        const newClass = await this.classService.createClass(createClassDto, req.user)

        const createClassResponse : CreateClassResponse= {
            id: newClass.id,
            owner: newClass.owner_id,
            name: newClass.name,
            title: newClass.title,
        }

        const response :ResponseTemplate<CreateClassResponse> = {
            data: createClassResponse,
            message: "Create a new class successfully",
            statusCode: HttpStatus.CREATED
        }

        return response;
    }


    // này test add user 
    @HttpCode(HttpStatus.CREATED)
    @Post('/management/add-user')
    @Role(RoleType.USER)
    async addUserToClass(@Body() addUserToClass: AddUserToClassDto, @Req() req){
        const makeAddition = await this.classService.addUserToClass(addUserToClass)
        return "oke"
    }

    @HttpCode(HttpStatus.OK)
    @Get('/test')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT, ClassRoleType.TEACHER])
    async testAuthClass(){
        return "oke"
    }
}
