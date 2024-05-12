import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { RoomServices } from './room.service';
import { AuthGuard } from '@/middleware/authenticate';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('v1/room')
@UseGuards(new AuthGuard())
@ApiTags("room")
export class RoomController {
  constructor(private readonly roomService: RoomServices) {}

    

    @ApiOperation({ summary: "get room by room number" })
    @Get("get_room/:roomNumber")
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
    @Get("get_room")
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

    @ApiOperation({ summary: "get all room not booked" })
    @Get("not_booked")
    async GetAllRoomNotBooked() {
        try {
            const result = await this.roomService.GetAllRoomNotBooked()
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get all room successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts GetAllRoomNotBooked: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message || err.message
            }
        }
    }
}
