import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    imgUrl: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fullname: string;

    @ApiProperty()
    gender: string;
}
