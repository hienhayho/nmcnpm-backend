import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomTypeService } from '../room_type/room_type.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomService: Repository<Room>,
    private roomTypeService: RoomTypeService
  ) { }
  async CreateNewRoom(roomInfo: CreateRoomDto) {
    const roomType = await this.roomTypeService.getRoomTypeWithItsServices(roomInfo.roomTypeId)
    const checkRoomNumber = await this.roomService.findOne({
      where: {
        roomNumber: roomInfo.roomNumber
      }
    })

    // check xem số phòng này đã có chưa
    if (checkRoomNumber != null) {
      throw new BadRequestException({ message: "This room number alrealdy in use" })
    }

    const room :Room = new Room()
    room.roomNumber = roomInfo.roomNumber
    room.roomType = roomType

    const result = await this.roomService.save(room)

    return result
  }

  async GetRoomByRoomNumber(roomNumber :number){
    const room = await this.roomService.findOne({
      where: {
        roomNumber: roomNumber
      }
    })
    if (room == null) {
      throw new BadRequestException({ message: "this room number does not exists" });
    }
    return room
  }

  async GetAllRoom(){
    const result = await this.roomService.find({});
    return result;
  }
}
