import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Between, Repository } from 'typeorm';
import { RoomTypeAddNewDto } from './dto/room_type.addNew.dto';
import { UpdateRoomTypeDto } from './dto/room_type.updateRoomType.dto';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>
  ) { }

  async getAllRoomType() {
    const allRoomType = await this.roomTypeService.find()
    if (!allRoomType) throw new BadRequestException({ message: "Room type not found!" })
    return allRoomType
  }

  async getRoomTypeByName(roomName: string) {
    const roomType = await this.roomTypeService.findOne({
      where: { name: roomName }
    })
    if (!roomType) {
      throw new BadRequestException({ message: `Room type with name=${roomName} not exists in database.` })
    }
    return roomType;
  }

  async getRoomTypeFilteredByCapacity(minCapacity: number, maxCapacity: number) {
    if (minCapacity > maxCapacity) {
      throw new BadRequestException({ message: `minCapacity=${minCapacity} is greater than maxCapacity=${maxCapacity}.` });
    }
    const result = await this.roomTypeService.find({
      where: {
        capacity: Between(minCapacity, maxCapacity)
      }
    })
    return result;
  }

  async addNewRoomType(roomTypeData: RoomTypeAddNewDto) {
    const roomName = roomTypeData.name;
    const roomType = await this.roomTypeService.findOne({
      where: { name: roomName }
    })
    if (roomType) {
      throw new BadRequestException({ message: `Room type with name = ${roomName} has already existed in database.` })
    }
    return await this.roomTypeService.save(roomTypeData)
  }

  async updateRoomType(roomTypeData: UpdateRoomTypeDto) {
    const { name, priceBase, capacity, newName } = roomTypeData;
    const roomType = await this.roomTypeService.findOne({
      where: { name: name }
    })
    if (!roomType) {
      throw new BadRequestException({ message: `Room type with name=${name} not exists in database.` })
    }
    roomType.name = newName;
    roomType.capacity = capacity;
    roomType.priceBase = priceBase;
    return await this.roomTypeService.save(roomType)
  }
}
