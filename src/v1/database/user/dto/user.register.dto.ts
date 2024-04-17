import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { Role } from "../../role/entities/role.entity";


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

    @IsString()
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

    @ApiProperty({
        type: Role
    })
    role: Role;
}