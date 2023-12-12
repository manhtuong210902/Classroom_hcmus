import { Column, Model, DataType, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Class } from 'src/modules/class/entities/class.entity';


/**
 * Each class has a grade
 * a grade has somes grade composition
 * Class 0..* ->  1..1 GradeComposition
 */
@Table({
    tableName: "grade_compositions",
    timestamps: false
})
export class GradeComposition extends Model<GradeComposition> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({})
    name: string;

    @Column({
        type: DataType.FLOAT
    })
    scale : number;

    @Column({
        type: DataType.INTEGER
    })
    position: number;

    @Column({
        allowNull: true,
        defaultValue: false
    })
    is_final: Boolean;

    @ForeignKey(() => Class)
    @Column({
        type: DataType.UUID,
    })
    class_id : string;

    @BelongsTo(()=>Class)
    class: Class;

}