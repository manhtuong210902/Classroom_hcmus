import { Inject, Injectable, Logger } from '@nestjs/common';
import * as ExcelJs from 'ExcelJs';
import * as fs from 'fs'; 
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { File } from './entities/file.entity';
import { Chunk } from './entities/chunk.entity';



@Injectable()
export class FileService {
    constructor(
        @Inject('FileRepository')
        private readonly fileModel: typeof File,
        
        @Inject('ChunkRepository')
        private readonly chunkModel: typeof Chunk,

        @InjectQueue('chunks') 
        private chunksQueue: Queue
    ){

    }

    private async createFile(
        fileName: string,
        sheetName: string,
        columns: string[]
    ){
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet(sheetName); 
        const headerRow = worksheet.addRow(columns);
        headerRow.font = { bold: true };
        
        const buffer = await workbook.xlsx.writeBuffer();
        
        const uint8Array = new Uint8Array(buffer);
        
        fs.writeFileSync(`./uploads/files/${fileName}.xlsx`, uint8Array);

    }    
    
    async findOrCreateFile(fileName: string, sheetName : string, columns: string[]): Promise<Buffer> {
    
        const filePath = `./uploads/files/${fileName}.xlsx`;
        
        let fileContent;

        try {
            fileContent =  fs.readFileSync(filePath);
        } catch (error) {
            
        }
        
        if (!fileContent) {
    
            this.createFile(fileName, sheetName, columns);
            fileContent =  fs.readFileSync(filePath);
            
            return fileContent;
        }
    
        return fileContent;
    }

    async storeChunkFile(
        buffer : Buffer, 
        chunkIndex: number, 
        uploader: string,
        fileName: string,
        random: string
    )
        :Promise<Boolean>
    {
        try {
            const uint8Array = new Uint8Array(buffer);
        
            fs.writeFileSync(`./uploads/files/test1.xlsx`, uint8Array);
            const result = await this.chunkModel.create({
                buffer: buffer,
                chunk_index: chunkIndex,
                uploader: uploader,
                file_name: fileName,
                random_string: random
            })
            if (result){
                return true;
            }
            return false;
        } catch (error) {
            Logger.error(error)
            return false;
        }
    }

    async mergeChunksToFinalFile(
        random: string,
        classId: string,
    )
        : Promise<any>
    {
        this.chunksQueue.add('combine',{
            random: random,
            classId: classId
        })
    }

}
