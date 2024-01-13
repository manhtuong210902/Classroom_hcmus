import { ApiProperty } from "@nestjs/swagger";

export class IsSucccessResponse {
    @ApiProperty()
    isSuccess: Boolean
}