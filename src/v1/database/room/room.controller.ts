import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@/middleware/authenticate';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('room')
@UseGuards(new AuthGuard())
@ApiTags("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

    @ApiOperation({ summary: "Create new room" })
    @Post("")
    async CreateNewRoom(@Body() roomInfo: CreateRoomDto) {
        try {
            const result = await this.roomService.CreateNewRoom(roomInfo)
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Create room successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts CreateNewRoom: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message || err.message
            }
        }
    }

    @ApiOperation({ summary: "get room by room number" })
    @Get(":roomNumber")
    async GetRoomByRoomNumber(@Param("roomNumber") roomNumber: number) {
        try {
            const result = await this.roomService.GetRoomByRoomNumber(roomNumber)
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get room by number successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts GetRoomByRoomNumber: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message || err.message
            }
        }
    }

    @ApiOperation({ summary: "get all room" })
    @Get("")
    async GetAllRoom() {
        try {
            const result = await this.roomService.GetAllRoom()
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get all room successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts GetAllRoom: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message || err.message
            }
        }
    }
}
