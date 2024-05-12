import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional} from "class-validator";

export class UpdateRoomDto {
    @IsNumber()
    @IsOptional()
    roomId: number

    @IsNumber()
    @ApiProperty({
        type: Number
    })
    roomNumber: number

    @IsNumber()
    @IsOptional()
    roomTypeId?: number
}
