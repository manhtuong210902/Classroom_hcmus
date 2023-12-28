import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CompleteUploadDto{
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    random: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fileType: string

}