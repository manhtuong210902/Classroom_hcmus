import { Controller, HttpStatus, HttpCode, BadRequestException, UseGuards } from '@nestjs/common';
import { Post, Body, Get, Req, Query, Res } from '@nestjs/common/decorators';
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

import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterResponse } from './response/register-reponse';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(AuthResponse, ResponseTemplate, RequestTokenResponse)
export class AuthController {

    private clientUrl : String;

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { 
        this.clientUrl = this.configService.get<String>('CLIENT_URL');
    }

    @HttpCode(HttpStatus.OK)
    @Post('/send-reset-password')
    async sendMailResetPassword(@Body() body) {
        await this.authService.sendResetPassword(body.email);
        return {
            "message": "Send mail for reset password successfully"
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/reset-password')
    async resetPassword(@Body() resetPassword: ResetPasswordDto) {
        const result = await this.authService.resetPassword(resetPassword.email, resetPassword.token, resetPassword.newPassword);
        if (result)
            return {
                "message": "Reset password successfully"
            }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/verify')
    async verifyEmail(@Query() query) {
        const authResponse = await this.authService.verifyEmail(query.email, query.token);
        return authResponse;
    }


    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(@Req() req) {

    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookCallback(@Req() req,@Res() res){
        const isExisted: Boolean | User = await this.authService.checkIsExistedAccount("facebook", req.user.facebookId);

        const authResponse: AuthResponse  = await this.authService.facebookAuth(req.user, isExisted);

        const redirectUrl 
            = `${this.clientUrl}/login/facebook?access_token=${authResponse.accessToken}&refresh_token=${authResponse.refreshToken}&user_id=${authResponse.userId}` 

        return res.redirect(redirectUrl);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req) {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req,@Res() res){

        const isExisted: Boolean | User = await this.authService.checkIsExistedAccount("google", req.user.email)

        const authResponse: AuthResponse = await this.authService.googleAuth(req.user, isExisted);
        
        const queryParams = 
            `access_token=${authResponse.accessToken}&refresh_token=${authResponse.refreshToken}&user_id=${authResponse.userId}`

        const redirectUrl = `${this.clientUrl}/login/google?${queryParams}` 

        return res.redirect(redirectUrl);
        
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(RegisterResponse),
        },
    })
    async register(@Body() registerDto: RegisterDto): Promise<ResponseTemplate<RegisterResponse>> {
        const authResponse: RegisterResponse = await this.authService.register(registerDto);
        
        const response: ResponseTemplate<RegisterResponse> = {
            data: authResponse,
            message: "Register successfully, Please verify your email.",
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

        const authResponse: AuthResponse  = await this.authService.login(loginDto);

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
        const requestTokenResponse: RequestTokenResponse  = await this.authService.requestToken(requestTokenDto);

        const response: ResponseTemplate<RequestTokenResponse> = {
            data: requestTokenResponse,
            statusCode: HttpStatus.OK,
            message: "Request token successfully"
        }
        return response;
    }
}
