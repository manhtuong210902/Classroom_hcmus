import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import {
    VersioningType,
    HttpStatus,
    UnprocessableEntityException,
    ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './lib/filters/bad-request.filter';
import { BadRequestExceptionFilter } from './lib/filters/bad-request.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const NODE_ENV = configService.get<string>('NODE_ENV');
    
    dotenv.config({
        path: NODE_ENV === 'prod' ? '.env.prod' : `.env.${NODE_ENV}`,
    });


    app.use(helmet());

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.setGlobalPrefix("api");
    
    const reflector = app.get(Reflector);

    app.useGlobalFilters(
        new HttpExceptionFilter(reflector),
        new BadRequestExceptionFilter(reflector),
    );

    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          transform: true,
          dismissDefaultMessages: true,
          exceptionFactory: (errors) => new UnprocessableEntityException(errors),
        }),
    );

    const PORT: string = configService.get<string>('PORT');

    await app.listen(PORT,()=>{
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
}
bootstrap();
