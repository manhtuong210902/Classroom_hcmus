import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule} from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './lib/configs/database/database.config';
import { LoggerModule } from './lib/configs/logger/logger.module';
import { ConfigurationModule } from './lib/configs/env/env.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { User } from './modules/user/user.entity';
import { Role } from './modules/role/role.entity';
import { UserRole } from './modules/user-role/user-role.entity';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './lib/security/middleware/auth.middleware';
import { JwtModule } from './lib/security/jwt/jwt.module';
import { UserController } from './modules/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './lib/security/guard/role.guard';

@Module({
    imports: [
        ConfigurationModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            useClass: SequelizeConfigService,
        }),
        SequelizeModule.forFeature([User,Role,UserRole]),
        LoggerModule,
        UserModule,
        JwtModule,
        AuthModule,
        RoleModule,
        UserRoleModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes(UserController);
    }
}
