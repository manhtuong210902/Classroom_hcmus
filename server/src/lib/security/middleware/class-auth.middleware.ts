import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleService } from 'src/modules/role/role.service';
import { UserService } from 'src/modules/user/user.service';
import { ClassRoleType } from 'src/utils';

@Injectable()
export class ClassAuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
    ) {}

    async use(req: Request | any, res: Response, next: () => void) {
        const classId = req.params.classId || req.body.classId || req.query.class_id;
        if (!classId) {
            console.log("oke")
            next();
            return;
        }
        try {
            const info : any = (await this.userService.findUserInClassWithRole(req.user.id, classId))[0];
            const role = await this.roleService.findOneById(info.role_id);
            
            req.classRoles = [role.role_name]
            if(req.user.id === info.owner){
                req.classRoles.push(ClassRoleType.OWNER);
            }
        } catch (error) {
            console.log(error)
        }
        next();
    }
}
