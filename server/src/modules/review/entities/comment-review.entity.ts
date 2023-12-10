import { Column, Model, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { UserClass } from 'src/modules/class/entities/user-class.entity';
import { ReviewComposition } from './review-compostion.entity';


/**
 *  review_compositions 1..1  0..1 student_compositions
 */
@Table({
    tableName: "comment_reviews",
    timestamps: false
})
export class CommentReview extends Model<CommentReview> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(()=>ReviewComposition)
    @Column({
        type: DataType.UUID,
    })
    review_id: string;

    @ForeignKey(()=>UserClass)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @Column({
        type: DataType.TEXT
    })
    content: string;

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