import { Module } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { RoomTypeController } from './room_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService]
})
export class RoomTypeModule { }
