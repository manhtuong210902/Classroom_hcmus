import { Column, Model, DataType, Table, HasMany, BelongsToMany} from 'sequelize-typescript';
import { UserRole } from '../user-role/user-role.entity';
import { User } from '../user/user.entity';

@Table({
    "tableName": "roles",
    "timestamps": false
})
export class Role extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        allowNull: false,
    })
    role_name: string;

    @BelongsToMany(()=>User,() => UserRole)
    roles: Role[];
}