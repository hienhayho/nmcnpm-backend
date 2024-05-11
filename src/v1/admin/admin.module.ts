import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../database/user/entities/user.entity';
import { UserService } from '../database/user/user.service';
import { Role } from '../database/role/entities/role.entity';
import { Service } from '../database/services/entities/service.entity';
import { ServicesService } from '../database/services/services.service';
import { RoomType } from '../database/room_type/entities/room_type.entity';
import { RoomTypeService } from '../database/room_type/room_type.service';
import { RoomServiceService } from '../database/room-service/room-service.service';
import { RoomService } from '../database/room/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Service, RoomType, RoomService]),
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
    AdminService,
    UserService,
    ServicesService,
    RoomTypeService,
    RoomServiceService
  ]
})
export class AdminModule { }
