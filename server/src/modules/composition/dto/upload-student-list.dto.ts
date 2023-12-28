import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadStudentListDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    isMultiparts: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chunkIndex: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    random: string

}