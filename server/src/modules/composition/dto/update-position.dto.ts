import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UpdatePositionDto{

    @ApiProperty()
    @IsArray()
    listCompositions: string[]
}