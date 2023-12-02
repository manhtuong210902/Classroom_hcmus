import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly newPassword: string;   
}