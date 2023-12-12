import { ApiProperty } from "@nestjs/swagger";

export class UpdatePositionDto{

    @ApiProperty()
    listCompositions: string[]
}