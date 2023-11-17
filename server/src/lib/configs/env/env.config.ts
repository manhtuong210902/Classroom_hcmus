import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

export class CustomConfigService extends ConfigService {
  constructor() {
    super();
    const NODE_ENV = this.get<string>('NODE_ENV');
    dotenv.config({
      path: NODE_ENV === 'prod' ? '.env.prod' : `.env.${NODE_ENV}`,
    });
  }
}