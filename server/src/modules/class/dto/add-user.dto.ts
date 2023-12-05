import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddUserToClassDto {
    @ApiProperty()
    @IsNotEmpty({"message": "Role is required"})
    isTeacher: Boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID('all', { message: 'Invalid uuid'})
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID('all', { message: 'Invalid uuid'})
    classId : string
}