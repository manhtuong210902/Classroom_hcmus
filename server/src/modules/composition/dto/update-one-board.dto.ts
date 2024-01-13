import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOneBoardDto{
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    newStudentId: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    newFullName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    gradeId: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    grade: number;
}