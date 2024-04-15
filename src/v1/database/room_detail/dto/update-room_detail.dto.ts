import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDetailDto } from './create-room_detail.dto';

export class UpdateRoomDetailDto extends PartialType(CreateRoomDetailDto) {}
