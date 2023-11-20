import { ApiProperty } from "@nestjs/swagger";

export class UpdateAvatarResponse {
    
    @ApiProperty()
    imgUrl: string;
}