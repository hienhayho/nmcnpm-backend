import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class UpdateRoomTypeDto {
    @IsString()
    @ApiProperty({
        type: String,
    })
    name: string;

    @IsString()
    @ApiProperty({
        type: String,
    })
    newName: string;

    @IsInt()
    @ApiProperty({
        type: Number,
    })
    capacity: number

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    priceBase: number
}