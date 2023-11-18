// logger.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as morgan from 'morgan';

@Module({})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('combined')) 
      .forRoutes('*'); 
  }
}
