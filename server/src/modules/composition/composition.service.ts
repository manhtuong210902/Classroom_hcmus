import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { GradeComposition } from './entities/grade-composition.entity';
import { GradeCompositionDto } from './dto/grade-composition.dto';
import { convertCamelToSnake, correctStringFormat } from 'src/lib/util/func';
import sequelize from 'sequelize';
import { GradeCompositionResponse } from './response/grade-composition.response';


@Injectable()
export class CompositionService {
    constructor(
        @Inject('GradeCompositionRepository')
        private readonly gradeModel: typeof GradeComposition,
    )
    {}

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
            console.log(updated)
            if(updated.length === 0){
                return false;
            }
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

}
