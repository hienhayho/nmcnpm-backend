import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RoomTypeAddNewDto {
    @IsString()
    @ApiProperty({
        type: String
    })
    name: string;

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    capacity: number;

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    priceBase: number
}