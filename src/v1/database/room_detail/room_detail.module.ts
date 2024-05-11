import { Module } from '@nestjs/common';
import { RoomDetailService } from './room_detail.service';
import { RoomDetailController } from './room_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDetail } from './entities/room_detail.entity';
import { RoomService } from '../room-service/entities/room-service.entity';
import { ServicesService } from '../services/services.service';
import { ServicesController } from '../services/services.controller';
import { Service } from '../services/entities/service.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomDetail,Service,User, Role]),
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
  controllers: [RoomDetailController,ServicesController],
  providers: [RoomDetailService,ServicesService,UserService]
})
export class RoomDetailModule {}
