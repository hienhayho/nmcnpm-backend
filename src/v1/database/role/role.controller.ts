import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('v1/role')
@ApiTags('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  async getAllRole() {
    try {
      const roles = await this.roleService.getAllRole();
      if (roles) {
        return {
          status: HttpStatus.OK,
          error: 0,
          message: "Get all roles successfully",
          roles: roles[0]
        }
      }
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }

  @Post()
  async createRole(@Body() roleData: CreateRoleDto) {
    try {
      const role = await this.roleService.createRole(roleData);
      if (role) {
        return {
          status: HttpStatus.CREATED,
          error: 0,
          message: "Create a role successfully",
          role: role,
        }
      }
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }
}
