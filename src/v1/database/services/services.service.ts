import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { In, Repository } from 'typeorm';
import { AddNewServiceDto } from './dto/service.addNewService.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private serviceServices: Repository<Service>
  ){}

  async getAllServires(){
    const result = await this.serviceServices.find();
    return result;
  }

  async getServiceByNames(serviceNames: string[]) {
    const result = await this.serviceServices.find({
      where: {name: In(serviceNames)}
    })
    return result;
  }

  async addNewService(serviceData: AddNewServiceDto) {
    const serviceName = serviceData.name;
    const service = await this.serviceServices.findOne({
      where: {name: serviceName}
    })
    if (service) {
      throw new BadRequestException({message: `Services with name=${serviceName} has already existed in database.`})
    }
    return await this.serviceServices.save(serviceData);
  }
}
