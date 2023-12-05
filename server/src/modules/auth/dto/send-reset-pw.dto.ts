import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SendResetPasswordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string; 
}