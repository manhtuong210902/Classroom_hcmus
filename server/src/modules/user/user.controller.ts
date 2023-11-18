import { Controller, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpCode, Put } from '@nestjs/common/decorators';
import { UpdateUserDto } from './dto/update.dto';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { convertCamelToSnake } from "../../lib/util/func"

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @HttpCode(HttpStatus.OK)
    @Put('/profile')
    @Role('USER')
    async updateUser(@Body() updateDto : UpdateUserDto){
        
        type UpdateData = Omit<UpdateUserDto, 'userId'>
        const updateData : UpdateData = updateDto;
        
        const convertedData  = convertCamelToSnake(updateData)

        await this.userService.updateUser(convertedData,updateDto.userId);
        
        const response : ResponseTemplate ={
            data: null,
            message: "Updated successfully",
            statusCode: HttpStatus.OK
        } 

        return response;
    }

}
