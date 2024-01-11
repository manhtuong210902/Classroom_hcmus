import { AdminModule } from "./admin/admin.module";
import { ActiveClass } from "./admin/entities/active-class.entity";
import { ActiveUser } from "./admin/entities/active-user.entity";
import { AuthModule } from "./auth/auth.module";
import { ClassModule } from "./class/class.module";
import { Class } from "./class/entities/class.entity";
import { UserClass } from "./class/entities/user-class.entity";
import { CompositionModule } from "./composition/composition.module";
import { GradeComposition } from "./composition/entities/grade-composition.entity";
import { StudentComposition } from "./composition/entities/student-composition.entity";
import { StudentId } from "./composition/entities/student-id.entity";
import { Chunk } from "./file/entities/chunk.entity";
import { File } from "./file/entities/file.entity";
import { FileModule } from "./file/file.module";
import { Notification } from "./notification/class_notifications.entity";
import { NotificationModule } from "./notification/notification.module";
import { CommentReview } from "./review/entities/comment-review.entity";
import { ReviewComposition } from "./review/entities/review-compostion.entity";
import { ReviewModule } from "./review/review.module";
import { Role } from "./role/role.entity";
import { RoleModule } from "./role/role.module";
import { UserRole } from "./user/entities/user-role.entity";
import { User } from "./user/entities/user.entity";
import { UserModule } from "./user/user.module";

export const sequelizeModules = [
    Class,
    User,
    Role,
    UserClass,
    UserRole,
    GradeComposition,
    StudentComposition,
    ReviewComposition,
    CommentReview,
    File,
    Chunk,
    StudentId,
    Notification,
    ActiveClass,
    ActiveUser
]

export const serviceModules = [
    AuthModule,
    UserModule,
    ClassModule,
    RoleModule,
    CompositionModule,
    ReviewModule,
    FileModule,
    NotificationModule,
    AdminModule
]