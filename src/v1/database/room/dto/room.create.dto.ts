import { ApiProperty } from "@nestjs/swagger";
import { Max, Min } from "class-validator";

export class CreateRoomDto {
    @ApiProperty({
        type: Number
    })
    roomNumber: number;

    @ApiProperty({
        type: Number
    })
    roomTypeId: number;

    @ApiProperty({
        type: Number
    })

    @Min(0)
    @Max(1)
    @ApiProperty({
        type: Number
    })
    discount: number;
}
