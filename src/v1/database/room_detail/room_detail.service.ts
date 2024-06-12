import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment-timezone";
import { dateDiff } from "@/utils";
import { CreateRoomDetailDto } from "./dto/room_detail.create.dto";
import { ServicesService } from "../services/services.service";
import { RoomDetail } from "./entities/room_detail.entity";
import { Bill } from "../bill/entities/bill.entity";
import { User } from "../user/entities/user.entity";
import { Room } from "../room/entities/room.entity";
import { RoomService } from "../room-service/entities/room-service.entity";

@Injectable()
export class RoomDetailService {
    constructor(
        @InjectRepository(RoomDetail)
        private readonly roomDetailService: Repository<RoomDetail>,
        @InjectRepository(User) private readonly userService: Repository<User>,
        @InjectRepository(Bill) private readonly billService: Repository<Bill>,
        @InjectRepository(Room) private readonly roomService: Repository<Room>,
        @InjectRepository(RoomService)
        private readonly roomServiceService: Repository<RoomService>,
        private jwtService: JwtService
    ) {}

    async getAllRoomDetailed() {
        return await this.roomDetailService.find({
            select: {
                id: true,
                checkIn: true,
                checkOut: true,
                user: {
                    id: true,
                    userName: true,
                    phone: true,
                    email: true,
                    fullName: true,
                },
                bill: {
                    id: true,
                    priceAll: true,
                    paid: true,
                },
                room: {
                    id: true,
                    roomNumber: true,
                },
            },
            relations: {
                user: true,
                bill: true,
                room: true,
            },
        });
    }

