import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserUpdate {
    @IsNumber()
    id?: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    userName: string;

    @IsString()
    @ApiProperty({
        type: String
    })
    fullName: string

    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string;

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

    @IsNumber()
    @ApiProperty({
        type: Number,
    })
    salary: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    city: string;

    @IsString()
    @ApiProperty({
        type: String
    })
    country: string;
}