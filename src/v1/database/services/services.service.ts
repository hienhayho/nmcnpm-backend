import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { AddNewServiceDto } from '@/v1/admin/dto/service.addNewService.dto';
import { UpdateServiceDto } from '@/v1/admin/dto/service.update.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private serviceServices: Repository<Service>
  ) { }

  async getAllServires() {
    const result = await this.serviceServices.find();
    return result;
  }

  async getServiceByNames(serviceNames: string[]) {
    const result = await this.serviceServices.find({
      where: { name: In(serviceNames) }
    })
    return result;
  }

  async addNewService(serviceData: AddNewServiceDto) {
    const serviceName = serviceData.name;
    const service = await this.serviceServices.findOne({
      where: { name: serviceName }
    })
    if (service) {
      throw new BadRequestException({ message: `Services with name=${serviceName} has already existed in database.` })
    }
    return await this.serviceServices.save(serviceData);
  }

  async deleteServiceById(serviceId: number) {
    const service = await this.serviceServices.findOne({
      where: { id: serviceId }
    })
    if (!service) {
      return new BadRequestException({ message: `No service with id=${serviceId} found in db` });
    }
    return await this.serviceServices.remove(service)
  }

  async updateServiceById(serviceData: UpdateServiceDto) {
    const { serviceId, name, price } = serviceData;
    const service = await this.serviceServices
      .createQueryBuilder()
      .update(Service)
      .set({ name: name, price: price })
      .where("id = :id", { id: serviceId })
      .execute()
    return service
  }
}
