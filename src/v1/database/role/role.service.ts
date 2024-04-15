import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleService: Repository<Role>
  ){}

  getAllRole() {
    const roleDetail = this.roleService.findAndCount()
    if(!roleDetail) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      result : roleDetail
    }
  }
}
