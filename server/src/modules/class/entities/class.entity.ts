import { Column, Model, DataType, Table, BelongsToMany } from 'sequelize-typescript';
import { UserClass } from './user-class.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
    tableName: "classes",
    timestamps: false
})
export class Class extends Model<Class> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({})
    name: string;

    @Column
    title : string;

    @Column
    owner_id: string;

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

    @BelongsToMany(() => User, () => UserClass)
    user_classes: UserClass[];
    

}