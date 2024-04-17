import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('v1/role')
@ApiTags('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  getAllRole() {
    return this.roleService.getAllRole();
  }

  @Post()
  createRole(@Body() roleData: CreateRoleDto) {
    return this.roleService.createRole(roleData);
  }
}
