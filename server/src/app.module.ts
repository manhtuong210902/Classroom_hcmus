import { Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './lib/configs/database/database.config';
import { LoggerModule } from './lib/configs/logger/logger.module';
import { ConfigurationModule } from './lib/configs/env/env.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { User } from './modules/user/entities/user.entity';
import { Role } from './modules/role/role.entity';
import { UserRole } from './modules/user/entities/user-role.entity';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './lib/security/middleware/auth.middleware';
import { JwtModule } from './lib/security/jwt/jwt.module';
import { UserController } from './modules/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './lib/security/guard/role.guard';
import { CloudinaryModule } from './lib/configs/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './lib/configs/mailer/mailer.config';
import { ClassModule } from './modules/class/class.module';
import { UserClass } from './modules/class/entities/user-class.entity';
import { Class } from './modules/class/entities/class.entity';
import { ClassRolesGuard } from './lib/security/guard/class-role.guard';
import { ClassController } from './modules/class/class.controller';

@Module({
    imports: [
        ConfigurationModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            useClass: SequelizeConfigService,
        }),
        SequelizeModule.forFeature([User, Role, UserRole, UserClass, Class]),
        MailerModule.forRootAsync({
            useClass: MailerConfigService,
        }),
        MulterModule.register(),
        LoggerModule,
        UserModule,
        JwtModule,
        AuthModule,
        RoleModule,
        CloudinaryModule,
        ClassModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ClassRolesGuard,
        }
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
