import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from "../services/services.service"
import { RoomService } from '../room-service/entities/room-service.entity';
import { RoomType } from './entities/room_type.entity';
import { AddNewRoomTypeDto } from '../../admin/dto/roomType.addNewRoomType.dto';
import { UpdateRoomTypeDto } from '@/v1/admin/dto/roomType.update.dto';
import { DeleteRoomTypeDto } from '@/v1/admin/dto/roomType.delete.dto';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>,
    @InjectRepository(RoomService) private roomServiceService: Repository<RoomService>,
    @InjectRepository(Room) private roomService: Repository<Room>,
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
        roomImage: true,
        roomService: {
          id: true,
          service: {
            id: true,
            name: true,
            price: true
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
    const { name, desc, capacity, priceBase, services } = roomTypeInput;
    const newRoomType = new RoomType();
    newRoomType.name = name;
    newRoomType.desc = desc;
    newRoomType.capacity = capacity;
    newRoomType.priceBase = priceBase;

    const savedRoomType = await this.roomTypeService.save(newRoomType);

    const servicesInDb = await this.serviceService.getServiceByNames(services.map(service => service.name))
    const roomServices: RoomService[] = []
    for (let i = 0; i < servicesInDb.length; i++) {
      const roomService = new RoomService()
      roomService.service = servicesInDb[i]
      roomService.roomType = savedRoomType
      roomService.quantity = services[i].quantity
      roomServices.push(roomService)
    }

    await this.roomServiceService.insert(roomServices);

    return {
      savedRoomType,
      roomServices
    }
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
      .set({ name: name, desc: desc, priceBase: priceBase, capacity: capacity })
      .where("id = :id", { id: roomTypeId })
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
    const room = await this.roomService.find({
      where: {
        roomType: {
          id: roomTypeId.roomTypeId
        }
      }
    })
    if (room.length > 0) {
      throw new BadRequestException({ message: `Cannot delete roomtypeid=${roomTypeId.roomTypeId} since exists room with this roomtype.` })
    }
    const result = await this.roomTypeService.softDelete({
      id: roomTypeId.roomTypeId
    })
    return result
  }

  async uploadRoomTypeImage(file: Express.Multer.File, roomTypeId: number) {
    const roomType = await this.getRoomTypeById(roomTypeId)

    if (!roomType) {
      throw new NotFoundException({ message: `room type id = ${roomType.id} not found in database.` })
    }

    roomType.roomImage = `images/${file.filename}`

    return await this.roomTypeService.save(roomType)
  }

  async getRoomTypeImage(roomTypeId: number) {
    const roomType = await this.getRoomTypeById(roomTypeId)

    if (!roomType || !roomType.roomImage) {
      // Hình default
      return "default/roomTypeNotFound.png"
    }

    return roomType.roomImage
  }

}
