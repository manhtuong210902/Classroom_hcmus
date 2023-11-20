import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UserProfileResponse {
    
    @ApiProperty()
    id : string

    @ApiProperty()
    address: string

    @ApiProperty()
    fullname : string

    @ApiProperty()
    username : string

    @ApiProperty()
    email : string

    @ApiProperty()
    gender : string

    @ApiProperty()
    imgUrl : string

}