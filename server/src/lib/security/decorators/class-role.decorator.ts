import { SetMetadata } from '@nestjs/common';

export const ClassRole = (roles: string[]) => SetMetadata('class-roles', roles);