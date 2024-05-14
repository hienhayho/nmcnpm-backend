import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from "express"
import { AuthGuard } from '@/middleware/authenticate';
import { CreateRoomDetailDto } from './dto/room_detail.create.dto';
import { RoomDetailService } from './room_detail.service';

@Controller('v1/room_detail')
@ApiTags("room detail")
@UseGuards(new AuthGuard())
export class RoomDetailController {
    constructor(
        private readonly roomDetailService: RoomDetailService
    ) {}

    @ApiOperation({summary: "Get room detail booked by userId"})
    @Get()
    async getRoomDetailBooked(@Req() request: Request) {
        try {
            const cookies = request.cookies
            const result = await this.roomDetailService.getRoomDetailBooked(cookies);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get room detail booked successfully.",
                data: result
            }
        } catch (err) {
            console.error("room_detail.controller.ts getRoomDetailBooked: ", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }    
    
    @ApiOperation({summary: "Get room detail by id."})
    @Get("get_by_room_id/:id")
    async getRoomDetailByRoomId(@Param("id") id: string) {
        try {
            const numRoomId = parseInt(id)
            const result = await this.roomDetailService.getRoomDetailById(numRoomId);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get room detail successfully",
                data: result
            }
        } catch (err) {
            console.error("room_detail.controller.ts getRoomDetailByRoomId", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }

    @Post("create")
    async createRoomDetail(@Body() roomDetailReq: CreateRoomDetailDto, @Req() request: Request) {
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
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }

    @ApiOperation({summary: "Delete room detail by id."})
    @Delete("delete/:id")
    async deleteRoomDetailById(@Param("id") id: string) {
        try {
            const numId = parseInt(id)
            const result = await this.roomDetailService.deleteRoomDetailById(numId);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Delete room detail successfully",
                data: result
            }
        } catch (err) {
            console.error("room_detail.controller.ts deleteRoomDetailById", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message ?? err.message ?? "Internal Server Error!"
            }
        }
    }
}
