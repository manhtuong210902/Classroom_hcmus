import { NestMiddleware, Injectable} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { ClassRoleType } from 'src/utils';

@Injectable()
export class ClassAuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
    ) {}

    async use(req: Request | any, res: Response, next: () => void) {
        const classId = req.params.classId || req.body.classId || req.query.class_id;
        if (!classId) {
            next();
            return;
        }
        try {
            const info : any = (await this.userService.findUserInClassWithRole(req.user.id, classId))[0];
            req.classRoles = [info.role_name]
            if(req.user.id === info.owner){
                req.classRoles.push(ClassRoleType.OWNER);
            }
        } catch (error) {
            console.log(error)
        }
        next();
    }
}
