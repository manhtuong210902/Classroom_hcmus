import {
    NestMiddleware,
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { ClassRoleType } from 'src/utils';

@Injectable()
export class ClassAuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: Request | any, res: Response, next: () => void) {
        const classId =
            req.params.classId || req.body.classId || req.query.class_id;

        if (!classId || !req.user) {
            next();
            return;
        }

        try {
            const info: any = (
                await this.userService.findUserInClassWithRole(
                    req.user.id,
                    classId,
                )
            )[0];

            if (!info) {
                next();
                return;
            }
            req.userClassId = info.id;
            req.classRoles = [info.role_name];
            if (req.user.id === info.owner) {
                req.classRoles.push(ClassRoleType.OWNER);
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
        next();
    }
}
