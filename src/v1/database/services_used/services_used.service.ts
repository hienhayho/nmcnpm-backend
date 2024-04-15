import { Injectable } from '@nestjs/common';
import { CreateServicesUsedDto } from './dto/create-services_used.dto';
import { UpdateServicesUsedDto } from './dto/update-services_used.dto';

@Injectable()
export class ServicesUsedService {
  create(createServicesUsedDto: CreateServicesUsedDto) {
    return 'This action adds a new servicesUsed';
  }

  findAll() {
    return `This action returns all servicesUsed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicesUsed`;
  }

  update(id: number, updateServicesUsedDto: UpdateServicesUsedDto) {
    return `This action updates a #${id} servicesUsed`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicesUsed`;
  }
}
