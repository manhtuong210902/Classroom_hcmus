import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "userClassId is required" })
    userClassId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "Content is required" })
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ "message": "Content is required" })
    type: string;

    @ApiProperty()
    @IsString()
    entryId: string;
}