import { BadRequestException, Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Inject, Post, Query, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ActivateClassDto } from './dto/activate-class.dto';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,

    ){}


    @HttpCode(HttpStatus.OK)
    @Post('/set')
    @Role(RoleType.USER)
    async setAdmin(
        @Req() req
    )
    {
        const userId = req.user.id;
        this.adminService.setAdmin(userId);
        const response : ResponseTemplate<null> = {
            data: null,
            message: "Success",
            statusCode: HttpStatus.OK
        }        
        return response;
    }


    @HttpCode(HttpStatus.OK)
    @Get('/class')
    @Role(RoleType.ADMIN)
    async  getClass(
        @Query() query
    ){
        try {            
            const listClass = await this.adminService.getClass()
            const response : ResponseTemplate<Object>={
                data: listClass,
                message: 'Successfully',
                statusCode: 200,
            } 
            return response;
        } catch (error) {
            throw new BadRequestException();   
        }
    } 

    @HttpCode(HttpStatus.OK)
    @Get('/user')
    @Role(RoleType.ADMIN)
    async getUser(
        @Query('id' , new DefaultValuePipe('')) id : string,
        @Query('role', new DefaultValuePipe('')) role : string,
        @Query('sort_by', new DefaultValuePipe('')) sortBy: string,
    ){
        try {            
            const listUser = await this.adminService.getUser()
            const response : ResponseTemplate<Object>={
                data: listUser,
                message: 'Successfully',
                statusCode: 200,
            } 
            return response;
        } catch (error) {
            throw new BadRequestException();   
        }
    } 

    @HttpCode(HttpStatus.OK)
    @Post('/activate/user')
    @Role(RoleType.ADMIN)
    async activateUser(
        @Req() req,
        @Body() activateUserDto : ActivateUserDto
    ){
        try {
            const adminId = req.user.id;
            await this.adminService.activateUser(adminId, activateUserDto)
            const response : ResponseTemplate<null> = {
                data: null,
                message: "Successfully",
                statusCode: HttpStatus.OK
            }
            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/activate/class')
    @Role(RoleType.ADMIN)
    async activateClass(
        @Req() req,
        @Body() activateClassDto : ActivateClassDto
    ){
        try {
            const adminId = req.user.id;
            await this.adminService.activateClass(adminId, activateClassDto)
            const response : ResponseTemplate<null> = {
                data: null,
                message: "Successfully",
                statusCode: HttpStatus.OK
            }
            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
