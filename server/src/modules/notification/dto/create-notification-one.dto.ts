import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationOneDto {
    @ApiProperty()
    @IsString()
    userId?: string;

    @ApiProperty()
    @IsString()
    senderId: string;

    @ApiProperty()
    @IsString()
    studentId?: string;

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