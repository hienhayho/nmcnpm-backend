import { Module } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { RoomTypeController } from './room_type.controller';

@Module({
  controllers: [RoomTypeController],
  providers: [RoomTypeService]
})
export class RoomTypeModule {}
