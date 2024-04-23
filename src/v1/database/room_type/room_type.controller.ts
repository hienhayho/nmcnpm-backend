import { Controller, Get, Post, HttpStatus, Body, Query, Param, Patch, UseGuards } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddNewRoomTypeDto } from './dto/roomType.addNewRoomType.dto';
import { AuthGuard } from '@/middleware/authenticate';

@Controller('v1/room-type')
@ApiTags("room_type")
@UseGuards(new AuthGuard())
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) { }
  @ApiOperation({summary: "Get all room type."})
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
  
  @ApiOperation({summary: "Add new room type."})
  @Post()
  async createRoomType(@Body() roomTypeInput: AddNewRoomTypeDto) {
    try {
      const result = await this.roomTypeService.createRoomType(roomTypeInput)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "create room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts createRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  } 
}
