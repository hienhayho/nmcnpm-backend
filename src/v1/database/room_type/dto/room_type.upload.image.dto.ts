import { ApiProperty } from "@nestjs/swagger";

export class RoomTypeImageDto {
    @ApiProperty()
    roomTypeId: number 

    @ApiProperty({type:"string",format:"binary",required:true})
    file: Express.Multer.File
}
