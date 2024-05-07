import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Max, Min } from "class-validator";

export class UserRegister {
    @IsString()
    @ApiProperty({
        type: String
    })
    userName: string;

    @IsString()
    @ApiProperty({
        type: String,
        minLength: 8,
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
}