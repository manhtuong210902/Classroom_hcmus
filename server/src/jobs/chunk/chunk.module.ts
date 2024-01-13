import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CombineChunksProcessor } from './chunk.processor';
import { fileProviders } from 'src/modules/file/file.provider';
import { compositionProviders } from 'src/modules/composition/composition.provider';
import { GradeQueueModule } from '../grade_board/grade-board.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'chunks',
        }),
        GradeQueueModule,
    ],
    providers: [
        CombineChunksProcessor,
        ...fileProviders,
        ...compositionProviders
    ],
    exports: [BullModule]
})
export class ChunkQueueModule {}