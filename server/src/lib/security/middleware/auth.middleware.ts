import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { RoleType, TokenType } from 'src/lib/util/constant';
import { UserService } from 'src/modules/user/user.service';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
import { RoleService } from 'src/modules/role/role.service';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async use(req: Request | any, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        let user;
        let roles;

        if (!bearerHeader || !accessToken || bearerHeader.split(' ')[0] !== 'Bearer') {
            throw new ForbiddenException('Please register or sign in.');
        }

        try {
            user = await this.userService.findOne({ access_token: accessToken });
            
            const isValidToken : Boolean  = await this.jwtService.verifyToken(
                accessToken,
                TokenType.ACCESS_TOKEN,
                RoleType.USER,
            );
            if (!isValidToken){
                throw new ForbiddenException("Invalid token")
            }
            roles = user.roles
        } catch (error) {
            throw new ForbiddenException('Please register or sign in.');
        }

        if (user) {
            req.user = user;
            req.roles = roles;
        }
        next();
    }
}
