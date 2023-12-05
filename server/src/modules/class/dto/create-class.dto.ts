import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({"message": "Class name is required"})
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({"message": "Class title is required"})
    title: string;
}