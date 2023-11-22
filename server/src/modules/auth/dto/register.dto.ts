import {
    IsEmail,
    IsString,
    MaxLength,
    IsNotEmpty,
    Matches,
    MinLength,
} from 'class-validator';
import { Match } from 'src/lib/validators/match.validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsNotEmpty({"message": "username not empty"})
    @IsString()
    @MinLength(4,{"message": "username must be at least 4 characters"})
    @MaxLength(30,{"message": "username must must be less than 30 characters"})
    @ApiProperty()
    readonly username: string;
    
    @IsEmail({},{"message": "Invalid email address"})
    @ApiProperty()
    readonly email: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {message: 'password too weak'})
    @ApiProperty()
    password: string;

    @Match('password',{"message":"Password not match"})
    @ApiProperty()
    readonly confirmPassword: string;

    @IsString()
    @IsNotEmpty({"message":"Fullname is required"})
    @ApiProperty()
    readonly fullname: string;
}