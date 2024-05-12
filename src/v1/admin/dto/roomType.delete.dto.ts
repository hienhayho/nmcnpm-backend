import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteRoomTypeDto {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    roomTypeId: number
}
