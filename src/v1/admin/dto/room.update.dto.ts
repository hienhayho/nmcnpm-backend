import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateRoomDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
    })
    roomId: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
    })
    roomNumber: number;

    @IsNumber()
    @ApiProperty({
        type: Number,
    })
    roomTypeId: number;
}
