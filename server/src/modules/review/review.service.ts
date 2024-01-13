import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommentReview } from './entities/comment-review.entity';
import { ReviewComposition } from './entities/review-compostion.entity';
import { RequestReviewDto } from './dto/request-review.dto';
import sequelize from 'sequelize';
import { convertSnakeToCamel } from 'src/lib/util/func';
import { CommentDto } from './dto/comment.dto';
import { FinalReviewDto } from './dto/final-review.dto';
import { NotificationService } from '../notification/notification.service';
import { SOCKET_MSG, SOCKET_TYPE } from 'src/utils';
import { ClassService } from '../class/class.service';

@Injectable()
export class ReviewService {

    constructor(
        @Inject('CommentRepository')
        private readonly commentModel: typeof CommentReview,

        @Inject('ReviewRepository')
        private readonly reviewModel: typeof ReviewComposition,

        private readonly notificationService: NotificationService
    ) { }

    async isExistedReview(studentCompositionId: string): Promise<boolean> {
        try {
            const query: any = await this.reviewModel.sequelize.query(
                `
                SELECT *
                FROM review_compositions
                WHERE student_composition_id = :studentCompositionId;
                `,
                {
                    replacements: {
                        studentCompositionId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            if (query.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }


    async createReview(
        userId: string,
        classId: string,
        requestReview: RequestReviewDto
    ) {

        try {
            const query: any = await this.reviewModel.sequelize.query(
                `
                WITH student_ids AS (
                    SELECT student_id
                    FROM user_classes 
                    WHERE user_id = :userId AND class_id = :classId
                )
    
                SELECT id, grade
                FROM student_compositions
                WHERE grade_id = :gradeId AND student_id IN (
                    SELECT student_id FROM student_ids
                );    
                `,
                {
                    replacements: {
                        userId,
                        classId,
                        gradeId: requestReview.gradeId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            const studentCompositionId = query[0].id;

            const isExist = await this.isExistedReview(studentCompositionId)
            if (isExist) {
                throw new BadRequestException({
                    "message": "Review already exists",
                })
            }

            const currentGrade = query[0].grade

            const newReview = await this.reviewModel.create({
                student_composition_id: studentCompositionId,
                current_grade: currentGrade,
                expected_grade: requestReview.expectedGrade,
                explaination: requestReview.explaination,
                grade_id: requestReview.gradeId
            })

            await this.notificationService.createNotifycationForAllTeacherInClass({
                classId: classId,
                content: SOCKET_MSG.STUDENT_REQUEST_REVIEW,
                type: SOCKET_TYPE.STUDENT_REQUEST_REVIEW,
                contentUrl: 'http://requestreviewnew.com'
            })

            return convertSnakeToCamel(newReview.dataValues);
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    async getASpecifyReview(userId: string, classId: string, gradeId: string) {
        try {

            // get list review of all grade for student
            if (!gradeId) {
                const query = await this.reviewModel.sequelize.query(
                    `
                    SELECT rc.*, si.* , grade_compositions.name AS grade_name
                    FROM review_compositions AS rc
                    JOIN grade_compositions 
                        ON grade_compositions.id = rc.grade_id AND grade_compositions.class_id = :classId
                    JOIN student_compositions AS sc
                        ON sc.id = rc.student_composition_id
                    JOIN student_ids AS si
                        ON si.student_id = sc.student_id
                    JOIN user_classes AS uc
                        ON uc.student_id = sc.student_id; 
                    `,
                    {
                        replacements:{
                            classId
                        },
                        type: sequelize.QueryTypes.SELECT
                    }
                )
                return convertSnakeToCamel(query);
            }

            const query: any = await this.reviewModel.sequelize.query(
                `
                    SELECT student_id
                    FROM user_classes 
                    WHERE user_id = :userId AND class_id = :classId;
                `,
                {
                    replacements: {
                        userId,
                        classId,
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            const studentId = query[0].student_id;

            const queryStudentComp: any = await this.reviewModel.sequelize.query(
                `
                SELECT * 
                FROM student_compositions
                WHERE student_id = :studentId AND grade_id = :gradeId; 
                `,
                {
                    replacements: {
                        studentId,
                        gradeId: gradeId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            const querySelectReview = await this.reviewModel.sequelize.query(
                `
                SELECT *
                FROM review_compositions
                WHERE student_composition_id = :studentCompId;
                `,
                {
                    replacements: {
                        studentCompId: queryStudentComp[0].id
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            const review: any = querySelectReview[0];


            return convertSnakeToCamel(review);

        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    private async checkGradeInClass(gradeId, classId) {
        try {
            const check = await this.reviewModel.sequelize.query(
                `
                SELECT * FROM grade_compositions
                WHERE class_id = :classId AND id = :gradeId;
                `,
                {
                    replacements: {
                        gradeId,
                        classId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            if (check.length < 0) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    async getListReviewsOfAGrade(classId, gradeId) {
        try {
            // get all review in class
            if (!gradeId) {
                const query = await this.reviewModel.sequelize.query(
                    `
                    SELECT rc.*, si.*, grade_compositions.name AS grade_name
                    FROM review_compositions AS rc
                    JOIN grade_compositions 
                        ON grade_compositions.id = rc.grade_id AND grade_compositions.class_id = :classId
                    JOIN student_compositions AS sc
                        ON sc.id = rc.student_composition_id
                    JOIN student_ids AS si
                        ON si.student_id = sc.student_id;
                    `,
                    {
                        replacements: {
                            classId
                        },
                        type: sequelize.QueryTypes.SELECT
                    }
                )

                return convertSnakeToCamel(query);
            }
            const check = await this.checkGradeInClass(classId, gradeId);
            if (!check) {
                return [];
            }

            const query = await this.reviewModel.sequelize.query(
                `
                SELECT *
                FROM review_compositions
                WHERE grade_id = :gradeId;
                `,
                {
                    replacements: {
                        gradeId: gradeId,
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            return convertSnakeToCamel(query);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async checkIsTeacherFromUserClasses(classId: string, userId: string): Promise<boolean> {
        try {
            const query: any = await this.reviewModel.sequelize.query(
                `
                SELECT *,
                CASE WHEN roles.role_name = 'TEACHER' THEN true ELSE false END as is_teacher,
                FROM user_classes
                JOIN roles ON roles.id = user_classes.role_id
                WHERE user_classes.class_id = :classId AND user_classes.user_id = :userId;
                `,
                {
                    replacements: {
                        classId,
                        userId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            if (query[0].is_teacher)
                return true
            return false;
        } catch (error) {
            return false;
        }
    }

    async postComment(
        classId: string,
        userId: string,
        commentDto: CommentDto
    ) {
        try {
            const check = await this.checkGradeInClass(classId, commentDto.gradeId);
            if (!check) {
                throw new BadRequestException();
            }

            const newComment = await this.commentModel.create({
                user_id: userId,
                content: commentDto.content,
                review_id: commentDto.reviewId,
            })

            if (await this.checkIsTeacherFromUserClasses(classId, userId)) {
                await this.notificationService.createNotifycationForOneStudent({
                    userId: userId,
                    classId: classId,
                    content: SOCKET_MSG.TEACHER_COMMENT_REVIEW,
                    type: SOCKET_TYPE.TEACHER_COMMENT_REVIEW,
                    contentUrl: ''
                })
            } else {
                await this.notificationService.createNotifycationForAllTeacherInClass({
                    classId: classId,
                    content: SOCKET_MSG.STUDENT_COMMENT_REVIEW,
                    type: SOCKET_TYPE.STUDENT_COMMENT_REVIEW,
                    contentUrl: ''
                })
            }

            return convertSnakeToCamel(newComment.dataValues);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    async getComments(
        classId: string,
        gradeId: string,
        reviewId: string
    ) {
        if (!reviewId || !gradeId) {
            throw new BadRequestException({
                "message": "Missing required parameter"
            })
        }

        // check many things here

        try {
            const query = await this.commentModel.sequelize.query(
                `
                SELECT cr.*, users.fullname, users.img_url
                FROM comment_reviews AS cr
                JOIN users 
                ON users.id = cr.user_id 
                WHERE cr.review_id = :reviewId;
                `,
                {
                    replacements: {
                        reviewId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            return convertSnakeToCamel(query);
        } catch (error) {
            return []
        }
    }


    async makeReviewFinal(finalReviewDto: FinalReviewDto, classId: string) {
        try {
            await this.reviewModel.sequelize.query(
                `
                UPDATE student_compositions
                SET grade = :finalGrade
                WHERE class_id = :classId AND grade_id = :gradeId AND student_id = :studentId;
                `,
                {
                    replacements: {
                        finalGrade: finalReviewDto.finalGrade,
                        classId,
                        gradeId: finalReviewDto.gradeId,
                        studentId: finalReviewDto.studentId
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            )

            await this.notificationService.createNotifycationForOneStudent({
                studentId: finalReviewDto.studentId,
                classId: classId,
                content: SOCKET_MSG.TEACHER_FINAL_REVIEW,
                type: SOCKET_TYPE.TEACHER_FINAL_REVIEW,
                contentUrl: 'http://aaa.a'
            })

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
