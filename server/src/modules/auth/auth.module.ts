import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { JwtModule } from 'src/lib/security/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
    imports:[UserModule,RoleModule,JwtModule,
        PassportModule.register({'defaultStrategy': 'jwt'})
    ],
    controllers: [AuthController],
    providers: [
        AuthService,ConfigService,GoogleStrategy, FacebookStrategy
    ],
    exports: [ConfigService]
})
export class AuthModule {}
