import { UserRole } from "../user/entities/user-role.entity";
import { ActiveClass } from "./entities/active-class.entity";
import { ActiveUser } from "./entities/active-user.entity";

export const AdminProvider = [
    {provide: 'ActiveClassRepository', useValue: ActiveClass},
    {provide: 'ActiveUserRepository', useValue: ActiveUser},
    {provide: 'UserRoleRepository', useValue: UserRole}
] 