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
  ) { }

  async getAllRole() {
    const roleDetail = await this.roleService.findAndCount()
    if (!roleDetail) throw new BadRequestException({ error: "Data Not Found" });
    return {
      status: HttpStatus.OK,
      data: roleDetail
    }
  }

  async createRole(roleData: CreateRoleDto) {
    const roleDetail = await this.roleService.create(roleData);
    this.roleService.save(roleDetail);
    if (!roleDetail) throw new BadRequestException({ error: "Role Not Created" });
    return {
      status: HttpStatus.OK,
      message: "Role Created Successfully",
      data: roleDetail
    }
  }
}
