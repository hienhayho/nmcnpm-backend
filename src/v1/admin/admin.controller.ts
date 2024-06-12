import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, HttpStatus, Res, StreamableFile } from '@nestjs/common';
import { AdminAuth } from '@/middleware/authenticate';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AddNewServiceDto } from './dto/service.addNewService.dto';
import { DeleteServiceDto } from './dto/service.delete.dto';
import { UpdateServiceDto } from './dto/service.update.dto';
import { AddNewRoomTypeDto } from './dto/roomType.addNewRoomType.dto';
import { UpdateRoomTypeDto } from './dto/roomType.update.dto';
import { DeleteRoomTypeDto } from './dto/roomType.delete.dto';
import { UpdateRoomDto } from './dto/room.update.dto';
import { UserService } from '../database/user/user.service';
import { ServicesService } from '../database/services/services.service';
import { RoomTypeService } from '../database/room_type/room_type.service';
import { BillService } from '../database/bill/bill.service';
import { RoomServices } from '../database/room/room.service';
import { CreateRoomDto } from '../database/room/dto/room.create.dto';
import { RoomDetailService } from '../database/room_detail/room_detail.service';
import { AddNewUserDto } from '../database/user/dto/user.addNewUser.dto';
import { getImagesById } from '@/utils';
import { createReadStream } from 'fs';

@Controller('v1/admin')
@ApiTags("admin")
@UseGuards(new AdminAuth())
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly servicesService: ServicesService,
    private readonly roomTypeService: RoomTypeService,
    private readonly billService: BillService,
    private readonly roomService: RoomServices,
    private readonly roomDetailService: RoomDetailService
  ) { }

  @ApiOperation({ summary: "Add a new service." })
  @Post("service")
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
      console.error("admin.controller.ts addNewService: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Update service by Id with name and price" })
  @Patch("service")
  async updateServiceById(@Body() serviceData: UpdateServiceDto) {
    try {
      const result = await this.servicesService.updateServiceById(serviceData)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Update service successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts updateServiceById: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Delete a service by service Id." })
  @Delete("service")
  async deleteServiceById(@Body() serviceId: DeleteServiceDto) {
    try {
      const result = await this.servicesService.deleteServiceById(serviceId.serviceId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Delete service successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts deleteServiceById: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Add new room type." })
  @Post("room_type")
  async createRoomType(@Body() roomTypeInput: AddNewRoomTypeDto) {
    try {
      const result = await this.roomTypeService.createRoomType(roomTypeInput)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Create room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts createRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Update room type." })
  @Patch("room_type")
  async updateRoomType(@Body() roomTypeInput: UpdateRoomTypeDto) {
    try {
      const result = await this.roomTypeService.updateRoomType(roomTypeInput)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Update room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts updateRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Delete room type by Id." })
  @Delete("room_type/:roomTypeId")
  async deleteRoomType(@Param("roomTypeId") roomTypeId: number) {
    try {
      const data: DeleteRoomTypeDto = {
        roomTypeId
      }
      const result = await this.roomTypeService.deleteRoomType(data)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Delete room type successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts deleteRoomType: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Create new room" })
  @Post("room")
  async createNewRoom(@Body() roomInfo: CreateRoomDto) {
    try {
      const result = await this.roomService.createNewRoom(roomInfo)
      return {
        status: HttpStatus.CREATED,
        error: 0,
        message: "Create new room successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts createNewRoom: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Update room info: change room number or change type of room." })
  @Patch("room/:roomId")
  async updateRoom(@Param("roomId") roomId: number, @Body() roomData: UpdateRoomDto) {
    try {
      const data: UpdateRoomDto = {
        ...roomData,
        roomId
      }
      const result = await this.roomService.updateRoom(data)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Update room successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts updateRoom: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get all room details" })
  @Get("room_detail")
  async getAllRoomDetailed() {
    try {
      const result = await this.roomDetailService.getAllRoomDetailed()
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all room details successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts getAllRoomDetailed: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Delete user by condition, only allow: userName, email, id." })
  @Delete('user/delete_user_by_condition')
  async deleteUser(@Query("condition") condition: string, @Query("value") value: string, @Req() request: Request) {
    const cookies = request.cookies;
    try {
      const result = await this.userService.deleteUser(cookies, condition, value)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Delete user successfully",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts deleteUser: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Add new user with user Id." })
  @Post("user/add_new_user_by_roleId/:roleId")
  async addNewUser(@Param("roleId") roleId: number, @Body() userInfo: AddNewUserDto) {
    try {
      const userData = {
        ...userInfo,
        roleId: roleId
      }
      const result = await this.userService.addNewUser(userData)
      if (result) {
        return {
          status: HttpStatus.CREATED,
          error: 0,
          message: "Add new user successfully.",
          data: result
        }
      }
    } catch (err) {
      console.error("admin.controller.ts addNewUser: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get all users from database." })
  @Get("user")
  async getAllUser() {
    try {
      const allUser = await this.userService.getAllUser();
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all users successfully !",
        data: allUser
      }
    } catch (err) {
      console.error("admin.controller.ts getAllUser: ", err.message);
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get user avatar with avatar id." })
  @Post('user/user_avatar/:id')
  async getUserAvatarById(
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ): Promise<StreamableFile> {
    try {
      res.set({ 'Content-Type': 'image/jpg' });
      const imageLocation = getImagesById(id)
      const file = createReadStream(imageLocation);
      return new StreamableFile(file);
    } catch (err) {
      console.error("user.controller.ts getUserAvatarById: ", err)
    }
  }

  @ApiOperation({ summary: "Get bill of a room detail id" })
  @Post("roomdetail/bill/:id")
  async getRoomDetailBill(@Param("id") id: string) {
    try {
      const roomDetailId = parseInt(id);
      const result = await this.roomDetailService.computeBill(roomDetailId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: `Get bill of roomDetailId=${roomDetailId} successfully.`,
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts getRoomDetailBill: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Accept pay bill" })
  @Post("roomdetail/payBill/:id")
  async payBill(@Param("id") id: string) {
    try {
      const roomDetailId = parseInt(id);
      const result = await this.roomDetailService.payBill(roomDetailId);
      return {
        status: HttpStatus.OK,
        error: 0,
        message: `Pay bill of roomDetailId=${roomDetailId} successfully.`,
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts payBill: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get all bill" })
  @Get("bills")
  async getAllBills() {
    try {
      const result = await this.billService.getAllBills()
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all bills successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts getAllBills: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Delete room by Id." })
  @Delete("room/:id")
  async deleteRommById(@Param("id") id: string) {
    try {
      const roomId = parseInt(id)
      const result = await this.roomService.deleteRommById(roomId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Delete room successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts deleteRommById: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Active room by Id." })
  @Patch("room_active/:id")
  async activeRommById(@Param("id") id: string) {
    try {
      const roomId = parseInt(id)
      const result = await this.roomService.activeRoomById(roomId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Active room successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts activeRommById: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }
}
