import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenType } from "src/lib/util/constant";
import {sign,verify} from "jsonwebtoken"
import * as expiredTime from "../../util/constant/token-expired-time"

@Injectable()
export class JwtService {
    constructor(
        private configService: ConfigService
    ) {}
    
    async generateToken(tokenType: TokenType,userId: string,roleName: string): Promise<string>{
        let expiresIn : string  = expiredTime.ACCESS_TOKEN_EXPIRED_TIME;
        if(tokenType === TokenType.REFRESH_TOKEN){
            expiresIn = expiredTime.REFRESH_TOKEN_EXPIRED_TIME;
        }
        return await sign({ userId, roleName,tokenType }, this.configService.get<string>('JWT_SECRET_KEY'), {
            expiresIn: expiresIn,
        });
    }

    async verifyToken(token:string,tokenType: TokenType,roleName:string) : Promise<Boolean>{
        try {
            const verified = await verify(token,this.configService.get<string>('JWT_SECRET_KEY'))
            if(
                verified.tokenType === tokenType 
                && roleName === verified.roleName
            ){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
        
    }
}