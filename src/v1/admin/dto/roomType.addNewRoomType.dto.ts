import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, arrayMinSize, IsArray, IsNumber, IsString } from "class-validator";

export class AddNewRoomTypeDto {
    @IsString()
    @ApiProperty({
        type: String
    })
    name: string

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    capacity: number

    @IsString()
    @ApiProperty({
        type: String
    })
    desc: string

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    priceBase: number

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ApiProperty({
        type: Array<String>
    })
    service_names: string[]
}

