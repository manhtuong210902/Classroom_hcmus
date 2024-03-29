import { Controller, Body, BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { Get, HttpCode, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { convertCamelToSnake } from "../../lib/util/func"
import { RoleType } from 'src/lib/util/constant';
import { FileInterceptor } from '@nestjs/platform-express';
import {  UpdateUserDto } from './dto/update.dto';
import { CloudinaryService } from 'src/lib/configs/cloudinary/cloudinary.service';
import { omit } from 'lodash';
import { CloudinaryResponse } from 'src/lib/configs/cloudinary/cloudinary-response';
import { UpdateAvatarResponse } from './response/update-avatar.response';
import { ApiConsumes, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { UserProfileResponse } from './response/user-profile.response';
import { ErrorMessage } from 'src/utils';
import {ERROR_CODE, ERROR_MSG} from 'src/utils/project-constants';
 
@Controller('user')
@ApiTags('user')
@ApiExtraModels(ResponseTemplate, UserProfileResponse, UpdateAvatarResponse)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService
    ) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('/profile/avatar')
    @UseInterceptors(FileInterceptor('file'))
    @Role(RoleType.USER)
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(UpdateAvatarResponse),
        },
    })
    @ApiConsumes('multipart/form-data')
    async updateAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Body() updateUserDto : UpdateUserDto 
    )
        : Promise<ResponseTemplate<UpdateAvatarResponse>>
    {
        try {
            if (!file){
                throw new BadRequestException("Upload image failed");
            }

            const fileResponse : CloudinaryResponse = await  this.cloudinaryService.uploadFile(file); 
            
            await this.userService.updateUser({img_url : fileResponse.url}, updateUserDto.userId);

            const dataResponse : UpdateAvatarResponse = {
                imgUrl: fileResponse.url
            } 
            const response : ResponseTemplate<UpdateAvatarResponse> = {
                data: dataResponse,
                statusCode: HttpStatus.OK,
                message: "upload image successfully"
            }

            return response;
            
        } catch (error) {
            throw new BadRequestException(error)
        }
    }


    @HttpCode(HttpStatus.OK)
    @Patch('/profile')
    @Role(RoleType.USER)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(null),
        },
    })
    async updateUser(@Body() updateDto : UpdateUserDto)
        : Promise<ResponseTemplate<null>>
    {
        
        const updateData = omit(updateDto,"userId");
        
        const convertedData  = convertCamelToSnake(updateData);
        
        const isSuccess = await this.userService.updateUser(convertedData, updateDto.userId);
        if (isSuccess[0] === 0){
            throw new BadRequestException({
                message: "UpdateFailed"
            });
        }
        const response : ResponseTemplate<null> ={
            data: null,
            message: "Updated successfully",
            statusCode: HttpStatus.OK
        } 

        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/profile/:id')
    @Role(RoleType.USER)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(UserProfileResponse),
        },
    })
    async getProfile(@Param('id') userId: UUID )
        : Promise<ResponseTemplate<UserProfileResponse>>
    {
        try {
            const hasUser = await this.userService.findUserWithRoles({id: userId});
            if (!hasUser){
                const error : ErrorMessage = {
                    errorCode: ERROR_CODE.USER_NOT_FOUND,
                    message: ERROR_MSG.USER_NOT_FOUND
                }
                throw new BadRequestException(error);
            }
            const profileData : UserProfileResponse = {
                address: hasUser.address,
                id: hasUser.id,
                username: hasUser.username,
                fullname: hasUser.fullname,
                email: hasUser.email,
                gender: hasUser.gender,
                imgUrl: hasUser.img_url
            }
            const response : ResponseTemplate<UserProfileResponse> = {
                data : profileData,
                statusCode: HttpStatus.OK,
                message: "success"
            }
            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }   
    }

}
