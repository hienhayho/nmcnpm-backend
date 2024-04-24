import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Repository } from 'typeorm';
import { AddNewRoomTypeDto } from './dto/roomType.addNewRoomType.dto';
import { ServicesService } from "../services/services.service"
import { RoomService } from '../room-service/entities/room-service.entity';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>,
    @InjectRepository(RoomService) private roomServiceService: Repository<RoomService>,
    private serviceService: ServicesService,
  ) { }
  async getAllRoomType() {
    const result = await this.roomTypeService.find({});
    return result;
  }

  async getRoomTypeWithItsServices(id: number) {
    const roomType = await this.roomTypeService.find({
      select: {
        id: true,
        name: true,
        capacity: true,
        priceBase: true,
        roomService: {
          id: true,
          service: {
            id: true,
            name: true
          }
        }
      },
      relations: {
        roomService: {
          service: true
        }
      },
      where: { id: id },
    })
    console.log(roomType)
    if (roomType.length == 0) {
      throw new BadRequestException({ message: `Room type with id=${id} was not exist in database.` });
    }
    return roomType
  }

  async createRoomType(roomTypeInput: AddNewRoomTypeDto) {
    const services = await this.serviceService.getServiceByNames(roomTypeInput.service_names)
    const roomType = new RoomType()
    roomType.name = roomTypeInput.name
    roomType.capacity = roomTypeInput.capacity
    roomType.priceBase = roomTypeInput.priceBase

    const roomTypeSaved = await this.roomTypeService.save(roomType)

    const roomServices: RoomService[] = []
    for (let i = 0; i < services.length; i++) {
      const roomService = new RoomService()
      roomService.service = services[i]
      roomService.roomType = roomTypeSaved
      roomServices.push(roomService)
    }

    await this.roomServiceService.insert(roomServices);

    return roomTypeSaved
  }
}
