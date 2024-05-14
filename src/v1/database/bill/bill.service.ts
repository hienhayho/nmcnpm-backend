import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private readonly billService: Repository<Bill>
  ) {} 
    
  async getAllBills() {
    return await this.billService.find({
      relations: {
        user: true
      }
    })
  }
}
