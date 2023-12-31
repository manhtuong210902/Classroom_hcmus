import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';
import { Role } from '../../role/role.entity';

@Table({
    "tableName": "user_roles",
    "timestamps": false
})
export class UserRole extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.UUID,
    })
    role_id: string;
}