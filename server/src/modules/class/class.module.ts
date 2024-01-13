import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { classProviders } from './class.provider';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { ClassAuthMiddleware } from 'src/lib/security/middleware/class-auth.middleware';

@Module({
    providers: [ClassService, ...classProviders],
    controllers: [ClassController],
    imports: [RoleModule, UserModule],
    exports: [ClassService]
})
export class ClassModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ClassAuthMiddleware).forRoutes(ClassController);
    }
}
