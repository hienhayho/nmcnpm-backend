import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDetailDto } from './dto/create-room_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDetail } from './entities/room_detail.entity';
import { Repository } from 'typeorm';
import { Bill } from '../bill/entities/bill.entity';
import { ServicesService } from '../services/services.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ServicesUsed } from '../services_used/entities/services_used.entity';
import { RoomType } from '../room_type/entities/room_type.entity';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class RoomDetailService {
  constructor(
    @InjectRepository(RoomDetail) private readonly roomDetailService: Repository<RoomDetail>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Bill) private readonly billService: Repository<Bill>,
    @InjectRepository(ServicesUsed) private readonly serviceUsedService: Repository<ServicesUsed>,
    @InjectRepository(Room) private readonly roomService: Repository<Room>,
    private serviceService: ServicesService,
    private jwtService: JwtService
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
      const {services_used} = roomDetailReq
        // get access_token from cookies
      const token = cookies["access_token"]
      if (!token) {
        throw new UnauthorizedException({ message: "token not found" });
      }
      const JWT_KEY = process.env.JWT_KEY
      let payload: object;
      try {
        payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_KEY
          }
        );
      } catch (err) {
        throw new UnauthorizedException({ message: "token expired" });
      }
      const userId = payload["id"]
      // check thời gian checkin checkout
      const isDateValidate = roomDetailReq.checkIn < roomDetailReq.checkOut
      if (!isDateValidate){
        throw new BadRequestException({ message: "Checkout time must be larger than Checkin" })
      }

      // check phòng đã được đặt chưa
      const roomBooked = await this.getRoomDetailByRoomId(roomDetailReq.roomId)
      if (roomBooked.length > 0){
        // thời gian checkout xa nhất có < thời gian checkin
        if (roomBooked[0].checkOut >= new Date(roomDetailReq.checkIn)){
          throw new BadRequestException({ message: "This room booked by other customers" })
        }
      }

      // check capacity 

      const room = await this.roomService.findOne({
        where: {
          id: roomDetailReq.roomId
        },
        relations: {
          roomType: true
        }
      })
      if (room.roomType.capacity < roomDetailReq.numUser){
        throw new BadRequestException({ message: `Out of capacity=${room.roomType.capacity} with numberOfPeople=${roomDetailReq.numUser}` })
      }


      const service_name = roomDetailReq.services_used.map((service)=>{
        return service.name
      })
      const services = await this.serviceService.getServiceByNames(service_name)
      const user = await this.userService.findOne({
        where: {
          id: userId
        }
      })
      
      const bill = new Bill()
      bill.user = user
      bill.priceAll= services_used.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
       0,
      ) * (100 - roomDetailReq.discount) / 100
      await this.billService.save(bill)
      
      let servicesUsed: ServicesUsed[] = []
      for (let i=0; i< services.length; i++){
        const serviceUsed: ServicesUsed = new ServicesUsed()
        serviceUsed.quantity = services_used[i].quantity
        serviceUsed.service = services[i]
        await this.serviceUsedService.save(serviceUsed)
        servicesUsed.push(serviceUsed)
      }
      

      const roomDetail = new RoomDetail()
      roomDetail.room = room
      roomDetail.bill = bill
      roomDetail.user = user
      roomDetail.servicesUsed = servicesUsed
      roomDetail.discount = roomDetailReq.discount
      roomDetail.numberUsers = roomDetailReq.numUser
      roomDetail.checkIn = roomDetailReq.checkIn
      roomDetail.checkOut = roomDetailReq.checkOut

      const result = await this.roomDetailService.save(roomDetail)

      return result
  }
}
