import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomDetailService } from './room_detail.service';
import { ServicesService } from '../services/services.service';
import { RoomDetailController } from './room_detail.controller';
import { ServicesController } from '../services/services.controller';
import { RoomDetail } from './entities/room_detail.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Bill } from '../bill/entities/bill.entity';
import { ServicesUsed } from '../services_used/entities/services_used.entity';
import { Room } from '../room/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomDetail, Service, User, Role, Bill, ServicesUsed, Room]),
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
  controllers: [RoomDetailController, ServicesController],
  providers: [RoomDetailService, ServicesService]
})
export class RoomDetailModule {}
