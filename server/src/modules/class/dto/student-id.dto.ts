import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class StudentIdDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    studentId: string
}