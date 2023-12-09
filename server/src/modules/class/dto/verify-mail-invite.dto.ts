import { ApiProperty } from "@nestjs/swagger"

export class VerifyMailInviteDto {
    @ApiProperty()
    token: string

    @ApiProperty()
    classId: string

    @ApiProperty()
    userId: string
    
    @ApiProperty()
    email: string
}