import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoomDetailDto } from './dto/create-room_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDetail } from './entities/room_detail.entity';
import { Repository } from 'typeorm';
import { Bill } from '../bill/entities/bill.entity';
import { ServicesService } from '../services/services.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RoomDetailService {
  constructor(
    @InjectRepository(RoomDetail) private readonly roomDetailService: Repository<RoomDetail>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    private serviceService: ServicesService,
    
  ) { }

  async getRoomDetailByRoomId(roomId: number){
    try {
      const allRoomDetail = await this.roomDetailService.findAndCount({
        where: {room: {id:roomId}}, 
        order: {
          checkOut:"DESC"
        }
      })

      return allRoomDetail[0]
    } catch (err) {
      console.error("room_detail.sevice.ts getRoomDetailByRoomId: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }
  
  async createRoomDetail(cookies: Record<string, any>,roomDetailReq: CreateRoomDetailDto) {
    try {
      const {} = roomDetailReq
      // check thời gian checkin checkout
      const isDateValidate = roomDetailReq.checkIn < roomDetailReq.checkOut
      if (!isDateValidate){
        throw new BadRequestException({ message: "Checkout time must be larger than Checkin" })
      }

      // check phòng đã được đặt chưa
      const roomBooked = await this.getRoomDetailByRoomId(roomDetailReq.roomId)
      if (roomBooked.length > 0){
        // thời gian checkout xa nhất có < thời gian checkin
        if (roomBooked[0].checkOut > roomDetailReq.checkIn){
          throw new BadRequestException({ message: "This room booked by other customers" })
        }
      }

      const service_name = roomDetailReq.services_used.map((service)=>{
        return service.name
      })
      const services = await this.serviceService.getServiceByNames(service_name)
      const user = await this.userService.findOne({
        where: {
          id: 1
        }
      })
      

      return {
        
      }

    } catch (err) {
      console.error("user.sevice.ts getAllUser: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }
}
