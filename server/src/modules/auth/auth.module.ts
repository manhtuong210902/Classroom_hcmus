import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { JwtModule } from 'src/lib/security/jwt/jwt.module';

@Module({
    imports:[UserModule,RoleModule,JwtModule],
    controllers: [AuthController],
    providers: [
        AuthService,
    ]
})
export class AuthModule {}
