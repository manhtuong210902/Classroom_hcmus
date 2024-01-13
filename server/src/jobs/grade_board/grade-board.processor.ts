import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import sequelize from 'sequelize';
import { StudentId } from 'src/modules/composition/entities/student-id.entity';
import { StudentComposition } from 'src/modules/composition/entities/student-composition.entity';
import { GradeComposition } from 'src/modules/composition/entities/grade-composition.entity';

@Processor('grades')
export class GradeProcessor {
    
    constructor(
        @Inject('StudentIdRepository') 
        private readonly studentIdModel: typeof StudentId,

        @Inject('GradeCompositionRepository')
        private readonly gradeModel: typeof GradeComposition,

        @Inject('StudentCompositionsRepository')
        private readonly studentComModel: typeof StudentComposition
    ){}

    @Process('map-student')
    async mapStudentId(job: Job) {
        const classId = job.data.classId;

        const listStudentIds : any[] = await this.studentIdModel.sequelize.query(
            `
            SELECT *
            FROM student_ids
            WHERE class_id = :classId;
            `,
            {
                replacements:{
                    classId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
        const listGrades :any[] = await this.gradeModel.sequelize.query(
            `
            SELECT *
            FROM grade_compositions
            WHERE class_id = :classId;
            `,
            {
                replacements:{
                    classId
                },
                type: sequelize.QueryTypes.SELECT
            }
        )
        
        for(let i=0 ; i < listStudentIds.length; i++){
            for(let j =0 ; j < listGrades.length ; j++){

                await this.studentComModel.create({
                    student_id: listStudentIds[i].student_id,
                    grade: null,
                    grade_id: listGrades[j].id,
                    class_id: classId
                })
            }
        }

    }

    @Process('add-student')
    async handleAddStudent(job: Job){

    }

    @Process('add-composition')
    async handleAddComposition(job: Job){

    }


    @OnQueueActive()
    onActive(job: Job) {
        Logger.log(
          `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        Logger.log(
            `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnQueueFailed()
    onFailed(job: Job, err: Error) {
        Logger.error(
          `Failure job ${job.id} of type ${job.name} with data ${job.data}...
           Message: ${err.message};
          `,   
        );
    }

}