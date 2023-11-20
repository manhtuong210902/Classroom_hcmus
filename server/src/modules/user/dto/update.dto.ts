import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID('all', { message: 'Invalid uuid' })
    @ApiProperty()
    readonly userId: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly fullname: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly gender: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly email: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly address: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly imgUrl: string;
}
