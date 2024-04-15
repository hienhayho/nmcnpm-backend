import { Module } from '@nestjs/common';
import { RoomDetailService } from './room_detail.service';
import { RoomDetailController } from './room_detail.controller';

@Module({
  controllers: [RoomDetailController],
  providers: [RoomDetailService]
})
export class RoomDetailModule {}
