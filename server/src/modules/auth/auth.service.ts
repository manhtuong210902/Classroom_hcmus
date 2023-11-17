import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { RegisterDto } from './dto/register.dto';
import { RoleType, TokenType } from 'src/lib/util/constant';
import { AuthResponse } from './response/auth-response';
import { LoginDto } from './dto/login.dto';
import { validateHash } from 'src/lib/util/func';
import { JwtService } from 'src/lib/security/jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto) : Promise<AuthResponse|string>{
        try {
            const isExistedusername = await this.userService.findOne({"username":registerDto.username});
            if(isExistedusername){
                return "Username already exists";
            }
            const newUser = await this.userService.createUser(registerDto);
            const userRole = await this.roleService.findOrCreate(RoleType.USER);
            await newUser.$add('roles', userRole[0].id)
            
            const tokens = await this.assignTokens(newUser.id, RoleType.USER);

            const authResponse : AuthResponse ={
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                imgUrl: null,
                username: newUser.username,
                userId: newUser.id
            }
            return authResponse
        } catch (error) {
            return error.message;
        }
    }

    async login(loginDto: LoginDto):Promise<AuthResponse|string>{
        try {
            const hasUser = await this.userService.findOne({"username":loginDto.username});
            if (!hasUser){
                return "no user found"
            }
            const isRightPassword = await validateHash(loginDto.password, hasUser.password)
            if(!isRightPassword){
                return "username or password is incorrect"
            }
            const tokens = await this.assignTokens(hasUser.id, RoleType.USER);

            const authResponse : AuthResponse ={
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                imgUrl: null,
                username: hasUser.username,
                userId: hasUser.id
            }
            return authResponse
        } catch (error) {
            return error.message;
        }
    }

    async assignTokens(userId:string,roleName:string){
        const accessToken = await this.jwtService.generateToken(TokenType.ACCESS_TOKEN,userId,roleName)
        const refreshToken = await this.jwtService.generateToken(TokenType.REFRESH_TOKEN,userId,roleName);
    
        this.userService.updateUser({
            access_token: accessToken,
            refresh_token: refreshToken
        },userId)

        return {
            accessToken,
            refreshToken
        }
    }   
}
