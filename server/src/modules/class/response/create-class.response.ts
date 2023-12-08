import { ApiProperty } from "@nestjs/swagger";

export class CreateClassResponse {
    @ApiProperty()
    id : string;
    
    @ApiProperty()
    name : string;

    @ApiProperty()
    title : string;

    @ApiProperty()
    subject: string;

    @ApiProperty()
    description : string;

    @ApiProperty()
    owner:  string;
}