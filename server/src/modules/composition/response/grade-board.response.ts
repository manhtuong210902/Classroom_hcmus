import { ApiProperty } from "@nestjs/swagger";

export class GradeBoardResponse {
    @ApiProperty()
    studentId: string;

    @ApiProperty()
    gradeId: string;

    @ApiProperty()
    scale: number;

    @ApiProperty()
    id: string;

    @ApiProperty()
    grade: number | null;

    @ApiProperty()
    classId: string;

    @ApiProperty()
    createdAt: any;
    
    @ApiProperty()
    updatedAt: any;

    @ApiProperty()
    deletedAt: any;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    name: string;
    
    @ApiProperty()    
    position: number;

    @ApiProperty()
    isFinal: true
}