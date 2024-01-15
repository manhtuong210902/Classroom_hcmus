import { Column, Model, DataType, Table, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { UserClass } from '../class/entities/user-class.entity';
import { Class } from '../class/entities/class.entity';
import { User } from '../user/entities/user.entity';

@Table({
    tableName: "class_notifications",
    timestamps: false
})
export class Notification extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>UserClass)
    @Column({
        type: DataType.UUID,
    })
    user_class_id: string;

    @ForeignKey(()=>Class)
    @Column({
        type: DataType.UUID,
    })
    class_id: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @Column({
        type: DataType.TEXT
    })
    content: string;

    @Column({
        type: DataType.TEXT
    })
    type: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID
    })
    sender_id: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_seen: boolean;

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