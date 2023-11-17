import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (role, userRoles) => {
  return userRoles.some(userRole => role === userRole);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const userRoles = req.roles
    
    return matchRoles(role, userRoles);
  }
}