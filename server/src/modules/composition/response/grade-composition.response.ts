import { ApiProperty } from "@nestjs/swagger";

export class GradeCompositionResponse {

    @ApiProperty()
    name: string;

    @ApiProperty()
    scale: number;

    @ApiProperty()
    isFinal: Boolean;

    @ApiProperty()
    classId: string;

    @ApiProperty()
    id: string;
}