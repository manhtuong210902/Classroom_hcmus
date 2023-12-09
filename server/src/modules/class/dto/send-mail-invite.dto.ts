import { ApiProperty } from "@nestjs/swagger";

export class SendMailInviteDto {
    @ApiProperty()
    classId: string;

    @ApiProperty()
    fromUser: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    isTeacher: boolean;

}