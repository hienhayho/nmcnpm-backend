import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomServiceService } from './room-service.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@/middleware/authenticate';

@Controller('room-service')
@UseGuards(new AuthGuard())
export class RoomServiceController {
  constructor(private readonly roomServiceService: RoomServiceService) {}

  // @ApiOperation({summary: "Create new room type and its its services"})
}
