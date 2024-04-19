import { Module } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { RoomTypeController } from './room_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Service } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';
import { ServicesController } from '../services/services.controller';
import { RoomService } from '../room-service/entities/room-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType,Service,RoomService])],
  controllers: [RoomTypeController,ServicesController],
  providers: [RoomTypeService,ServicesService]
})
export class RoomTypeModule { }
