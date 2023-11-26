import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { RegisterDto } from './dto/register.dto';
import { RoleType, TokenType } from 'src/lib/util/constant';
import { AuthResponse } from './response/auth-response';
import { LoginDto } from './dto/login.dto';
import { generateHash, validateHash } from 'src/lib/util/func';
import { JwtService } from 'src/lib/security/jwt/jwt.service';
import { RequestTokenDto } from './dto/request-token.dto';
import { RequestTokenResponse } from './response/request-token-response';
import { GoogleAuthResponse } from './interfaces/google-auth';
import { User } from '../user/entities/user.entity';
import { AuthProviderType } from 'src/lib/util/constant/auth-provider';
import { FacebookAuthResponse } from './interfaces/facebook-auth';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { RESET_PASSWORD, VERIFY_EMAIL } from 'src/lib/util/constant/hash-type';
import { RESET_PASSWORD_TEMPLATE } from 'src/lib/configs/mailer/mailer.template';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }


    async checkIsExistedAccount(field: string, value: any): Promise<Boolean | User> {
        const isExisted = await this.userService.findOne({
            [field]: value
        })

        if (isExisted) {
            return isExisted;
        }
        return false;
    }

    async register(registerDto: RegisterDto): Promise<string | Object> {
        try {
            const isExistedusername = await this.checkIsExistedAccount("username", registerDto.username);

            if (isExistedusername) {
                return 'Username already exists';
            }
            registerDto.password = generateHash(registerDto.password);
            const newUser = await this.userService.createUser(registerDto, AuthProviderType.DEFAULT);
            const userRole = await this.roleService.findOrCreate(RoleType.USER);
            await newUser.$add('roles', userRole[0].id);
            await this.sendVerifyEmail(newUser.id, registerDto.email);

            return {
                message: "Please verify your email"
            }

        } catch (error) {
            return error.message;
        }
    }

    async login(loginDto: LoginDto): Promise<AuthResponse | string> {
        try {
            const hasUser = await this.userService.findOne({
                username: loginDto.username,
            });
            if (!hasUser) {
                return 'no user found';
            }
            const isRightPassword = await validateHash(
                loginDto.password,
                hasUser.password,
            );
            if (!isRightPassword) {
                return 'username or password is incorrect';
            }
            const tokens = await this.assignTokens(hasUser.id, RoleType.USER);

            const authResponse: AuthResponse = {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                imgUrl: hasUser.img_url,
                username: hasUser.username,
                userId: hasUser.id,
                fullname: hasUser.fullname,
                gender: hasUser.gender || '',
                email: hasUser.email,
            };
            return authResponse;
        } catch (error) {
            return error.message;
        }
    }


    async googleAuth(
        googleAuthResponse: GoogleAuthResponse, isExisted: Boolean | User
    )
        : Promise<AuthResponse | string> {
        let user: User;

        if (isExisted instanceof User) {
            user = isExisted;
        }
        else {
            const newUser = await this.userService.createUser({
                google: googleAuthResponse.email,
                fullname: googleAuthResponse.firstName + ' ' + googleAuthResponse.lastName,
                imgUrl: googleAuthResponse.picture
            }, AuthProviderType.GOOGLE)

            user = newUser;
        }
        const tokens = await this.assignTokens(user.id, RoleType.USER);

        const authResponse: AuthResponse = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            imgUrl: user.img_url,
            username: user.username,
            userId: user.id,
            fullname: user.fullname,
            gender: user.gender || '',
            email: user.email
        }

        return authResponse;
    }

    async facebookAuth(
        authFacebookResponse: FacebookAuthResponse,
        isExisted: User | Boolean
    )
        : Promise<AuthResponse | string> {
        let user: User;

        if (isExisted instanceof User) {
            user = isExisted;
        }
        else {
            const newUser = await this.userService.createUser({
                facebook: authFacebookResponse.facebookId,
                fullname: authFacebookResponse.firstName + ' ' + authFacebookResponse.lastName,
                imgUrl: authFacebookResponse.photo
            }, AuthProviderType.FACEBOOK)

            user = newUser;
        }
        const tokens = await this.assignTokens(user.id, RoleType.USER);

        const authResponse: AuthResponse = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            imgUrl: user.img_url,
            username: user.username,
            userId: user.id,
            fullname: user.fullname,
            gender: user.gender || '',
            email: user.email
        }

        return authResponse;
    }

    async requestToken(
        requestTokenDto: RequestTokenDto,
    ): Promise<RequestTokenResponse | string> {
        try {
            const isVerified: Boolean = await this.jwtService.verifyToken(
                requestTokenDto.refreshToken,
                TokenType.REFRESH_TOKEN,
                RoleType.USER,
            );
            if (!isVerified) {
                return 'Invalid refresh token';
            }
            const requestTokenResponse: RequestTokenResponse =
                await this.assignTokens(requestTokenDto.userId, RoleType.USER);

            return requestTokenResponse;
        } catch (error) {
            return error.message;
        }
    }

    async assignTokens(userId: string, roleName: string) {
        const accessToken = await this.jwtService.generateToken(
            TokenType.ACCESS_TOKEN,
            userId,
            roleName,
        );
        const refreshToken = await this.jwtService.generateToken(
            TokenType.REFRESH_TOKEN,
            userId,
            roleName,
        );

        this.userService.updateUser(
            {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            userId,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async sendVerifyEmail(userId: string, email: string) {
        const token = generateHash(VERIFY_EMAIL + userId + email);
        const callbackUrl = this.configService.get<string>('SERVER_URL') + `/api/v1/auth/verify?email=${email}&user_id=${userId}&token=${token}`
        this.mailerService.sendMail({
            to: email,
            subject: 'Testing Mailer ✅',
            html: `<h1>Welcome</h1><br/><h4>Click here 👉 to verify email: <a href=${callbackUrl}>Click here</a></h4>`
        })
    }

    async sendResetPassword(userId: string, email: string) {
        const token = generateHash(RESET_PASSWORD + userId + email);
        const callbackUrl = this.configService.get<string>('SERVER_URL') + `/api/v1/auth/reset-password?email=${email}&user_id=${userId}&token=${token}`
        this.mailerService.sendMail({
            to: email,
            subject: 'Testing Mailer ✅',
            html: RESET_PASSWORD_TEMPLATE(callbackUrl)
        })
    }

    async resetPassword(userId: string, email: string, token: string, newPassword: string) {
        const isValid = await validateHash(RESET_PASSWORD + userId + email, token);
        if (isValid) {
            await this.userService.updateUser({ password: generateHash(newPassword) }, userId);
            return true;
        }

        throw new BadRequestException({ "message": "Invalid verification" });
    }

    async verifyEmail(userId: string, email: string, hash: string) {
        const isValid = await validateHash(VERIFY_EMAIL + userId + email, hash);
        if (isValid) {
            await this.userService.updateUser({ is_verified: true }, userId);
            return true;
        }

        throw new BadRequestException({ "message": "Invalid verification" });
    }
}
