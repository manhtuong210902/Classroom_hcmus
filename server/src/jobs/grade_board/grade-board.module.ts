import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GradeProcessor } from './grade-board.processor';
import { compositionProviders } from 'src/modules/composition/composition.provider';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'grades',
        }),
    ],
    providers: [
        GradeProcessor,
        ...compositionProviders
    ],
    exports: [BullModule]
})
export class GradeQueueModule {}