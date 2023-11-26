import { Controller, HttpStatus, HttpCode, BadRequestException, UseGuards } from '@nestjs/common';
import { Post, Body, Get, Req, Query } from '@nestjs/common/decorators';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './response/auth-response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { RequestTokenDto } from './dto/request-token.dto';
import { RequestTokenResponse } from './response/request-token-response';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(AuthResponse, ResponseTemplate, RequestTokenResponse)
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    // testing
    // @HttpCode(HttpStatus.OK)
    // @Get('/mail')
    // async sendEMail(@Query() query) {
    //     this.authService.sendVerifyEmail(query.user_id, query.email);
    //     return 'ok';
    // }

    @HttpCode(HttpStatus.OK)
    @Post('/send-reset-password')
    async sendMailResetPassword(@Body() body) {
        await this.authService.sendResetPassword(body.userId, body.email);
        return {
            "message": "Send mail for reset password successfully"
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/reset-password')
    async resetPassword(@Body() resetPassword: ResetPasswordDto) {
        const result = await this.authService.resetPassword(resetPassword.userId, resetPassword.email, resetPassword.token, resetPassword.newPassword);
        if (result)
            return 'ok';
    }

    @HttpCode(HttpStatus.OK)
    @Get('/verify')
    async verifyEmail(@Query() query) {
        const isValid = this.authService.verifyEmail(query.user_id, query.email, query.token);
        if (isValid)
            return {
                "message": "Verify success"
            };
        return {
            "message": "Verify fail"
        }
    }


    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(@Req() req) {

    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(AuthResponse),
        },
    })
    async facebookCallback(@Req() req): Promise<ResponseTemplate<AuthResponse>> {
        const isExisted: Boolean | User = await this.authService.checkIsExistedAccount("facebook", req.user.facebookId);

        const authResponse: AuthResponse | string = await this.authService.facebookAuth(req.user, isExisted);
        if (typeof authResponse === 'string') {
            throw new BadRequestException({ "message": authResponse });
        }

        const response: ResponseTemplate<AuthResponse> = {
            data: authResponse,
            message: isExisted ? "Login by facebook successfully" : "Register by facebook successfully",
            statusCode: isExisted ? HttpStatus.OK : HttpStatus.CREATED
        }
        return response;
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req) {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(AuthResponse),
        },
    })
    async googleLoginCallback(@Req() req): Promise<ResponseTemplate<AuthResponse>> {

        const isExisted: Boolean | User = await this.authService.checkIsExistedAccount("google", req.user.email)

        const authResponse: AuthResponse | string = await this.authService.googleAuth(req.user, isExisted);
        if (typeof authResponse === 'string') {
            throw new BadRequestException({ "message": authResponse });
        }

        const response: ResponseTemplate<AuthResponse> = {
            data: authResponse,
            message: isExisted ? "Login by google successfully" : "Register by google successfully",
            statusCode: isExisted ? HttpStatus.OK : HttpStatus.CREATED
        }
        return response;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(AuthResponse),
        },
    })
    async register(@Body() registerDto: RegisterDto): Promise<string | Object> {
        const authResponse: string | Object = await this.authService.register(registerDto);

        if (typeof authResponse === 'string') {
            throw new BadRequestException({ "message": authResponse });
        }

        const response: ResponseTemplate<Object> = {
            data: authResponse,
            message: "Register successfully",
            statusCode: HttpStatus.CREATED
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(AuthResponse),
        },
    })
    async login(@Body() loginDto: LoginDto): Promise<ResponseTemplate<AuthResponse>> {

        const authResponse: AuthResponse | string = await this.authService.login(loginDto);
        if (typeof authResponse === 'string') {
            throw new BadRequestException({ "message": authResponse });
        }
        const response: ResponseTemplate<AuthResponse> = {
            data: authResponse,
            message: "Login successfully",
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Post("/request-token")
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(RequestTokenResponse),
        },
    })
    async requestToken(@Body() requestTokenDto: RequestTokenDto)
        : Promise<ResponseTemplate<RequestTokenResponse>> {
        const requestTokenResponse: RequestTokenResponse | string = await this.authService.requestToken(requestTokenDto);
        if (typeof requestTokenResponse === 'string') {
            throw new BadRequestException({ "message": requestTokenResponse });
        }
        const response: ResponseTemplate<RequestTokenResponse> = {
            data: requestTokenResponse,
            statusCode: HttpStatus.OK,
            message: "Request token successfully"
        }
        return response;
    }
}
