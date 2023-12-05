import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/role/role.entity';

const matchRoles = (classRoles: string[], userRoles: string[]) => {
  return userRoles.some(userRole => classRoles.includes(userRole));
};

@Injectable()
export class ClassRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const classRoles = this.reflector.get<string[]>('class-roles', context.getHandler());
    if (!classRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const userRoles = req.classRoles
    
    return matchRoles(classRoles, userRoles);
  }
}