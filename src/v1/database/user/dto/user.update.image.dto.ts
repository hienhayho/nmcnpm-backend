import { ApiProperty } from "@nestjs/swagger";

export class UpdateImageDto {
    @ApiProperty({type:"string",format:"binary",required:true})
    file: Express.Multer.File
}
