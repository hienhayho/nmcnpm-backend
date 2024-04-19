import { Controller, Get, Post, HttpStatus, Body, Query, Param, Patch } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('v1/room-type')
@ApiTags("room_type")
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) { }

  
}
