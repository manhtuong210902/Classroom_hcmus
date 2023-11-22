import { ApiProperty } from "@nestjs/swagger";

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