import { Controller, Get, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/middleware/authenticate';
import { RoomServices } from './room.service';

@Controller('v1/room')
@UseGuards(new AuthGuard())
@ApiTags("room")
export class RoomController {
    constructor(
        private readonly roomService: RoomServices
    ) {}

    @ApiOperation({ summary: "Get room by room number" })
    @Get("get_room/:roomNumber")
    async getRoomByRoomNumber(@Param("roomNumber") roomNumber: number) {
        try {
            const result = await this.roomService.getRoomByRoomNumber(roomNumber)
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get room by number successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts getRoomByRoomNumber: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }

    @ApiOperation({ summary: "Get all room" })
    @Get("get_room")
    async getAllRoom() {
        try {
            const result = await this.roomService.getAllRoom()
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get all room successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts getAllRoom: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }

    @ApiOperation({ summary: "Get all room not booked" })
    @Get("not_booked")
    async getAllRoomNotBooked() {
        try {
            const result = await this.roomService.getAllRoomNotBooked()
            return {
              status: HttpStatus.CREATED,
              error: 0,
              message: "Get all room successfully.",
              data: result
            }
        } catch (err) {
            console.error("room.controller.ts getAllRoomNotBooked: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }
}
