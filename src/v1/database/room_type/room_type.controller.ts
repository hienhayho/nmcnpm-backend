import { Controller, Get, Post, HttpStatus, Body, Param, UseGuards, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { AuthGuard } from '@/middleware/authenticate';
import { getImagesById, getImagesFolder } from '@/utils';
import { RoomTypeService } from './room_type.service';
import { RoomTypeImageDto } from './dto/room_type.upload.image.dto';
import { v4 as uuidv4 } from "uuid"
const path = require('path')

@Controller('v1/room_type')
@ApiTags("room_type")
@UseGuards(new AuthGuard())
export class RoomTypeController {
  constructor(
    private readonly roomTypeService: RoomTypeService
  ) { }

  @ApiOperation({ summary: "Get all room type." })
  @Get()
  async getAllRoomType() {
    try {
      const result = await this.roomTypeService.getAllRoomType()
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts getAllRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get room type with its services." })
  @Post("get_room_type/:id")
  async getRoomTypeWithItsServices(@Param("id") id: string) {
    const roomTypeId = parseInt(id)
    try {
      const result = await this.roomTypeService.getRoomTypeWithItsServices(roomTypeId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts getRoomTypeWithItsServices: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Upload image for room type" })
  @Post('room_type/upload/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: getImagesFolder(),
      filename: (req, file, cb) => {
        const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${fileName}${extension}`)
      }
    })
  }))
  async uploadRoomTypeImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const roomTypeId = parseInt(id)
      const result = await this.roomTypeService.uploadRoomTypeImage(file, roomTypeId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Upload room type image successfully",
      }
    } catch (err) {
      console.error("room_type.controller.ts uploadRoomTypeImage: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message
      }
    }
  }

  @Get('room_type_image/:id')
  async getRoomTypeImage(
    @Param("id") id: string
  ) {
    try {
      const roomTypeId = parseInt(id)
      const imagePath = await this.roomTypeService.getRoomTypeImage(roomTypeId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get room type image successfully",
        result: imagePath,
      }
    } catch (err) {
      console.error("room_type.controller.ts getRoomTypeImage: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message
      }
    }
  }
}
