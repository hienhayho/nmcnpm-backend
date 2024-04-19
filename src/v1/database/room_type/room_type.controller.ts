import { Controller, Get, Post, HttpStatus, Body, Query, Param, Patch } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomTypeAddNewDto } from './dto/room_type.addNew.dto';
import { max } from 'moment-timezone';
import { UpdateRoomTypeDto } from './dto/room_type.updateRoomType.dto';

@Controller('v1/room-type')
@ApiTags("room_type")
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) { }

  @ApiOperation({ summary: "Get all room types." })
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
        message: err.response.message ?? err.message
      }
    }
  }

  @ApiOperation({ summary: "Get room type by name." })
  @Get("get-room-type-by-name/:name")
  async getRoomTypeByName(@Param("name") roomName: string) {
    try {
      const result = await this.roomTypeService.getRoomTypeByName(roomName);
      return {
        status: HttpStatus.OK,
        error: 0,
        message: `Get room type with name=${roomName} successfully.`,
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts getRoomTypeByName: ", err);
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? "Internal Server Error."
      }
    }
  }

  @ApiOperation({ summary: "Get room type between two capacity values." })
  @Get("get-room-type-by-capacity")
  async getRoomTypeFilteredByCapacity(@Query("minCapacity") minCapacity: string, @Query("maxCapacity") maxCapacity: string) {
    try {
      const minNumber = parseInt(minCapacity)
      const maxNumber = parseInt(maxCapacity)
      const result = await this.roomTypeService.getRoomTypeFilteredByCapacity(minNumber, maxNumber);
      return {
        status: HttpStatus.OK,
        error: 0,
        message: `Get all room type with capacity from ${minCapacity} to ${maxCapacity} successfully.`,
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts getRoomTypeFilteredByCapacity: ", err);
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message
      }
    }
  }

  @ApiOperation({ summary: "Update room type: name, capacity, priceBase" })
  @Patch("update-room-type")
  async updateRoomType(@Body() roomTypeData: UpdateRoomTypeDto) {
    try {
      const result = await this.roomTypeService.updateRoomType(roomTypeData);
      return {
        status: HttpStatus.OK,
        error: 0,
        message: `Update room type data successfully.`,
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts updateRoomType: ", err);
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.messgage
      }
    }
  }

  @ApiOperation({ summary: "Create new room type." })
  @Post()
  async addNewRoomType(@Body() roomTypeData: RoomTypeAddNewDto) {
    try {
      const result = await this.roomTypeService.addNewRoomType(roomTypeData)
      return {
        status: HttpStatus.CREATED,
        error: 0,
        message: "Create new room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("room_type.controller.ts addNewRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message
      }
    }
  }
}
