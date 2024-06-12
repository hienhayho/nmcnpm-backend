import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository, In, LessThan, MoreThan } from "typeorm";
import { Room } from "./entities/room.entity";
import { RoomDetail } from "../room_detail/entities/room_detail.entity";
import { CreateRoomDto } from "./dto/room.create.dto";
import { UpdateRoomDto } from "../../admin/dto/room.update.dto";
import { RoomTypeService } from "../room_type/room_type.service";

@Injectable()
export class RoomServices {
    constructor(
        @InjectRepository(Room) private readonly roomService: Repository<Room>,
        @InjectRepository(RoomDetail)
        private readonly roomDetailService: Repository<RoomDetail>,
        private roomTypeService: RoomTypeService
    ) {}
    async createNewRoom(roomInfo: CreateRoomDto) {
        const roomType = await this.roomTypeService.getRoomTypeWithItsServices(
            roomInfo.roomTypeId
        );
        const checkRoomNumber = await this.roomService.findOne({
            where: {
                roomNumber: roomInfo.roomNumber,
            },
        });

        // check xem số phòng này đã có chưa
        if (checkRoomNumber) {
            throw new BadRequestException({
                message: "This room number alrealdy in use",
            });
        }

        const room: Room = new Room();
        room.roomNumber = roomInfo.roomNumber;
        room.roomType = roomType;
        room.discount = roomInfo.discount;

        const result = await this.roomService.save(room);

        return result;
    }

    async getRoomByRoomNumber(roomNumber: number) {
        const room = await this.roomService.findOne({
            where: {
                roomNumber: roomNumber,
            },
            relations: {
                roomType: true,
            },
        });
        if (!room) {
            throw new BadRequestException({
                message: "this room number does not exists",
            });
        }
        return room;
    }

    async getAllRoom() {
        const result = await this.roomService.find({
            relations: {
                roomType: true,
            },
        });
        return result;
    }

    async getAllRoomNotBooked() {
        const roomNotBooked = await this.roomService.find({
            where: {
                booked: false,
            },
        });
        return roomNotBooked;
    }

    async getRoomByRoomTypeId(roomTypeId: number) {
        return await this.roomService.find({
            where: {
                roomType: {
                    id: roomTypeId,
                },
            },
        });
    }

    async updateRoom(roomData: UpdateRoomDto) {
        const { roomNumber, roomTypeId, roomId } = roomData;

        const room = await this.roomService.findOne({
            where: {
                id: roomId,
            },
            relations: {
                roomType: true,
            },
        });
        if (room.booked) {
            throw new BadRequestException({
                message: `Room with id=${roomId} is now booked, not allow to update.`,
            });
        }
        if (room.roomType.id === roomTypeId) {
            return room;
        }
        const roomType = await this.roomTypeService.getRoomTypeById(roomTypeId);
        room.roomType = roomType;
        room.roomNumber = roomNumber;
        return await this.roomService.save(room);
    }

    async deactiveRommById(roomId: number) {
        const room = await this.roomService.findOne({
            where: {
                id: roomId,
            },
        });
        if (room.booked) {
            throw new BadRequestException({
                message: `Room with id=${roomId} is now booked, not allow to deactive.`,
            });
        }
        room.active = false;
        return await this.roomService.save(room);
    }

    async deleteRoomById(roomId: number) {
        const room = await this.roomService.findOne({
            where: {
                id: roomId,
            },
        });
        if (room.booked) {
            throw new BadRequestException({
                message: `Room with id=${roomId} is now booked, not allow to delete.`,
            });
        }
        if (room.active) {
            throw new BadRequestException({
                message: `Room with id=${roomId} is now active, not allow to delete.`,
            });
        }
        return await this.roomService.softDelete(roomId);
    }

    async activeRoomById(roomId: number) {
        const room = await this.roomService.findOne({
            where: {
                id: roomId,
            },
        });
        if (room.active) {
            throw new BadRequestException({
                message: `Room with id=${roomId} is now active, not allow to active again.`,
            });
        }
        room.active = true;
        return await this.roomService.save(room);
    }
}
