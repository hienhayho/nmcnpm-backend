import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { dateDiff } from '@/utils';
import { CreateRoomDetailDto } from './dto/room_detail.create.dto';
import { ServicesService } from '../services/services.service';
import { RoomDetail } from './entities/room_detail.entity';
import { Bill } from '../bill/entities/bill.entity';
import { User } from '../user/entities/user.entity';
import { Room } from '../room/entities/room.entity';
import { RoomService } from '../room-service/entities/room-service.entity';

@Injectable()
export class RoomDetailService {
  constructor(
    @InjectRepository(RoomDetail) private readonly roomDetailService: Repository<RoomDetail>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Bill) private readonly billService: Repository<Bill>,
    @InjectRepository(Room) private readonly roomService: Repository<Room>,
    @InjectRepository(RoomService) private readonly roomServiceService: Repository<RoomService>,
    private serviceService: ServicesService,
    private jwtService: JwtService
  ) { }

  async getAllRoomDetailed() {
    return await this.roomDetailService.find({
      relations: {
        user: true,
        bill: true
      }
    })
  }

  async getRoomDetailBooked(cookies: Record<string, any>) {
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
    const userId = payload["id"];
    const roomDetails = await this.roomDetailService.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: {
        bill: true,
      }
    })
    return roomDetails
  }

  async getRoomDetailById(roomId: number) {
    try {
      const allRoomDetail = await this.roomDetailService.findAndCount({
        where: { room: { id: roomId } },
        order: {
          checkOut: "DESC"
        }
      })
      // const test = new Date(
      //   allRoomDetail[0][0].checkIn
      // ).toLocaleString();
      // console.log(test)

      return allRoomDetail[0]
    } catch (err) {
      console.error("room_detail.sevice.ts getRoomDetailByRoomId: ", err.message)
      throw new InternalServerErrorException({ message: "Something went wrong! Please try again later." })
    }
  }

  async createRoomDetail(cookies: Record<string, any>, roomDetailReq: CreateRoomDetailDto) {
    // const {services_used} = roomDetailReq
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

    const checkInDate = new Date(roomDetailReq.checkIn)
    const checkOutDate = new Date(roomDetailReq.checkOut)
    const isDateValidate = checkInDate < checkOutDate
    if (!isDateValidate) {
      throw new BadRequestException({ message: "Checkout time must be larger than Checkin" })
    }

    const days = dateDiff(checkInDate, checkOutDate);
    if (days < 0.5) {
      throw new BadRequestException({ message: "Must register at least half a day." })
    }

    // check phòng đã được đặt chưa
    const roomBooked = await this.getRoomDetailById(roomDetailReq.roomId)
    if (roomBooked.length > 0) {
      // thời gian checkout xa nhất có < thời gian checkin
      if (roomBooked[0].checkOut >= new Date(roomDetailReq.checkIn)) {
        throw new BadRequestException({ message: "This room booked by other customers" })
      }
    }

    // check room features 
    const room = await this.roomService.findOne({
      where: {
        id: roomDetailReq.roomId
      },
      relations: {
        roomType: true
      }
    })

    // check room active
    if (!room.active) {
      throw new BadRequestException({ message: `Room with id=${room.id} is not active` })
    }

    // check room capacity
    if (room.roomType.capacity < roomDetailReq.numUser) {
      throw new BadRequestException({ message: `Out of capacity=${room.roomType.capacity} with numberOfPeople=${roomDetailReq.numUser}` })
    }

    // check room price
    const roomServices = await this.roomServiceService.find({
      where: {
        roomType: {
          id: room.roomType.id
        }
      },
      relations: {
        service: true
      }
    })

    const user = await this.userService.findOne({
      where: {
        id: userId
      }
    })

    const bill = new Bill()
    bill.user = user;
    bill.paid = false;
    bill.priceAll = Math.round((roomServices.reduce(
      (accumlator, currentValue) => accumlator + (currentValue.service.price * currentValue.quantity),
      0
    ) + (room.roomType.priceBase * days)) * (1 - roomDetailReq.discount) * 100) / 100;
    await this.billService.save(bill)

    const roomDetail = new RoomDetail()
    roomDetail.room = room;
    roomDetail.user = user;
    roomDetail.bill = bill;
    roomDetail.checkIn = checkInDate;
    roomDetail.checkOut = checkOutDate;
    roomDetail.numberUsers = roomDetailReq.numUser;
    roomDetail.discount = roomDetailReq.discount;

    const result = await this.roomDetailService.save(roomDetail)
    return result
  }

  async deleteRoomDetailById(id: number) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current = new Date(
      moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss")
    )
    const roomDetail = await this.roomDetailService.findOne({
      where: { id: id },

    })
    const checkIn = roomDetail.checkIn;
    if (current > checkIn) {
      throw new BadRequestException({ message: "Can't cancel room after checkin." })
    }
    // Remove old serviced used
    return await this.roomDetailService.remove(roomDetail)
  }
}
