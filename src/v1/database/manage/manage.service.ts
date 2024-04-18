import { Injectable } from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';

@Injectable()
export class ManageService {
  create(createManageDto: CreateManageDto) {
    return 'This action adds a new manage';
  }

  findAll() {
    return `This action returns all manage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manage`;
  }

  update(id: number, updateManageDto: UpdateManageDto) {
    return `This action updates a #${id} manage`;
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }
}
