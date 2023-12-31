import { Column, Model, DataType, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { UserClass } from './user-class.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { GradeComposition } from 'src/modules/composition/entities/grade-composition.entity';

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

    @Column({
        type: DataType.UUID,
    })
    owner_id: string;

    @Column
    subject: string;

    @Column({
        allowNull: true,
    })
    description: string;

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
    
    @HasMany(() => GradeComposition)    
    grade_compositions: GradeComposition[]
    
}