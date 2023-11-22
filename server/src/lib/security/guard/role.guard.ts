import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/role/role.entity';

const matchRoles = (role: string, userRoles: Role[]) => {
  return userRoles.some(userRole => role === userRole?.role_name);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const userRoles = req.roles

    return matchRoles(role, userRoles);
  }
}