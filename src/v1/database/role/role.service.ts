import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
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
    return roleDetail;
  }

  async createRole(roleData: CreateRoleDto) {
    const roleDetail = await this.roleService.create(roleData);
    this.roleService.save(roleDetail);
    if (!roleDetail) throw new BadRequestException({ error: "Role Not Created" });
    return roleDetail;
  }

  async updateRole(roleData: CreateRoleDto) {
    const roleId = roleData.id;
    const roleDetail = await this.roleService.findOne({where: { id: roleId }});
    if (!roleDetail) throw new BadRequestException({ error: "Role Not Found" });
    return await this.roleService.save(roleData);
  }

  async deleteRole(roleId: number) {
    const roleDetail = await this.roleService.findOne({where: { id: roleId }});
    if (!roleDetail) throw new BadRequestException({ error: "Role Not Found" });
    return await this.roleService.delete(roleId);
  }
}
