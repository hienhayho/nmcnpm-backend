import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeService } from './room_type.service';
import { ServicesService } from '../services/services.service';
import { RoomTypeController } from './room_type.controller';
import { ServicesController } from '../services/services.controller';
import { RoomType } from './entities/room_type.entity';
import { Service } from '../services/entities/service.entity';
import { RoomService } from '../room-service/entities/room-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Service, RoomService])],
  controllers: [RoomTypeController, ServicesController],
  providers: [RoomTypeService, ServicesService]
})
export class RoomTypeModule { }
