import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DeleteServiceDto {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    serviceId: number
}