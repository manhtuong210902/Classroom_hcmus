import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewProviders } from './review.provider';
import { ClassAuthMiddleware } from 'src/lib/security/middleware/class-auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ReviewService, ...ReviewProviders],
  controllers: [ReviewController],
  imports:[UserModule]

})
export class ReviewModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ClassAuthMiddleware).forRoutes(ReviewController);
  }
}
