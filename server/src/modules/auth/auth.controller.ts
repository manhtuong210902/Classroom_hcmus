import { Controller, HttpStatus, HttpCode, BadRequestException} from '@nestjs/common';
import { Post,Body } from '@nestjs/common/decorators';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './response/auth-response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    async register(@Body() registerDto: RegisterDto) {
        const authResponse: AuthResponse | string = await this.authService.register(registerDto);
        
        if (typeof authResponse === 'string') {
            throw new BadRequestException({"message": authResponse});
        }
        
        const response : ResponseTemplate ={
            data: authResponse,
            message: "Register successfully",
            statusCode: HttpStatus.CREATED
        } 
        return response;
    }
  
    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() loginDto: LoginDto){
        
        const authResponse : AuthResponse | string= await this.authService.login(loginDto);
        if (typeof authResponse === 'string') {
            throw new BadRequestException({"message": authResponse});
        }
        const response : ResponseTemplate ={
            data: authResponse,
            message: "Login successfully",
            statusCode: HttpStatus.OK
        } 
        return response;
    }
}
