import { Controller, Body, BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpCode, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { convertCamelToSnake } from "../../lib/util/func"
import { RoleType } from 'src/lib/util/constant';
import { FileInterceptor } from '@nestjs/platform-express';
import {  UpdateUserDto } from './dto/update.dto';
import { CloudinaryService } from 'src/lib/configs/cloudinary/cloudinary.service';
import { omit } from 'lodash';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService
    ) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('/profile/avatar')
    @UseInterceptors(FileInterceptor('file'))
    @Role(RoleType.USER)
    async updateAvatar(
        @Body() userId :string,
        @UploadedFile() file: Express.Multer.File,
    ){
        try {
            console.log(file);
            return this.cloudinaryService.uploadFile(file); 
            
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    @HttpCode(HttpStatus.OK)
    @Put('/profile')
    @Role(RoleType.USER)
    async updateUser(@Body() updateDto : UpdateUserDto){
        
        const updateData = omit(updateDto,"userId");
        
        const convertedData  = convertCamelToSnake(updateData);
        
        const isSuccess = await this.userService.updateUser(convertedData, updateDto.userId);
        if (isSuccess[0] === 0){
            throw new BadRequestException("Invalid user");
        }
        const response : ResponseTemplate ={
            data: null,
            message: "Updated successfully",
            statusCode: HttpStatus.OK
        } 

        return response;
    }

}
