import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class VerifyMailInviteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    classId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string
}