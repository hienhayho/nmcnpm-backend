import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNumber, IsString, Max, Min } from "class-validator";

export class UserRegister {
    @IsString()
    @ApiProperty({
        type: String
    })
    userName: string;

    @IsString()
    @Min(8)
    @ApiProperty({
        type: String
    })
    password: string;

    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string;

    @IsString()
    @ApiProperty({
        type: String
    })
    fullName: string;

    @IsString()
    @ApiProperty({
        type: String
    })
    phone: string;

    @IsNumber()
    @Min(1)
    @Max(3)
    @ApiProperty({
        type: Number
    })
    gender: number;

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    salary: number;

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    field: number;

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

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    roleId: number;

    @IsDate()
    @ApiProperty({
        type: Date
    })
    createdAt: Date;

    @IsDate()
    @ApiProperty({
        type: Date
    })
    updatedAt: Date;
}