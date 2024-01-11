import { Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Inject, Post, Query, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';

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

    } 

    @HttpCode(HttpStatus.OK)
    @Get('/user')
    @Role(RoleType.ADMIN)
    async getUser(
        @Query('id' , new DefaultValuePipe('')) id : string,
        @Query('role', new DefaultValuePipe('')) role : string,
        @Query('sort_by', new DefaultValuePipe('')) sortBy: string,
    ){
        const listUser = await this.adminService.getUser()
        const response : ResponseTemplate<Object>={
            data: listUser,
            message: 'Successfully',
            statusCode: 200,
        } 
        return response;
    } 
}
