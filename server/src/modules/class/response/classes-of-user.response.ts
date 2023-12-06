import { ApiProperty } from "@nestjs/swagger";

export class ClassOfUserResponse {
    @ApiProperty()
    id : string;
    
    @ApiProperty()
    title : string;

    @ApiProperty()
    name : string;

    @ApiProperty()
    isteacher: boolean;
}