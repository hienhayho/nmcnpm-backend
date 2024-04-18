import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    id: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    name: string;
}
