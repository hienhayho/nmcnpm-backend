import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { User } from '../database/user/entities/user.entity';
import { UserService } from '../database/user/user.service';
import { Role } from '../database/role/entities/role.entity';
import { Service } from '../database/services/entities/service.entity';
import { ServicesService } from '../database/services/services.service';
import { RoomType } from '../database/room_type/entities/room_type.entity';
import { RoomTypeService } from '../database/room_type/room_type.service';
import { RoomService } from '../database/room-service/entities/room-service.entity';
import { Bill } from '../database/bill/entities/bill.entity';
import { BillService } from '../database/bill/bill.service';
import { RoomServices } from '../database/room/room.service';
import { Room } from '../database/room/entities/room.entity';
import { RoomDetail } from '../database/room_detail/entities/room_detail.entity';
import { RoomDetailService } from '../database/room_detail/room_detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Role, Service,
      RoomType, RoomService,
      Room, RoomDetail, Bill,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get("JWT_KEY"),
        signOptions: { expiresIn: configService.get("EXPIRE_IN") },
      })
    })
  ],
  controllers: [AdminController],
  providers: [
    UserService,
    ServicesService,
    RoomServices,
    RoomTypeService,
    RoomDetailService,
    BillService,
    JwtService
  ],
  exports: [JwtService]
})
export class AdminModule { }