    async getRoomDetailBooked(cookies: Record<string, any>) {
        const token = cookies["access_token"];
        if (!token) {
            throw new UnauthorizedException({ message: "token not found" });
        }
        const JWT_KEY = process.env.JWT_KEY;
        let payload: object;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: JWT_KEY,
            });
        } catch (err) {
            throw new UnauthorizedException({ message: "token expired" });
        }
        const userId = payload["id"];
        const roomDetails = await this.roomDetailService.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                bill: true,
            },
        });
        return roomDetails;
    }

    async getRoomDetailById(roomId: number) {
        try {
            const allRoomDetail = await this.roomDetailService.findAndCount({
                where: { room: { id: roomId } },
                order: {
                    checkOut: "DESC",
                },
            });
            // const test = new Date(
            //   allRoomDetail[0][0].checkIn
            // ).toLocaleString();
            // console.log(test)

            return allRoomDetail[0];
        } catch (err) {
            console.error(
                "room_detail.sevice.ts getRoomDetailByRoomId: ",
                err.message
            );
            throw new InternalServerErrorException({
                message: "Something went wrong! Please try again later.",
            });
        }
    }

    async createRoomDetail(
        cookies: Record<string, any>,
        roomDetailReq: CreateRoomDetailDto
    ) {
        // const {services_used} = roomDetailReq
        // get access_token from cookies
        const token = cookies["access_token"];
        if (!token) {
            throw new UnauthorizedException({ message: "token not found" });
        }
        const JWT_KEY = process.env.JWT_KEY;
        let payload: object;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: JWT_KEY,
            });
        } catch (err) {
            throw new UnauthorizedException({ message: "token expired" });
        }
        const userId = payload["id"];
        // check thời gian checkin checkout

        const checkInDate = new Date(roomDetailReq.checkIn);

        // check room features
        const room = await this.roomService.findOne({
            where: {
                id: roomDetailReq.roomId,
            },
            relations: {
                roomType: true,
            },
        });
        if (!room) {
            throw new BadRequestException({
                message: `Room with id=${roomDetailReq.roomId} not exists in db.`,
            });
        }
        // check coi co ai da dat chua
        if (room.booked) {
            throw new BadRequestException({
                message: `Room with id=${roomDetailReq.roomId} has been booked`,
            });
        }
        // check room active
        if (!room.active) {
            throw new BadRequestException({
                message: `Room with id=${room.id} is not active`,
            });
        }
        // check room capacity
        if (room.roomType.capacity < roomDetailReq.numUser) {
            throw new BadRequestException({
                message: `Out of capacity=${room.roomType.capacity} with numberOfPeople=${roomDetailReq.numUser}`,
            });
        }
        room.booked = true;
        const roomBooked = await this.roomService.save(room);

        const user = await this.userService.findOne({
            where: {
                id: userId,
            },
        });

        const roomDetail = new RoomDetail();
        roomDetail.room = roomBooked;
        roomDetail.user = user;
        roomDetail.checkIn = checkInDate;
        roomDetail.numberUsers = roomDetailReq.numUser;

        const result = await this.roomDetailService.save(roomDetail);
        return result;
    }

    async computeBill(id: number) {
        const billHasExists = await this.billService.findOne({
            select: {
                id: true,
                priceAll: true,
                paid: true,
                roomDetail: {
                    checkIn: true,
                    checkOut: true,
                    user: {
                        fullName: true,
                        phone: true,
                        email: true,
                    },
                    room: {
                        id: true,
                        roomNumber: true,
                    },
                },
            },
            relations: {
                roomDetail: {
                    user: true,
                },
            },
            where: {
                roomDetail: {
                    id: id,
                },
            },
        });
        if (billHasExists) {
            return billHasExists;
        }
        const roomDetail = await this.roomDetailService.findOne({
            where: { id: id },
            relations: {
                room: {
                    roomType: true,
                },
                user: true,
            },
        });
        const roomServices = await this.roomServiceService.find({
            where: {
                roomType: {
                    id: roomDetail.room.roomType.id,
                },
            },
            relations: {
                service: true,
            },
        });
        const checkInDate = new Date(roomDetail.checkIn);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const checkOutDate = new Date(
            moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss")
        );
        if (checkOutDate < checkInDate) {
            throw new BadRequestException({
                message: "Check out date must be greater than check in date",
            });
        }
        const room = await this.roomService.findOne({
            where: {
                id: roomDetail.room.id,
            },
        });
        if (!room) {
            throw new BadRequestException({
                message: "No room suitable found in DB",
            });
        }
        const days = dateDiff(checkInDate, checkOutDate);
        const bill = new Bill();
        bill.user = roomDetail.user;
        bill.paid = false;
        bill.priceAll =
            Math.round(
                (roomServices.reduce(
                    (accumlator, currentValue) =>
                        accumlator +
                        currentValue.service.price * currentValue.quantity,
                    0
                ) +
                    roomDetail.room.roomType.priceBase * days) *
                    (1 - room.discount) *
                    100
            ) / 100;
        await this.billService.save(bill);

        roomDetail.bill = bill;
        roomDetail.checkOut = checkOutDate;

        // Update room detail
        await this.roomDetailService.save(roomDetail);
        return {
            bill,
            roomDetail,
        };
    }

    async payBill(id: number) {
        const bill = await this.billService.findOne({
            where: {
                roomDetail: {
                    id: id,
                },
            },
            relations: {
                roomDetail: {
                    room: true,
                },
            },
        });
        bill.paid = true;
        await this.billService.save(bill);

        const room = await this.roomService.findOne({
            where: { id: bill.roomDetail.room.id },
        });
        room.booked = false;
        await this.roomService.save(room);
        return bill;
    }

    async deleteRoomDetailById(id: number) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const current = new Date(
            moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss")
        );
        const roomDetail = await this.roomDetailService.findOne({
            where: { id: id },
        });
        const checkIn = roomDetail.checkIn;

        const roomId = roomDetail.room.id;
        const room = await this.roomService.findOne({
            where: {
                id: roomId,
            },
        });
        room.booked = false;
        await this.roomService.save(room);
        if (current > checkIn) {
            throw new BadRequestException({
                message: "Can't cancel room after checkin.",
            });
        }
        // Remove old serviced used
        return await this.roomDetailService.remove(roomDetail);
    }
}
