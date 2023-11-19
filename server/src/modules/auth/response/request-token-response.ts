import { ApiProperty } from "@nestjs/swagger";

export class RequestTokenResponse {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}