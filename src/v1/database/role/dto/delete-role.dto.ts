import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteRoleDto {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    id: number;
}
