import { Class } from './entities/class.entity';

export const classProviders = [{ provide: 'ClassRepository', useValue: Class }];