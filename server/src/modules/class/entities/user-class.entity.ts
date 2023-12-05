import { Column, Model, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Class } from './class.entity';
import { Role } from 'src/modules/role/role.entity';

@Table({
    tableName: "user_classes",
    timestamps: false
})
export class UserClass extends Model<UserClass>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;
    
    @ForeignKey(() => User)
    @Column
    user_id: string;
    
    @ForeignKey(() => Class)
    @Column
    class_id: string;

    @ForeignKey(() => Role)
    @Column
    role_id: string;
}
