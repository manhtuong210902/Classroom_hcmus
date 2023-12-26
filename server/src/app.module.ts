import { Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './lib/configs/database/database.config';
import { LoggerModule } from './lib/configs/logger/logger.module';
import { ConfigurationModule } from './lib/configs/env/env.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { AuthMiddleware } from './lib/security/middleware/auth.middleware';
import { JwtModule } from './lib/security/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './lib/security/guard/role.guard';
import { CloudinaryModule } from './lib/configs/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './lib/configs/mailer/mailer.config';
import { ClassRolesGuard } from './lib/security/guard/class-role.guard';
import { sequelizeModules, serviceModules } from './modules';
import { FileModule } from './modules/file/file.module';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        ConfigurationModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            useClass: SequelizeConfigService,
        }),
        SequelizeModule.forFeature(sequelizeModules),
        MailerModule.forRootAsync({
            useClass: MailerConfigService,
        }),
        MulterModule.register(),
        LoggerModule,
        JwtModule,
        BullModule,
        CloudinaryModule,
        ...serviceModules,
        FileModule
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
