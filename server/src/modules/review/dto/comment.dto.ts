import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    gradeId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    reviewId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string
}