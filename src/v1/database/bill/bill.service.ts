import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private readonly billService: Repository<Bill>
  ) { }

  async getAllBills() {
    return await this.billService.find({
      select: {
        id: true,
        priceAll: true,
        paid: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          userName: true,
          fullName: true,
          phone: true,
        },
      },
      relations: {
        user: true,
        roomDetail: true
      }
    })
  }
}
