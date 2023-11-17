import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsNotEmpty()
    readonly imgUrl: string;

    @IsString()
    @IsNotEmpty()
    readonly userId: string;
     
}