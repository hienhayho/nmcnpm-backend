import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddNewServiceDto {
    @IsString()
    @ApiProperty({
        type: String
    })
    name: string

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    price: number
}

