import {
    IsEmail,
    IsString,
    MaxLength,
    IsNotEmpty,
    Matches,
    MinLength,
} from 'class-validator';
import { Match } from 'src/lib/validators/match.validator';

export class RegisterDto {
    @IsNotEmpty({"message": "username not empty"})
    @IsString()
    @MinLength(4,{"message": "username must be at least 4 characters"})
    @MaxLength(30,{"message": "username must must be less than 30 characters"})
    readonly username: string;
    
    @IsEmail({},{"message": "Invalid email address"})
    readonly email: string;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {message: 'password too weak'})
    readonly password: string;

    @Match('password',{"message":"Password not match"})
    readonly confirmPassword: string;
}