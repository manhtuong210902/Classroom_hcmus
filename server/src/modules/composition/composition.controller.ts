import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get,
    HttpCode, 
    HttpStatus, 
    Logger, 
    Param, 
    Patch, 
    Post,
    Query,
    Req,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CompositionService } from './composition.service';
import { RoleType } from 'src/lib/util/constant';
import { Role } from 'src/lib/security/decorators/role.decorator';
import { ClassRole } from 'src/lib/security/decorators/class-role.decorator';
import { ClassRoleType } from 'src/utils';
import { GradeCompositionDto } from './dto/grade-composition.dto';
import { GradeCompositionResponse } from './response/grade-composition.response';
import { ResponseTemplate } from 'src/lib/interfaces/response.template';
import { IsSucccessResponse } from './response/is-success.response';
import { UpdatePositionDto } from './dto/update-position.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import { UploadStudentListDto } from './dto/upload-student-list.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { GradeBoardResponse } from './response/grade-board.response';
import { UpdateOneBoardDto } from './dto/update-one-board.dto';

@Controller('composition')
@ApiTags('composition')
export class CompositionController {
    constructor(
        private readonly compositionService: CompositionService,
        private readonly fileService: FileService
    ){}   

    @Post('/:classId/management')
    @HttpCode(HttpStatus.CREATED)
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(GradeCompositionResponse)
    @ApiResponse({
        status: HttpStatus.CREATED,
        schema: {
            $ref: getSchemaPath(GradeCompositionResponse),
        }
    })
    async createGradeComposition(
        @Body() gradeCompositionDto : GradeCompositionDto,
        @Param('classId') classId : string
    )
        : Promise<ResponseTemplate<GradeCompositionResponse>>
    {
        const newGradeComposition : GradeCompositionResponse
            = await this.compositionService.createNewGradeComposition(gradeCompositionDto, classId);

        const response : ResponseTemplate<GradeCompositionResponse> = {
            data: newGradeComposition,
            message: 'Success',
            statusCode: HttpStatus.CREATED
        }

        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId/management/list')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.STUDENT, ClassRoleType.TEACHER])
    @ApiExtraModels(GradeCompositionResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            type: 'array',
            items: {
                $ref : getSchemaPath(GradeCompositionResponse)
            }
        }
    })
    async getListGradeCompositions(
        @Param('classId') classId: string,
    )
      : Promise<ResponseTemplate<GradeCompositionResponse[]>>
    {

        const gradeCompositions : GradeCompositionResponse[] = await this.compositionService.getListGradeCompositions(classId);
        
        if(!gradeCompositions){
            throw new BadRequestException();
        }

        const response : ResponseTemplate<GradeCompositionResponse[]> = {
            data: gradeCompositions,
            message: 'success',
            statusCode: HttpStatus.OK

        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId/management/grade/:gradeCompositionId')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(GradeCompositionResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            $ref: getSchemaPath(GradeCompositionResponse)
        }
    })
    async getGradeComposition(
        @Param('classId') classId: string,
        @Param('gradeCompositionId') gradeCompositionId: string
    )
        : Promise<ResponseTemplate<GradeCompositionResponse>>
    {
        try {
            const gradeComposition : GradeCompositionResponse 
            = await this.compositionService.getGradeComposition(classId,gradeCompositionId);

            if (gradeComposition){
                const response : ResponseTemplate<GradeCompositionResponse> = {
                    data: gradeComposition,
                    message: 'Success',
                    statusCode: HttpStatus.OK
                }
                return response;
            }
            else {
                throw new BadRequestException()
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/:classId/management/grade/:gradeId')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(IsSucccessResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            $ref: getSchemaPath(IsSucccessResponse)
        }        
    })
    async updateGradeComposition(
        @Param('classId') classId: string,
        @Param('gradeId') gradeId: string,
        @Body() gradeCompositionDto: GradeCompositionDto
    )
        : Promise<ResponseTemplate<IsSucccessResponse>>
    {
        try {
            const isSuccess : Boolean= 
                await this.compositionService.updateGradeComposition(
                    classId,
                    gradeId,
                    gradeCompositionDto.name,
                    gradeCompositionDto.scale
                )
            if(!isSuccess){
                throw new BadRequestException();
            }

            const response : ResponseTemplate<IsSucccessResponse> = {
                data: {isSuccess},
                message: 'Update grade composition successfully.',
                statusCode: HttpStatus.OK
            }

            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    @HttpCode(HttpStatus.OK)
    @Delete('/:classId/management/grade/:gradeId')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(IsSucccessResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            $ref: getSchemaPath(IsSucccessResponse)
        }
    })
    async deleteGradeComposition(
        @Param('gradeId') gradeId: string,
        @Param('classId') classId: string,
    )
        : Promise<ResponseTemplate<IsSucccessResponse>>
    {
        try {
            const isSuccess : Boolean = await this.compositionService.deleteGradeComposition(classId,gradeId);
            
            if(!isSuccess) {
                throw new BadRequestException();
            }

            const response : ResponseTemplate<IsSucccessResponse> = {
                data: {isSuccess},
                message: 'Grade composition deleted successfully',
                statusCode: HttpStatus.OK
            }
            return response;
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException(error);
        }
    } 

    @HttpCode(HttpStatus.OK)
    @Post('/:classId/management/positions')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(IsSucccessResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            $ref: getSchemaPath(IsSucccessResponse)
        }
    })
    async updatePositions(
        @Param('classId') classId: string,
        @Body() updateComposition: UpdatePositionDto
    )
        : Promise<ResponseTemplate<IsSucccessResponse>>
    {
        try {
            
            const isSuccess : Boolean = 
                    await this.compositionService.updatePostitionOfCompositions(classId, updateComposition.listCompositions);
            
            if(isSuccess){
                const response : ResponseTemplate<IsSucccessResponse> = {
                    data: {
                        isSuccess: isSuccess,
                    },
                    message: "Success",
                    statusCode: 200,
                }
                return response;
            }
            throw new BadRequestException();
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException(error);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('/:classId/management/grade/:gradeId/set-final')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(IsSucccessResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(IsSucccessResponse)
        }
    })
    async setFinalComposition(
        @Param('classId') classId: string,
        @Param('gradeId') gradeId: string
    )
        : Promise<ResponseTemplate<IsSucccessResponse>>
    {
        try {
            const isSuccess = await this.compositionService.setFinal(classId,gradeId);

            if(!isSuccess){
                throw new BadRequestException();
            }

            const response : ResponseTemplate<IsSucccessResponse> = {
                data: {isSuccess},
                message: 'Success',
                statusCode: HttpStatus.OK
            }

            return response;
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException(error);
        }
    }


    @HttpCode(HttpStatus.OK)
    @Get('/:classId/management/default-file/list-students')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiOperation({ summary: 'Download File' })
    async geDefaultStudentListExcelFile(
        @Res({passthrough : true}) res : Response 
    ){
        const buffer = await this.fileService.findOrCreateFile("list-students", "sheet 1", ["StudendId", "Full name"]);;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', `attachment; filename=student-list.xlsx`);
        return res.send(buffer);
    }

    
    @HttpCode(HttpStatus.OK)
    @Post('/:classId/management/list-students')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(IsSucccessResponse)
    @ApiOperation({summary: 'Upload a file'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            $ref: getSchemaPath(IsSucccessResponse)
        }
    })
    async uploadStudentsListAndMapStudentIds(
        @UploadedFile() file: Express.Multer.File,
        @Body() studentListDto : UploadStudentListDto,
        @Req() req 
    ){
        const fileBuffer : Buffer = file.buffer;
        
        const isStored = await this.fileService.storeChunkFile(
                            fileBuffer,
                            parseInt(studentListDto.chunkIndex),
                            req.userClassId,
                            file.originalname,
                            `${req.user.id}:${studentListDto.random}`
                        )
        const response : ResponseTemplate<IsSucccessResponse> = {
            data: {
                isSuccess: isStored
            },
            message: isStored? "Success" : "Failed",
            statusCode: 200
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/:classId/management/list-students/completed')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    async completedUploadingFile(
        @Param('classId') classId: string,
        @Req() req,
        @Body() completeUploadDto: CompleteUploadDto
    )
        : Promise<ResponseTemplate<null>>
    {
        const random = `${req.user.id}:${completeUploadDto.random}`;
        
        this.fileService.mergeChunksToFinalFile(random, classId);
        
        const response : ResponseTemplate<null> = {
            data: null,
            message: "Success",
            statusCode: HttpStatus.OK
        }
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:classId/management/grade-board')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    @ApiExtraModels(GradeBoardResponse)
    @ApiResponse({
        status: HttpStatus.OK,
        schema:{
            type: 'array',
            items: {
                $ref: getSchemaPath(GradeBoardResponse)
            }
        }
    })
    async getGradeBoard(
        @Req() req,
        @Param('classId') classId: string,
        @Query() query
    )
        : Promise<ResponseTemplate<Object>> 
    {
        const studentId = query?.student_id || null;
        const gradeId = query?.grade_id || null;
        
        let data = null;

        // case: get a grade of a student
        // this case is not supported
        if(studentId && gradeId) {
            throw new BadRequestException();
        }
        // case: get list of students for a grade
        else if (!studentId && gradeId ){
            data = await this.compositionService.getStudentsbyGradeId(classId, gradeId)
        }
        // case: get list of grades for a student
        else if (studentId && !gradeId) {
            data = await this.compositionService.getGradesByStudentId(classId, studentId, true);
        }
        // case: get all board
        // Priority is given based on grade
        else{
            data = await this.compositionService.getGradeBoard(classId);   
        }
        const response : ResponseTemplate<Object> = {
            data: data,
            message: "Success",
            statusCode: HttpStatus.OK
        }
        return response;
    }


    @HttpCode(HttpStatus.OK)
    @Patch('/:classId/management/grade-board')
    @Role(RoleType.USER)
    @ClassRole([ClassRoleType.TEACHER])
    async updateGradeBoardOne(
        @Req() req,
        @Param('classId') classId : string,
        @Body() updateOne : UpdateOneBoardDto
    )
        : Promise<ResponseTemplate<null>>
    {
        await this.compositionService.updateBoardOne(updateOne, classId);    
        const response : ResponseTemplate<null>= {
            data: null,
            message: "Updated",
            statusCode: HttpStatus.OK
        }
        return response;    
    }
    
}
