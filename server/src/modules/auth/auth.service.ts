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
import { ERROR_CODE, ERROR_MSG } from "src/utils/project-constants";
import { RegisterResponse } from './response/register-reponse';
import { SendResetPasswordDto } from './dto/send-reset-pw.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    async checkIsExistedAccount(
        field: string,
        value: any,
    ): Promise<Boolean | User> {
        const isExisted = await this.userService.findUserWithRoles({
            [field]: value,
        });

        if (isExisted) {
            return isExisted;
        }
        return false;
    }

    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
        try {
            const isExistedUsername : User | Boolean = await this.checkIsExistedAccount(
                'username',
                registerDto.username,
            );

            const isExistedEmail : User | Boolean = await this.checkIsExistedAccount(
                'email',
                registerDto.email,
            );
            
            if (isExistedUsername) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.USERNAME_IS_USED,
                    message: ERROR_MSG.USERNAME_IS_USED
                })
            }

            if (isExistedEmail) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.EMAIL_IS_USED,
                    message: ERROR_MSG.EMAIL_IS_USED
                })
            }

            registerDto.password = generateHash(registerDto.password);
            const newUser = await this.userService.createUser(
                registerDto,
                AuthProviderType.DEFAULT,
            );
            const userRole = await this.roleService.findOrCreate(RoleType.USER);
            await newUser.$add('roles', userRole[0].id);
            await this.sendVerifyEmail(registerDto.email);

            const response: RegisterResponse = {
                isSuccess: true
            }
            return response;

        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        try {
            const hasUser = await this.userService.findUserWithRoles({
                username: loginDto.username,
            });

            if (!hasUser) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.USER_NOT_FOUND,
                    message: ERROR_MSG.USER_NOT_FOUND
                })
            }
            const isRightPassword = await validateHash(
                loginDto.password,
                hasUser.password,
            );
            if (!isRightPassword) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.WRONG_PASSWORD,
                    message: ERROR_CODE.WRONG_PASSWORD
                });
            }
            if (!hasUser.is_verified) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.USER_NOT_VERIFIED,
                    message: ERROR_CODE.USER_NOT_VERIFIED
                });
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
            throw new BadRequestException(error);
        }
    }

    async googleAuth(
        googleAuthResponse: GoogleAuthResponse, isExisted: Boolean | User
    )
        : Promise<AuthResponse> {
        let user: User;

        if (isExisted instanceof User) {
            user = isExisted;
        } else {
            const newUser = await this.userService.createUser(
                {
                    google: googleAuthResponse.email,
                    fullname:
                        googleAuthResponse.firstName +
                        ' ' +
                        googleAuthResponse.lastName,
                    imgUrl: googleAuthResponse.picture,
                },
                AuthProviderType.GOOGLE,
            );
            const userRole = await this.roleService.findOrCreate(RoleType.USER);
            await newUser.$add('roles', userRole[0].id);
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
            email: user.email,
        };

        return authResponse;
    }

    async facebookAuth(
        authFacebookResponse: FacebookAuthResponse,
        isExisted: User | Boolean
    )
        : Promise<AuthResponse> {
        let user: User;

        if (isExisted instanceof User) {
            user = isExisted;
        } else {
            const newUser = await this.userService.createUser(
                {
                    facebook: authFacebookResponse.facebookId,
                    fullname:
                        authFacebookResponse.firstName +
                        ' ' +
                        authFacebookResponse.lastName,
                    imgUrl: authFacebookResponse.photo,
                },
                AuthProviderType.FACEBOOK,
            );
            const userRole = await this.roleService.findOrCreate(RoleType.USER);
            await newUser.$add('roles', userRole[0].id);
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
            email: user.email,
        };

        return authResponse;
    }

    async requestToken(
        requestTokenDto: RequestTokenDto,
    ): Promise<RequestTokenResponse> {
        try {
            const isVerified: Boolean = await this.jwtService.verifyToken(
                requestTokenDto.refreshToken,
                TokenType.REFRESH_TOKEN,
                RoleType.USER,
            );
            if (!isVerified) {
                throw new BadRequestException({
                    errorCode: ERROR_CODE.INVALID_TOKEN,
                    message: ERROR_MSG.INVALID_TOKEN
                })
            }
            const requestTokenResponse: RequestTokenResponse =
                await this.assignTokens(requestTokenDto.userId, RoleType.USER);

            return requestTokenResponse;
        } catch (error) {
            throw new BadRequestException(error);
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

    async sendVerifyEmail(email: string) {
        const token = generateHash(VERIFY_EMAIL + email);
        const callbackUrl =
            this.configService.get<string>('CLIENT_URL') +
            `/verify-email?email=${email}&token=${token}`;
        this.mailerService.sendMail({
            to: email,
            subject: 'Verify Email 📖',
            html: `<h1>Welcome</h1><br/><h4>Click here 👉 to verify email: <a href=${callbackUrl}>Click here</a></h4>`,
        });
    }

    async sendResetPassword(sendResetPw : SendResetPasswordDto) {
        const token = generateHash(RESET_PASSWORD + sendResetPw.email);
        const callbackUrl =
            this.configService.get<string>('CLIENT_URL') +
            `/reset-password?email=${sendResetPw.email}&token=${token}`;
        this.mailerService.sendMail({
            to: sendResetPw.email,
            subject: 'Reset Password 📖',
            html: RESET_PASSWORD_TEMPLATE(callbackUrl),
        });
    }

    async resetPassword(
        email: string,
        token: string,
        newPassword: string,
    ) {
        const isValid = await validateHash(
            RESET_PASSWORD + email,
            token,
        );
        if (isValid) {
            const user = await this.userService.findUserWithRoles({ email: email });
            if (!user) {
                throw new BadRequestException({ message: ERROR_CODE.USER_NOT_FOUND })
            }
            await this.userService.updateUser(
                { password: generateHash(newPassword) },
                user.id,
            );
            return true;
        }

        throw new BadRequestException({ message: 'Invalid verification' });
    }

    async verifyEmail(email: string, hash: string) {
        try {
            const isValid = await validateHash(
                VERIFY_EMAIL + email,
                hash,
            );
            if (!isValid) {
                throw new BadRequestException({
                    message: 'Invalid verification',
                });
            }

            const hasUser = await this.userService.findUserWithRoles({
                email: email,
            });
            if (!hasUser) {
                throw new BadRequestException({
                    message: 'Cannot found user with this Email',
                });
            }

            await this.userService.updateUser({ is_verified: true }, hasUser.id);

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
            throw new BadRequestException(error);
        }
    }
}
