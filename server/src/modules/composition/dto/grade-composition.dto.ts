import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class GradeCompositionDto{
    @IsString()
    @ApiProperty()
    name:string;

    @IsNumber()
    @ApiProperty()
    scale: number;
}