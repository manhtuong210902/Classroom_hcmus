import { ApiProperty } from "@nestjs/swagger";

export class UserOfClassResponse {
    @ApiProperty()
    id : string;
    
    @ApiProperty()
    fullname : string;

    @ApiProperty()
    address : string;

    @ApiProperty()
    gender:  string;

    @ApiProperty()
    imgUrl : string;

    @ApiProperty()
    isteacher: Boolean
}