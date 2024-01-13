import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ActivateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    ban: boolean
}