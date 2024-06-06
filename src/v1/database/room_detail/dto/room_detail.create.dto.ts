import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, Max, Min } from "class-validator";

// class ServiceUsedDTO {
//     @ApiProperty({
//         type: Number
//     })
//     id: number;

//     @ApiProperty({
//         type: String
//     })
//     name: string;

//     @ApiProperty({
//         type: Number
//     })
//     price: number;

//     @ApiProperty({
//         type: Number
//     })
//     quantity: number;
// }

export class CreateRoomDetailDto {
    @ApiProperty({
        type: Number
    })
    roomId: number;

    @ApiProperty({
        type: Number
    })
    numUser: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: Date
    })
    checkIn: Date;

    // @IsDateString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     type: Date
    // })
    // checkOut: Date;

    // @ApiProperty({ type: [ServiceUsedDTO] })
    // services_used: ServiceUsedDTO[];
}
