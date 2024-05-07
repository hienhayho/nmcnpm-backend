import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UploadDto {
    @ApiProperty({type:"string",format:"binary",required:true})
    file: Express.Multer.File
}

