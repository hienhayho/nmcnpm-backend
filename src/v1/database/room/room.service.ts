import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { RoomTypeService } from '../room_type/room_type.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In } from 'typeorm';
import { RoomDetail } from '../room_detail/entities/room_detail.entity';
import { UpdateRoomDto } from '../../admin/dto/room.update.dto';

@Injectable()
export class RoomServices {
  constructor(
    @InjectRepository(Room) private readonly roomService: Repository<Room>,
    @InjectRepository(RoomDetail) private readonly roomDetailService: Repository<RoomDetail>,
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
      },
      relations: {
        roomType: true
      }
    })
    if (room == null) {
      throw new BadRequestException({ message: "this room number does not exists" });
    }
    return room
  }

  async GetAllRoom(){
    const result = await this.roomService.find({
      relations: {
        roomType: true
      }
    });
    return result;
  }

  async GetAllRoomNotBooked() {
    const roomIdBooked = await this.roomDetailService.find({
      select: {
        id: true
      }
    })
    
    const roomBookedId = roomIdBooked.map((value) => {
      return value.id
    })

    const roomNotBooked = await this.roomService.find({
      where: {
        id: Not(In(roomBookedId))
      },
      relations: {
        roomType: true
      }
    })
    return roomNotBooked
  }

  async updateRoom(roomData: UpdateRoomDto) {
    const { roomNumber, roomTypeId, roomId } = roomData;
    if (roomTypeId === undefined){
      const result = await this.roomService
      .createQueryBuilder()
      .update(Room)
      .set({roomNumber: roomNumber})
      .where("id = :id", {id: roomId})
      .execute()

      return result
    }

    const room = await this.roomService.findOne({
      where: {
        id: roomId
      },
      relations: {
        roomType: true
      }
    })
    if (room.roomType.id === roomTypeId) {
      return room
    }
    const roomType = await this.roomTypeService.getRoomTypeById(roomTypeId)
    room.roomType = roomType;
    return await this.roomService.save(room)
  }
}
