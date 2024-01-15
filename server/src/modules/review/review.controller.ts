import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { RoleType } from 'src/lib/util/constant';
import { ClassRole } from 'src/lib/security/decorators/class-role.decorator';
import { ClassRoleType } from 'src/utils';
import { RequestReviewDto } from './dto/request-review.dto';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { CommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { FinalReviewDto } from './dto/final-review.dto';

@ApiTags('review')
@Controller('review')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService
    ) {} 
    
    @HttpCode(HttpStatus.CREATED)
    @Post('/:classId/request')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT])
    async requestReview(
        @Req() req,
        @Body() requestReview : RequestReviewDto,
        @Param('classId') classId: string 
    )
        : Promise<ResponseTemplate<Object>>
    {
        const userId = req.user.id;
        const data = await this.reviewService.createReview(userId, classId, requestReview);

        const response : ResponseTemplate<Object> = {
            data: data,
            message:  'Success',
            statusCode: HttpStatus.CREATED
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT])
    async getASpecifyReview(
        @Query() query,
        @Param('classId') classId: string,
        @Req() req
    )
        : Promise<ResponseTemplate<Object>>
    {
        const gradeId = query.grade_id;
        const userId = req.user.id;

        const data = await this.reviewService.getASpecifyReview(userId, classId, gradeId);

        const response : ResponseTemplate<Object> = {
            data: data,
            message: 'success',
            statusCode: HttpStatus.OK
        }

        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId/list')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    async getListReviewsOfAGrade(
        @Param('classId') classId :string,
        @Query() query
    )
        : Promise<ResponseTemplate<Object>>
    {
        const gradeId = query.grade_id;
        const data = await this.reviewService.getListReviewsOfAGrade(classId, gradeId);
        const response : ResponseTemplate<Object> = {
            data: data,
            message: 'success',
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/:classId/comment')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER, ClassRoleType.STUDENT])
    async postComment(
        @Param('classId') classId : string,
        @Req() req,
        @Body() commentDto : CommentDto
    )
        : Promise<ResponseTemplate<Object>>   
    {
        const userId = req.user.id;
        const data = await this.reviewService.postComment(classId, req.user, commentDto);
        const response : ResponseTemplate<Object> = {
            data: data,
            message: 'Success',
            statusCode: HttpStatus.CREATED
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId/comment')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER, ClassRoleType.STUDENT])
    async getComments(
        @Param('classId') classId : string,
        @Query() query
    )
        : Promise<ResponseTemplate<Object>>
    {
        const gradeId = query.grade_id;
        const reviewId = query.review_id;
        const data = await this.reviewService.getComments(classId, gradeId, reviewId);
        const response : ResponseTemplate<Object> = {
            data: data,
            message: 'Success',
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/:classId/final')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    async makeReviewFinal(
        @Param('classId') classId: string,
        @Body() finalReviewDto : FinalReviewDto,
        @Req() req
    ){
        await this.reviewService.makeReviewFinal(finalReviewDto, classId, req.user.id);
        const response : ResponseTemplate<null> = {
            data: null,
            message: "Success",
            statusCode: HttpStatus.OK
        }
        return response;
    }

}
