import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDateColumn } from "typeorm";

class ServiceUsedDTO {
    @ApiProperty({
        type: Number
    })
    id: Number;
  
    @ApiProperty({
        type: String
    })
    name: string;

    @ApiProperty({
        type: Number
    })
    price: string;

    @ApiProperty({
        type: Number
    })
    quantity: string;
  }

export class CreateRoomDetailDto {
    @ApiProperty({
        type: Number
    })
    roomId: number;

    @ApiProperty({
        type: Number
    })
    numUser: number

    @ApiProperty({
        type: Number
    })
    discount: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: Date
    })
    checkIn: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: Date
    })
    checkOut: Date;

    @ApiProperty({ type: [ServiceUsedDTO] })
    services_used: ServiceUsedDTO[];
}
