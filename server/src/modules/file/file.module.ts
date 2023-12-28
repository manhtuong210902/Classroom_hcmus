import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { fileProviders } from './file.provider';
import { ChunkQueueModule } from 'src/jobs/chunk/chunk.module';

@Module({
  imports: [ChunkQueueModule],
  providers: [
    FileService,  
    ...fileProviders, 
  ],
  exports: [FileService]
})
export class FileModule {}
