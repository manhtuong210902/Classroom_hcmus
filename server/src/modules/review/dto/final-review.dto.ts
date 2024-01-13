import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class FinalReviewDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    gradeId : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    finalGrade : number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    studentId : string;

}