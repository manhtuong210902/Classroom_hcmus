import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RequestTokenDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly refreshToken: string;    

    @ApiProperty()
    @IsUUID("all",{"message":"Invalid uuid"})
    readonly userId: string;
}