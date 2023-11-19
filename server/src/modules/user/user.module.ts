import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { CloudinaryModule } from 'src/lib/configs/cloudinary/cloudinary.module';

@Module({
    imports: [CloudinaryModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [UserService]
})
export class UserModule { }
