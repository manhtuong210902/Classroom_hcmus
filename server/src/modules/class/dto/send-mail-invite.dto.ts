import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class SendMailInviteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    classId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fromUser: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isTeacher: boolean;

}