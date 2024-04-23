import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomServiceDto } from './create-room-service.dto';

export class UpdateRoomServiceDto extends PartialType(CreateRoomServiceDto) {}
