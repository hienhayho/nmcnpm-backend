import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1/role')
@ApiTags('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  getAllRole() {
    const allData = this.roleService.getAllRole();
    console.log(allData)
    return this.roleService.getAllRole();
  }

  @Post()
  createRole(@Body() roleData: CreateRoleDto) {
    return this.roleService.createRole(roleData);
  }

}
