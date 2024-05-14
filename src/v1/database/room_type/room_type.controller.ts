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
  @Post('room_type/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
          destination: getImagesFolder()
      })
  }))
  async uploadRoomTypeImage(@Body() data: RoomTypeImageDto, @UploadedFile() file: Express.Multer.File) {
      try {
          const {roomTypeId} = data
          const result = await this.roomTypeService.uploadRoomTypeImage(file.filename,roomTypeId)
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

  @Post('room_type_image/:id')
  async getRoomTypeImage(
      @Res({ passthrough: true }) res: Response,
      @Param("id") id: string
  ): Promise<StreamableFile> {
      try {
          const roomTypeId = parseInt(id)
          const imageId = await this.roomTypeService.getRoomTypeImage(roomTypeId)
          res.set({ 'Content-Type': 'image/jpg' });
          const imageLocation = getImagesById(imageId)
          const file = createReadStream(imageLocation);
          return new StreamableFile(file);
      } catch (err) {
          console.error("room_type.controller.ts getRoomTypeImage: ", err)
      }
  }
}
