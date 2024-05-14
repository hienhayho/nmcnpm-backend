import { Controller, Get, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/middleware/authenticate';
import { ServicesService } from './services.service';

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
      console.error("services.controller.ts getAllServices: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }

  @ApiOperation({ summary: "Get service in a list of names." })
  @Post("get_services_by_name")
  async getServiceByNames(@Body() serviceNames: string[]) {
    try {
      const result = await this.servicesService.getServiceByNames(serviceNames)
      return {
        status: HttpStatus.OK,
        error: 0,
        message: "Get all services by names successfully.",
        data: result
      }
    } catch (err) {
      console.error("services.controller.ts getServiceByNames: ", err)
      return {
        status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.response.message ?? err.message ?? "Internal Server Error!"
      }
    }
  }
}