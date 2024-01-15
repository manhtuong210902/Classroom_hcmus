import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';
import { compositionProviders } from './composition.provider';
import { ClassAuthMiddleware } from 'src/lib/security/middleware/class-auth.middleware';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { ChunkQueueModule } from 'src/jobs/chunk/chunk.module';
import { NotificationModule } from '../notification/notification.module';
import { GradeQueueModule } from 'src/jobs/grade_board/grade-board.module';

@Module({
  providers: [CompositionService,...compositionProviders],
  controllers: [CompositionController],
  imports: [UserModule, FileModule, ChunkQueueModule, NotificationModule, FileModule,GradeQueueModule]
})
export class CompositionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClassAuthMiddleware).forRoutes(CompositionController);
  }
}
