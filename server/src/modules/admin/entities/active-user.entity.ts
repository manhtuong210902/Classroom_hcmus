import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';


@Table({
    tableName: "active_users",
    timestamps: false
})
export class ActiveUser extends Model<ActiveUser> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    banned_by: string;

    @Column({
        allowNull: false,
        defaultValue: true
    })
    is_applied: boolean;

    @Column({
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    created_at: Date;

    @Column({
        allowNull: true,
    })
    updated_at: Date;

    @Column({
        allowNull: true,
    })
    deleted_at: Date;

}