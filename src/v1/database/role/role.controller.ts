import { Controller, Get, Post, Body, HttpStatus, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Controller('v1/role')
@ApiTags('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({ summary: "Get all roles." })
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
      console.log("role.controller.ts - getAllRole: ", err)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }

  @ApiOperation({ summary: "Create a new user." })
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
      console.log("role.controller.ts - createRole: ", err)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }

  @ApiOperation({ summary: "Update a role by Id." })
  @Patch()
  async updateRole(@Body() roleData: CreateRoleDto) {
    try {
      const role = await this.roleService.updateRole(roleData);
      if (role) {
        return {
          status: HttpStatus.OK,
          error: 0,
          message: "Update a role successfully",
          role: role,
        }
      }
    } catch (err) {
      console.log("role.controller.ts - updateRole: ", err)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }

  @ApiOperation({ summary: "Delete a role." })
  @Delete()
  async deleteRole(@Body() roleData: DeleteRoleDto) {
    try {
      const roleId = roleData.id;
      const role = await this.roleService.deleteRole(roleId);
      if (role) {
        return {
          status: HttpStatus.OK,
          error: 0,
          message: "Delete a role successfully",
          role: role,
        }
      }
    } catch (err) {
      console.log("role.controller.ts - deleteRole: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.error
      }
    }
  }
}
