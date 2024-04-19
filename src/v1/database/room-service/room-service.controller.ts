import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomServiceService } from './room-service.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('room-service')
export class RoomServiceController {
  constructor(private readonly roomServiceService: RoomServiceService) {}

  // @ApiOperation({summary: "Create new room type and its its services"})
}
