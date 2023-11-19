import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsNotEmpty()
    @IsUUID("all",{"message":"Invalid uuid"})
    readonly userId: string;

    @IsOptional()
    @IsString()
    readonly fullname: string;

    @IsOptional()
    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly gender: string;    

    @IsOptional()
    @IsString()
    readonly address: string;
     
}

