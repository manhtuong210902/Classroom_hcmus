import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';

@Module({
  providers: [CompositionService],
  controllers: [CompositionController]
})
export class CompositionModule {}
