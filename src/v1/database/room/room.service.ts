import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In, LessThan, MoreThan } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomDetail } from '../room_detail/entities/room_detail.entity';
import { ServicesUsed } from '../services_used/entities/services_used.entity';
import { CreateRoomDto } from './dto/room.create.dto';
import { UpdateRoomDto } from '../../admin/dto/room.update.dto';
import { RoomTypeService } from '../room_type/room_type.service';

@Injectable()
export class RoomServices {
  constructor(
    @InjectRepository(Room) private readonly roomService: Repository<Room>,
    @InjectRepository(RoomDetail) private readonly roomDetailService: Repository<RoomDetail>,
    @InjectRepository(ServicesUsed) private readonly servicedUsed: Repository<ServicesUsed>,
    private roomTypeService: RoomTypeService
  ) { }
  async createNewRoom(roomInfo: CreateRoomDto) {
    const roomType = await this.roomTypeService.getRoomTypeWithItsServices(roomInfo.roomTypeId)
    const checkRoomNumber = await this.roomService.findOne({
      where: {
        roomNumber: roomInfo.roomNumber
      }
    })

    // check xem số phòng này đã có chưa
    if (checkRoomNumber) {
      throw new BadRequestException({ message: "This room number alrealdy in use" })
    }

    const room :Room = new Room()
    room.roomNumber = roomInfo.roomNumber
    room.roomType = roomType

    const result = await this.roomService.save(room)

    return result
  }

  async getRoomByRoomNumber(roomNumber: number){
    const room = await this.roomService.findOne({
      where: {
        roomNumber: roomNumber
      },
      relations: {
        roomType: true
      }
    })
    if (!room) {
      throw new BadRequestException({ message: "this room number does not exists" });
    }
    return room
  }

  async getAllRoom(){
    const result = await this.roomService.find({
      relations: {
        roomType: true
      }
    });
    return result;
  }

  async getAllRoomNotBooked() {
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

  async deleteRommById(roomId : number){
    const now = new Date()
    const roomDetailByRoomIdNow = await this.roomDetailService.findOne({
      where:{
        room: {
          id: roomId
        },
        checkIn: LessThan(now),
        checkOut: MoreThan(now)
      }
    })
    if (roomDetailByRoomIdNow) {
      throw new BadRequestException({ message: `This room with id=${roomId} is already in use ` });
    }

    const roomDetailByRoomIdAfterNow = await this.roomDetailService.find({
      where:{
        room: {
          id: roomId
        },
        checkIn: MoreThan(now),
      }
    })

    const idroomDetailByRoomIdAfterNow = roomDetailByRoomIdAfterNow.map((roomDetail)=>{
      return roomDetail.id
    })

    await this.servicedUsed.delete({
      roomDetail: {
        id: In(idroomDetailByRoomIdAfterNow)
      }
    })

    await this.roomDetailService.delete({
      checkIn: MoreThan(now)
    })
    
    const result = await this.roomService.save({
      id: roomId,
      active: false
    })

    return result
  }
}