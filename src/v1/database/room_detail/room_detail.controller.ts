import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomDetailService } from './room_detail.service';
import { CreateRoomDetailDto } from './dto/create-room_detail.dto';
import { UpdateRoomDetailDto } from './dto/update-room_detail.dto';
import { AuthGuard } from '@/middleware/authenticate';

@Controller('room-detail')
@UseGuards(new AuthGuard())
export class RoomDetailController {
  constructor(private readonly roomDetailService: RoomDetailService) {}

  @Post()
  create(@Body() createRoomDetailDto: CreateRoomDetailDto) {
    return this.roomDetailService.create(createRoomDetailDto);
  }

  @Get()
  findAll() {
    return this.roomDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDetailDto: UpdateRoomDetailDto) {
    return this.roomDetailService.update(+id, updateRoomDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomDetailService.remove(+id);
  }
}
