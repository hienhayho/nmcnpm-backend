import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddNewServiceDto } from './dto/service.addNewService.dto';
import { AuthGuard } from '@/middleware/authenticate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadDto } from './dto/service.upload.dto';
import {Response} from 'express'
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('v1/services')
@ApiTags("services")
@UseGuards(new AuthGuard())
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @ApiOperation({ summary: "Get all services from database." })
  @Get()
  async getAllServices() {
    try {
      const result = await this.servicesService.getAllServires()
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all services successfully.",
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

  @ApiOperation({ summary: "Get service in a list of names." })
  @Post("get-services-by-name")
  async getServiceByNames(@Body() serviceNames: string[]) {
    try {
      const result = await this.servicesService.getServiceByNames(serviceNames)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all services successfully.",
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

  @ApiOperation({ summary: "Create a new service." })
  @Post()
  async addNewService(@Body() serviceData: AddNewServiceDto) {
    try {
      const result = await this.servicesService.addNewService(serviceData)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Create new service successfully.",
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

  // @Post('upload')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file',{
  //   storage: diskStorage({
  //     destination: join(process.cwd(), process.env.IMG_DEST)
  //   })
  // }))
  // uploadFile(@Body() data:UploadDto,@UploadedFile() file: Express.Multer.File) {
  //   return file
  // }

  // @Get('/:id')
  //   getUserProfilePhoto(
  //       @Res({ passthrough: true }) res: Response
  //   ): StreamableFile {

  //       res.set({'Content-Type': 'image/jpg'});

  //       const imageLocation = join(process.cwd(), process.env.IMG_DEST, '2b937a67eaac1484b5e036d3e08012f1');
  //       const file = createReadStream(imageLocation);
  //       return new StreamableFile(file);
  //   }
}
