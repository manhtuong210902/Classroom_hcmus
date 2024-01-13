import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class RequestReviewDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    gradeId : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    expectedGrade : number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    explaination : string;
}