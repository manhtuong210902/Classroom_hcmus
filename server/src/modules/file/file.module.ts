import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { fileProviders } from './file.provider';

@Module({
  providers: [FileService, ...fileProviders],
  exports: [FileService]
})
export class FileModule {}
