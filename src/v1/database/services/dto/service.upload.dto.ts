import { ApiProperty } from "@nestjs/swagger";

export class UploadDto {
    @ApiProperty({type:"string",format:"binary",required:true})
    file: Express.Multer.File
}

