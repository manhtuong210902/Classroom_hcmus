import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class RequestTokenDto{
    @IsString()
    @IsNotEmpty()
    readonly refreshToken: string;    

    @IsUUID("all",{"message":"Invalid uuid"})
    readonly userId: string;
}