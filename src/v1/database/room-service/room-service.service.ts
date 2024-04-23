import { Injectable } from '@nestjs/common';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';
import { UpdateRoomServiceDto } from './dto/update-room-service.dto';

@Injectable()
export class RoomServiceService {
  create(createRoomServiceDto: CreateRoomServiceDto) {
    return 'This action adds a new roomService';
  }

  findAll() {
    return `This action returns all roomService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomService`;
  }

  update(id: number, updateRoomServiceDto: UpdateRoomServiceDto) {
    return `This action updates a #${id} roomService`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomService`;
  }
}
