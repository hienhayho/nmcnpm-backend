import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Repository } from 'typeorm';
import { AddNewRoomTypeDto } from '../../admin/dto/roomType.addNewRoomType.dto';
import { ServicesService } from "../services/services.service"
import { RoomService } from '../room-service/entities/room-service.entity';
import { UpdateRoomTypeDto } from '@/v1/admin/dto/roomType.update.dto';
import { DeleteRoomTypeDto } from '@/v1/admin/dto/roomType.delete.dto';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>,
    @InjectRepository(RoomService) private roomServiceService: Repository<RoomService>,
    private serviceService: ServicesService,
  ) { }
  async getAllRoomType() {
    const result = await this.roomTypeService.find({
      relations: {
        roomService: {
          service: true
        }
      }
    });
    return result;
  }

  async getRoomTypeById(id: number) {
    return await this.roomTypeService.findOne({
      where: {
        id: id
      }
    })
  }

  async getRoomTypeWithItsServices(id: number) {
    const roomType = await this.roomTypeService.findOne({
      select: {
        id: true,
        name: true,
        capacity: true,
        priceBase: true,
        desc: true,
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
    if (roomType == null) {
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
    roomType.desc = roomTypeInput.desc

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

  async updateRoomType(roomTypeInput: UpdateRoomTypeDto) {
    const { roomTypeId, name, desc, capacity, priceBase, service_names } = roomTypeInput;
    // Delete old room type
    
    const roomTypeSaved = await this.roomTypeService.find({
      where: {
        id: roomTypeId
      }
    })

    // Delete existed related rows
    await this.roomServiceService.delete({
      roomType: {
        id: roomTypeId
      }
    })

    const updatedRoomType = await this.roomTypeService
    .createQueryBuilder()
    .update(RoomType)
    .set({name: name, desc: desc, priceBase: priceBase, capacity: capacity})
    .where("id = :id", {id: roomTypeId})
    .execute()
    
    const services = await this.serviceService.getServiceByNames(service_names)
    const roomServices: RoomService[] = []
    for (let i = 0; i < services.length; i++) {
      const roomService = new RoomService()
      roomService.service = services[i]
      roomService.roomType = roomTypeSaved[0]
      roomServices.push(roomService)
    }

    await this.roomServiceService.insert(roomServices);

    return {
      updatedRoomType,
      roomServices
    }
  }

  async deleteRoomType(roomTypeId: DeleteRoomTypeDto) {
    const result = await this.roomTypeService.delete({
      id: roomTypeId.roomTypeId
    })
    return result
  }

  async uploadRoomTypeImage(fileId: string, roomTypeId: number) {
      const roomType = await this.getRoomTypeById(roomTypeId)

      if (!roomType){
        throw new NotFoundException({ message: `room type id = ${roomType.id} not found in database.` })
      }

      roomType.roomImage = fileId

      return await this.roomTypeService.save(roomType)
  }

  async getRoomTypeImage(roomTypeId: number) {
    const roomType = await this.getRoomTypeById(roomTypeId)
    
    if (!roomType || !roomType.roomImage){
      // Hình default
      return "roomTypeNotFound.png"
    }

    return roomType.roomImage
  }
  
}
