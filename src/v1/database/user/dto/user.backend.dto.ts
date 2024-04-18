import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserBackendDto {
    @IsString()
    @ApiProperty({
        type: String
    })
    userName: string;

    @IsString()
    @ApiProperty({
        type: String,
        minLength: 8
    })
    password: string;

    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string

    @IsString()
    @ApiProperty({
        type: String
    })
    phone: string;

    @IsNumber()
    @ApiProperty({
        type: Number,
        minimum: 1,
        maximum: 3
    })
    gender: number;

    @IsEmail()
    @ApiProperty({
        type: Number,
        default: -1,
    })
    salary: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    city: string

    @IsString()
    @ApiProperty({
        type: String
    })
    country: string

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    roleId: number
}