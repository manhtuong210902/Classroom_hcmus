import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { UserClass } from 'src/modules/class/entities/user-class.entity';
import { GradeComposition } from './grade-composition.entity';
import { Class } from 'src/modules/class/entities/class.entity';


/**
 * student_id from excel file uploaded by teacher
 * 
 */
@Table({
    tableName: "student_ids",
    timestamps: false
})
export class StudentId extends Model<StudentId> {
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

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    student_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    full_name: string;

}