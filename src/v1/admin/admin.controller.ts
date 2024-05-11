import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminAuth } from '@/middleware/authenticate';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../database/user/user.service';
import { Request } from 'express';
import { AddNewServiceDto } from './dto/service.addNewService.dto';
import { ServicesService } from '../database/services/services.service';
import { DeleteServiceDto } from './dto/service.delete.dto';

@Controller('v1/admin')
@ApiTags("admin")
@UseGuards(new AdminAuth())
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly servicesService: ServicesService
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

  @ApiOperation({ summary: "Delete a service." })
  @Delete("service")
  async deleteService(@Body() serviceId: DeleteServiceDto) {
    try {
      const result = await this.servicesService.deleteServiceById(serviceId.serviceId)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Delete service successfully.",
        data: result
      }
    } catch (err) {
      console.error("admin.controller.ts deleteService: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Delete user by condition, only allow: userName, email, id." })
  @Delete('delete-user-by-condition')
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
        message: err.response.message
      }
    }
  }
}
