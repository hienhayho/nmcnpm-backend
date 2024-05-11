import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { RoomDetailService } from './room_detail.service';
import { CreateRoomDetailDto } from './dto/create-room_detail.dto';
import { AuthGuard } from '@/middleware/authenticate';
import { ApiTags } from '@nestjs/swagger';
import {Request} from "express"

@Controller('room-detail')
@ApiTags("room detail")
@UseGuards(new AuthGuard())
export class RoomDetailController {
  constructor(private readonly roomDetailService: RoomDetailService) {}

  @Get("get-by-room-id/:roomid")
    async getRoomDetailByRoomId(@Param("roomid") roomId: number) {
        try {
            const result = await this.roomDetailService.getRoomDetailByRoomId(roomId);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "get room successfully",
                data: result
            }
        } catch (err) {
            console.error("room_detail.controller.ts getRoomDetailByRoomId", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

  @Post("create")
    async createRoomDetail(@Body() roomDetailReq: CreateRoomDetailDto,@Req() request: Request) {
        try {
            const cookies = request.cookies
            const result = await this.roomDetailService.createRoomDetail(cookies,roomDetailReq);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Create room successfully",
                data: result
            }
        } catch (err) {
            console.error("room_detail.controller.ts createRoomDetail: ", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }
  
}
