import { ApiProperty } from "@nestjs/swagger";

export class CreateClassResponse {
    @ApiProperty()
    id : string;
    
    @ApiProperty()
    name : string;

    @ApiProperty()
    title : string;

    @ApiProperty()
    owner:  string;
}