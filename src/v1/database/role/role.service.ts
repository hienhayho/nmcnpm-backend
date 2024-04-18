import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { UpdateRole } from './dto/update-role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleService: Repository<Role>
  ) { }

  async getAllRole() {
    const roleDetail = await this.roleService.findAndCount()
    if (!roleDetail) throw new BadRequestException({ message : "Data Not Found" });
    return roleDetail;
  }

  async createRole(roleData: CreateRoleDto) {
    const roleDetail = await this.roleService.create(roleData);
    const roleId = roleData.id;
    if (roleId < 1 || roleId > 4){
      throw new BadRequestException({message: "RoleId must be from 1 to 4!"})
    }
    this.roleService.save(roleDetail);
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Created" });
    return roleDetail;
  }

  async updateRole(roleData: UpdateRole ) {
    const roleId = roleData.id;
    const roleDetail = await this.roleService.findOne({where: { id: roleId }});
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Found" });
    return await this.roleService.save(roleData);
  }

  async deleteRole(roleId: number) {
    const roleDetail = await this.roleService.findOne({where: { id: roleId }});
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Found" });
    return await this.roleService.remove(roleDetail);
  }
}
