import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { GradeComposition } from './entities/grade-composition.entity';
import { GradeCompositionDto } from './dto/grade-composition.dto';
import { convertCamelToSnake, convertSnakeToCamel, correctStringFormat } from 'src/lib/util/func';
import sequelize from 'sequelize';
import { GradeCompositionResponse } from './response/grade-composition.response';
import { UpdateOneBoardDto } from './dto/update-one-board.dto';
import { NotificationService } from '../notification/notification.service';
import { SOCKET_MSG, SOCKET_TYPE } from 'src/utils';


@Injectable()
export class CompositionService {
    constructor(
        @Inject('GradeCompositionRepository')
        private readonly gradeModel: typeof GradeComposition,
        private readonly notificationService: NotificationService
    )
    {}


    async getStudentId(userId, classId){
        try {
            const studentId : any[]= await this.gradeModel.sequelize.query(
                `
                SELECT student_id
                FROM user_classes
                WHERE class_id =:classId AND user_id =:userId;
                `,
                {
                    replacements:{
                        userId,
                        classId
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            return studentId[0].student_id;
            
        } catch (error) {
            return null;
        }
    }

    async checkIsExistName( classId: string, name: string )
        : Promise<Boolean>
    {
        try {
            const isExist = await this.gradeModel.sequelize.query(
                `
                    SELECT * 
                    FROM grade_compositions
                    WHERE class_id = :classId AND name = :name;
                `,
                {
                    replacements: {classId, name},
                    type: sequelize.QueryTypes.SELECT
                }
            )
            if(isExist.length >0){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async getLastPositionComposition(classId: string){
        try {
            const lastPosition : any= await this.gradeModel.sequelize.query(
                `
                    SELECT MAX(position) AS last
                    FROM grade_compositions
                    WHERE class_id = :classId 
                `,
                {
                    replacements: {classId},
                    type: sequelize.QueryTypes.SELECT
                }
            )

            return lastPosition[0].last;
        } catch (error) {
            return null;    
        }
    }

    async createNewGradeComposition(
        gradeCompositionDto: GradeCompositionDto,
        classId: string,
    )
        : Promise<GradeCompositionResponse>
    {
        let position = 0;

        gradeCompositionDto.name = correctStringFormat(gradeCompositionDto.name);

        const isExist = await this.checkIsExistName(classId, gradeCompositionDto.name);
        if(isExist){
            throw new BadRequestException();
        }

        const lastPosition = await this.getLastPositionComposition(classId);
        if(lastPosition !== null){
            position = lastPosition +1;
        }

        const convertedData = convertCamelToSnake({
            ...gradeCompositionDto,
            classId,
            position
        });

        const newGradeComposition = await this.gradeModel.create(convertedData);
        
        await this.notificationService.createNotifycationForAllStudentInClass({
            classId: classId,
            content: SOCKET_MSG.CREATE_NEW_GRADE_COMPOSITION,
            type: SOCKET_TYPE.CREATE_NEW_GRADE_COMPOSITION,
            contentUrl: 'http://createnew.com'
        })

        const gradeCompositionReponse : GradeCompositionResponse = {
            classId: classId,
            name: newGradeComposition.name,
            isFinal: newGradeComposition.is_final,
            scale: newGradeComposition.scale,
            id: newGradeComposition.id
        }
        return gradeCompositionReponse;
    }

    async getGradeComposition(
        classId: string,
        gradeId: string
    ){
        try {
            const gradeComposition : any = (await this.gradeModel.sequelize.query(
                `
                SELECT name, class_id, scale, is_final, id
                FROM grade_compositions
                WHERE class_id = :classId AND id = :gradeId;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                    replacements: {classId, gradeId}
                }
            ))[0]

            const gradeCompositionReponse : GradeCompositionResponse = {
                classId: classId,
                name: gradeComposition.name,
                isFinal: gradeComposition.is_final,
                scale: gradeComposition.scale,
                id: gradeComposition.id
            }
            return gradeCompositionReponse;            
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async getListGradeCompositions(
        classId: string,
    )
    {
        try {
            const gradeCompositions = await this.gradeModel.sequelize.query(
                `
                    SELECT name, position, class_id, scale, is_final, id
                    FROM grade_compositions
                    WHERE class_id = :classId
                    ORDER BY position ASC;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                    replacements: {classId}
                }
            )
            const grades : GradeCompositionResponse[] = gradeCompositions.map((grade : any)=>{
                const gradeCompositionReponse : GradeCompositionResponse = {
                    classId: classId,
                    name: grade.name,
                    isFinal: grade.is_final,
                    scale: grade.scale,
                    id: grade.id,
                }  
                return gradeCompositionReponse;
            })
            return grades;
        } catch (error) {
            console.log(error);
            return null;
        }   
    }

    async updateGradeComposition(
        classId: string,
        gradeId : string,
        name: string,
        scale: number,
    )
        : Promise<Boolean>
    {
        try {
            const listUpdated  = await this.gradeModel.sequelize.query(
                `
                WITH updated_grade AS (
                    UPDATE grade_compositions
                    SET name = :name, scale = :scale
                    WHERE id = :gradeId AND class_id = :classId
                    RETURNING *
                )
                SELECT * FROM updated_grade;
                `,
                {
                    type: sequelize.QueryTypes.UPDATE,
                    replacements : {
                        classId,
                        gradeId,
                        name,
                        scale
                    }
                }
            )

            if(listUpdated.length > 0) {
                return true;
            }
            return false;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteGradeComposition(
        classId: string,
        gradeId: string,
    )
        : Promise<Boolean>
    {
        try {
            const amountDeleted :number = await this.gradeModel.destroy(
                {
                    where: {
                        class_id: classId,
                        id: gradeId
                    }
                }
            )
            if(amountDeleted === 0){
                return false;
            }
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    async updatePostitionOfCompositions(
        classId: string,
        listCompositions :string[],
    )
        : Promise<Boolean>
    {
        try {
            const listCurrent : any= await this.gradeModel.sequelize.query(
                `
                SELECT name, position, class_id, scale, is_final, id
                FROM grade_compositions
                WHERE class_id = :classId
                ORDER BY position ASC;
                `,
                {
                    type: sequelize.QueryTypes.SELECT,
                    replacements: {
                        classId
                    }
                }
            )
            Logger.log(listCompositions, listCurrent)
            if(listCompositions.length !== listCurrent.length){
                throw new BadRequestException();
            }

            for(let i=0; i < listCompositions.length; i++){
                if(listCompositions[i] !== listCurrent[i].id) {
                    this.gradeModel.sequelize.query(
                        `UPDATE grade_compositions
                        SET position = :position
                        WHERE id = :gradeId AND class_id = :classId`,
                        {
                            type: sequelize.QueryTypes.UPDATE,
                            replacements: {
                                classId,
                                position: i,
                                gradeId: listCompositions[i]
                            }
                        }    
                    )
                }
            }
            
            return true;

            
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    async setFinal(
        classId: string,
        gradeId: string,
    )
        : Promise<Boolean>
    {
        try {
            const isFinal = true;
            const updated : number[]= await this.gradeModel.sequelize.query(
                `
                UPDATE grade_compositions
                SET is_final = :isFinal
                WHERE class_id = :classId AND id = :gradeId;
                `,
                {
                    replacements:{
                        isFinal,
                        classId,
                        gradeId
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            );
            
            if(updated.length === 0){
                return false;
            }
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }


    // if isTeacher === true: return all list
    // else  return grades set final
    async getGradesByStudentId(
        classId: string,
        studentId: string,
        isTeacher: boolean  = false
    ){
        const listGrades = await this.gradeModel.sequelize.query(
            `
            SELECT *
            FROM student_compositions as sc
            JOIN student_ids as si ON si.student_id = sc.student_id
            JOIN grade_compositions as gc ON gc.id = sc.grade_id
                AND
                CASE 
                    WHEN :isTeacher = false THEN is_final = true
                    ELSE true
                END 
            WHERE sc.class_id = :classId AND sc.student_id= :studentId;
            `,
            {
                replacements:{
                    classId,
                    studentId,
                    isTeacher
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
        return convertSnakeToCamel(listGrades);
    }


    // get all grade of students by grade_composition
    async getStudentsbyGradeId(
        classId: string,
        gradeId: string
    ){
        const listStudents = await this.gradeModel.sequelize.query(
            `
            SELECT *
            FROM student_compositions as sc
            JOIN student_ids as si ON si.student_id = sc.student_id
            JOIN grade_compositions as gc ON gc.id = sc.grade_id
            WHERE sc.class_id = :classId AND sc.grade_id= :gradeId;
            `,
            {
                replacements:{
                    classId,
                    gradeId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
        return convertSnakeToCamel(listStudents);  
    }

    // get all students and grades in grade board
    async getGradeBoard(
        classId: string
    ){
        const countStudents : any = await this.gradeModel.sequelize.query(
            `
            SELECT COUNT(1)
            FROM student_ids;
            `,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
      
        const gradeBoard = await this.gradeModel.sequelize.query(
            `
            SELECT *
            FROM student_compositions as sc
            JOIN student_ids as si ON si.student_id = sc.student_id
            JOIN grade_compositions as gc ON gc.id = sc.grade_id
            WHERE sc.class_id = :classId;
            `,
            {
                replacements:{
                    classId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
        return {
            list: convertSnakeToCamel(gradeBoard),
            countStudents: parseInt(countStudents[0]?.count) || 0
        }; 
    }

    async updateBoardOne(
        updateOne: UpdateOneBoardDto,
        classId: string,
    ){
        try {
            // update studentId list
            if(updateOne?.newFullName || updateOne?.studentId){
                this.gradeModel.sequelize.query(
                    `
                    UPDATE student_ids
                    SET 
                        student_id = COALESCE(:newStudentId, student_id),
                        full_name = COALESCE(:newFullName, full_name)
                    WHERE student_id = :studentId AND class_id = :classId; 
                    `,
                    {
                        replacements:{
                            newStudentId: updateOne?.newStudentId,
                            newFullName: updateOne?.newFullName,
                            studentId: updateOne.studentId,
                            classId
                        },
                        type: sequelize.QueryTypes.UPDATE
                    }
                )
            }

            // update scale
            if(updateOne?.scale) {
                this.gradeModel.sequelize.query(
                    `
                    UPDATE student_compositions
                    SET 
                        scale = :scale
                    WHERE
                        student_id = :studentId
                        AND class_id = :classId
                        AND grade_id = :gradeId;
                    `,
                    {
                        replacements: {
                            scale: updateOne?.scale,
                            studentId: updateOne?.studentId,
                            classId: classId,
                            gradeId: updateOne?.gradeId
                        },
                        type: sequelize.QueryTypes.UPDATE
                    }
                )
            }   
        } catch (error) {
            throw new BadRequestException(error);            
        }
        
    }
}
