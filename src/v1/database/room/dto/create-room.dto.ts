import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
    @ApiProperty({
        type: Number
    })
    roomNumber: number;

    @ApiProperty({
        type: Number
    })
    roomTypeId: number;
}
