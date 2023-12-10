import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { UserClass } from 'src/modules/class/entities/user-class.entity';
import { GradeComposition } from './grade-composition.entity';


/**
 * user_classes 0..*     0..* grade_compotisions 
 * -> student_compotisions
 */
@Table({
    tableName: "student_compositions",
    timestamps: false
})
export class StudentComposition extends Model<StudentComposition> {
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
    student_id: string;

    @ForeignKey(()=>GradeComposition)
    @Column({
        type: DataType.UUID,
    })
    composition_id: string;

    @Column({
        allowNull: true,
        type: DataType.FLOAT
    })
    grade: number;

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