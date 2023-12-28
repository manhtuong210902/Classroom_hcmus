import { Column, Model, DataType, Table, ForeignKey, BeforeUpdate } from 'sequelize-typescript';
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

    @Column({
        type: DataType.STRING,
    })
    student_id: string;

    @ForeignKey(()=>GradeComposition)
    @Column({
        type: DataType.UUID,
    })
    grade_id: string;

    @Column({
        allowNull: true,
        type: DataType.FLOAT
    })
    grade: number;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    class_id: string;


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

    @BeforeUpdate
    static runBeforeUpdate(instance: StudentComposition) {
        instance.updated_at = new Date();
    }

}