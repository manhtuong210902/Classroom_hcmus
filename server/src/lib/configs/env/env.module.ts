import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigService } from './env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useClass: CustomConfigService,
    },
  ],
  exports: [ConfigModule, ConfigService],
})
export class ConfigurationModule {}