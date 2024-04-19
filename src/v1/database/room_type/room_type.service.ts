import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>
  ) { }

  
}
