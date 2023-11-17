import { UserRole } from './user-role.entity';

export const userRoleProviders = [{ provide: 'UserRoleRepository', useValue: UserRole }];