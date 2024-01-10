import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({"message": "Class name is required"})
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({"message": "Class title is required"})
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    subject: string;
}