import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class UpdateServiceDto {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    serviceId: number

    @IsString()
    @ApiProperty({
        type: String
    })
    name: string

    @IsNumber()
    @Min(0)
    @ApiProperty({
        type: Number
    })
    price: number
}