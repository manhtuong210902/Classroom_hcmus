import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty({ "message": "userClassId is required" })
    // userClassId: string;

    @ApiProperty()
    @IsString()
    senderId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "classId is required" })
    classId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "Content is required" })
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "Type is required" })
    type: string;
}