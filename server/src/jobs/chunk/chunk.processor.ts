import { InjectQueue, OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import sequelize from 'sequelize';
import { Chunk } from 'src/modules/file/entities/chunk.entity';
import { File } from 'src/modules/file/entities/file.entity';
import * as ExcelJs from 'exceljs';
import { StudentId } from 'src/modules/composition/entities/student-id.entity';
import {Queue} from "bull";

@Processor('chunks')
export class CombineChunksProcessor {
    
    constructor(
        @Inject('FileRepository')
        private readonly fileModel: typeof File,
        
        @Inject('ChunkRepository')
        private readonly chunkModel: typeof Chunk,

        @Inject('StudentIdRepository') 
        private readonly studentIdModel: typeof StudentId,

        @InjectQueue('grades')
        private gradeQueue: Queue
    ){}

    @Process('list_students')
    async handleCombineChunks(job: Job) {
        const random : string = job.data.random;
        const classId = job.data.classId; 
        
        const listStudentId = await this.combineChunksAndRead(random);
        
        await this.storeStudentIds(listStudentId, classId);
    }


    private async storeStudentIds(listStudentId, classId){
        
        // delete all old data from this class
        await this.studentIdModel.sequelize.query(
            `
            DELETE
            FROM student_ids
            WHERE class_id=:classId;
            `,
            {
                replacements:{
                    classId
                },
                type: sequelize.QueryTypes.DELETE
            }
        )

        await this.studentIdModel.sequelize.query(
            `
            DELETE 
            FROM student_compositions
            WHERE class_id = :classId; 
            `,
            {
                replacements:{
                    classId
                },
                type: sequelize.QueryTypes.DELETE
            }   
        )
        const gradeName = listStudentId[0][1]

        // ignore the fist row that is a header row
        for(let i =1; i < listStudentId.length; i++){
            await this.studentIdModel.create({
                class_id: classId,
                student_id: listStudentId[i][0],
                full_name: listStudentId[i][1]
            })
        }

        this.gradeQueue.add('map-student',{
            classId, gradeName
        });
    }


    @Process('grades')
    async handleUpdateGrade(job: Job){
        const random : string = job.data.random;
        const classId = job.data.classId; 

        const listGrades = await this.combineChunksAndRead(random);
        await this.storeStudentGrade(listGrades, classId);

    }

    private async storeStudentGrade(
        listGrades: any[],
        classId : string
    ){
        for(let i=1; i<listGrades.length; i++){
            const studentId = listGrades[i][0];
            const grade = listGrades[i][1];
            await this.studentIdModel.sequelize.query(
                `
                UPDATE student_compositions
                SET
                    grade = :grade
                WHERE class_id = :classId AND student_id = :studentId;
                `,
                {
                    replacements:{
                        classId,
                        grade,
                        studentId
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            )
        }
    }


    private async combineChunksAndRead(random){
        const chunks : any[] = await this.chunkModel.sequelize.query(
            `
            SELECT *
            FROM chunks
            WHERE random_string = :random
            ORDER BY chunk_index ASC;
            `,
            {
                replacements:{
                    random
                },
                type: sequelize.QueryTypes.SELECT
            }
        )   
        const listBuffer = chunks.map(chunk=>chunk.buffer);

        const buffer : Buffer = Buffer.concat([...listBuffer]);
        
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.load(buffer);
    
        const worksheet = workbook.worksheets[0];
        const data = [];
    
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          const rowData = [];
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData[colNumber - 1] = cell.value;
          });
          data.push(rowData);
        });
    
        return data;
   
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
          `Failure job ${job.id} of type ${job.name} with data ${job.data}...`,   
        );
    }
}