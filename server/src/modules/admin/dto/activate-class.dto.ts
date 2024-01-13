import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ActivateClassDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    classId: string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    ban: boolean
}