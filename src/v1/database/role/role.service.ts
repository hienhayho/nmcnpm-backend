import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/role.create.dto';
import { UpdateRole } from './dto/role.update.dto';
import { Role } from './entities/role.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleService: Repository<Role>
  ) { }

  async getAllRole() {
    const roleDetail = await this.roleService.findAndCount()
    if (!roleDetail) throw new BadRequestException({ message: "Data Not Found" });
    return roleDetail;
  }

  async getRoleById(roleId: number) {
    const role = await this.roleService.findOne({
      where: { id: roleId }
    })
    if (!role) {
      throw new BadRequestException({ message: `Role with id=${roleId} not exists in database.` })
    }
    return role;
  }

  async createRole(roleData: CreateRoleDto) {
    const roleDetail = await this.roleService.create(roleData);
    const roleId = roleData.id;
    if (roleId < 1 || roleId > 4) {
      throw new BadRequestException({ message: "RoleId must be from 1 to 4!" })
    }
    this.roleService.save(roleDetail);
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Created" });
    return roleDetail;
  }

  async updateRole(roleData: UpdateRole) {
    const roleId = roleData.id;
    const roleDetail = await this.roleService.findOne({ where: { id: roleId } });
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Found" });
    return await this.roleService.save(roleData);
  }

  async deleteRole(roleId: number) {
    const roleDetail = await this.roleService.findOne({ where: { id: roleId } });
    if (!roleDetail) throw new BadRequestException({ message: "Role Not Found" });
    return await this.roleService.remove(roleDetail);
  }
}
