import { Controller, HttpStatus, HttpCode, BadRequestException} from '@nestjs/common';
import { Post,Body, Get, Req, Query } from '@nestjs/common/decorators';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './response/auth-response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { RequestTokenDto } from './dto/request-token.dto';
import { RequestTokenResponse } from './response/request-token-response';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(AuthResponse,ResponseTemplate,RequestTokenResponse)
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('/mail')
    async sendEMail(@Query() query) {
        this.authService.sendValidateEmail(query.user_id, query.email);
        return 'ok';
    }

    @HttpCode(HttpStatus.OK)
    @Get('/verify')
    async verifyEmail(@Query() query) {
        const isValid = this.authService.verifyEmail(query.user_id, query.email, query.token);
        return isValid;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(AuthResponse),
        },
    })
    async register(@Body() registerDto: RegisterDto) : Promise<ResponseTemplate<AuthResponse>>{
        const authResponse: AuthResponse | string = await this.authService.register(registerDto);
        
        if (typeof authResponse === 'string') {
            throw new BadRequestException({"message": authResponse});
        }
        
        const response : ResponseTemplate<AuthResponse> ={
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
    async login(@Body() loginDto: LoginDto): Promise<ResponseTemplate<AuthResponse>>{
        
        const authResponse : AuthResponse | string= await this.authService.login(loginDto);
        if (typeof authResponse === 'string') {
            throw new BadRequestException({"message": authResponse});
        }
        const response : ResponseTemplate<AuthResponse> ={
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
        : Promise<ResponseTemplate<RequestTokenResponse>>
    {
        const requestTokenResponse : RequestTokenResponse| string = await this.authService.requestToken(requestTokenDto);
        if (typeof requestTokenResponse === 'string') {
            throw new BadRequestException({"message": requestTokenResponse});
        }
        const response : ResponseTemplate<RequestTokenResponse> = {
            data: requestTokenResponse,
            statusCode: HttpStatus.OK,
            message: "Request token successfully"
        }
        return response;
    }
}
