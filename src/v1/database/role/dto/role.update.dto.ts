import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateRole {
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    id: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    name: string;
}
