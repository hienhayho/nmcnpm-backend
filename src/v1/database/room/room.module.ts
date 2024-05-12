import { Module } from '@nestjs/common';
import { RoomServices } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeService } from '../room_type/room_type.service';
import { RoomType } from '../room_type/entities/room_type.entity';
import { RoomTypeController } from '../room_type/room_type.controller';
import { Room } from './entities/room.entity';
import { Service } from '../services/entities/service.entity';
import { ServicesController } from '../services/services.controller';
import { ServicesService } from '../services/services.service';
import { RoomDetail } from '../room_detail/entities/room_detail.entity';
import { RoomService } from '../room-service/entities/room-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RoomType, Service, RoomService, RoomDetail]),
  ],
  controllers: [RoomController, RoomTypeController, ServicesController],
  providers: [RoomServices, RoomTypeService, ServicesService]
})
export class RoomModule {}
