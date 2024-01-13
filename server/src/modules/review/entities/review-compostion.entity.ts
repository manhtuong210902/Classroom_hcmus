import { Column, Model, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { StudentComposition } from '../../composition/entities/student-composition.entity';
import { CommentReview } from './comment-review.entity';
import { GradeComposition } from 'src/modules/composition/entities/grade-composition.entity';


/**
 *  review_compositions 1..1  0..1 student_compositions
 */
@Table({
    tableName: "review_compositions",
    timestamps: false
})
export class ReviewComposition extends Model<ReviewComposition> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>StudentComposition)
    @Column({
        type: DataType.UUID,
    })
    student_composition_id: string;

    @ForeignKey(()=>GradeComposition)
    @Column({
        type: DataType.UUID,
    })
    grade_id : string;

    @Column({
        type: DataType.FLOAT
    })
    current_grade: number;

    @Column({
        type: DataType.FLOAT
    })
    expected_grade: number;

    @Column({
        type: DataType.TEXT
    })
    explaination: string;

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