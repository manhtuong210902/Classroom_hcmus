import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { Class } from 'src/modules/class/entities/class.entity';
import { User } from 'src/modules/user/entities/user.entity';


@Table({
    tableName: "active_classes",
    timestamps: false
})
export class ActiveClass extends Model<ActiveClass> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>Class)
    @Column({
        type: DataType.UUID,
    })
    class_id: string;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    banned_by: string;

    @Column({
        allowNull: false
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