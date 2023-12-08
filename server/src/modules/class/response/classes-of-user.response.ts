import { ApiProperty } from "@nestjs/swagger";

export class ClassOfUserResponse {
    @ApiProperty()
    id : string;
    
    @ApiProperty()
    title : string;

    @ApiProperty()
    name : string;

    @ApiProperty()
    creator: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    isTeacher: boolean;

    @ApiProperty()
    isCreator: boolean;

    @ApiProperty()
    ownerId: string;

}