import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPassportNumber, IsString, IsStrongPassword, Max, Min } from "class-validator";


export class UserLogin {
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
}