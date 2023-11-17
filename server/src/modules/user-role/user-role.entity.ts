import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

@Table({
    "tableName": "user_roles",
    "timestamps": false
})
export class UserRole extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>User)
    @Column
    user_id: string;

    @ForeignKey(()=>Role)
    @Column
    role_id: string;
}