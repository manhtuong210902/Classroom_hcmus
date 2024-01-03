import { CommentReview } from "./entities/comment-review.entity";
import { ReviewComposition } from "./entities/review-compostion.entity";

export const ReviewProviders = [
    { provide: 'CommentRepository', useValue: CommentReview },
    { provide: 'ReviewRepository', useValue: ReviewComposition}
];