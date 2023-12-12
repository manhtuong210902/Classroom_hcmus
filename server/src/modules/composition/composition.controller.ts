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
    Post
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
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

@Controller('composition')
@ApiTags('composition')
export class CompositionController {
    constructor(
        private readonly compositionService: CompositionService
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
    @Patch('/:classId/management/position')
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
            return
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

    

}
