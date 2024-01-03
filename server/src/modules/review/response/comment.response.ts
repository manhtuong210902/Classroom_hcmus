import { ApiProperty } from "@nestjs/swagger";

export class CommentResponse {
    @ApiProperty()
    id : string;
}