import { Controller, Get, Post, Body, HttpStatus, Patch, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRole } from './dto/update-role.dto';

@Controller('v1/role')
@ApiTags('role')
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
          message: "Get all roles successfully.",
          roles: roles[0]
        }
      }
    } catch (err) {
      console.error("role.controller.ts - getAllRole: ", err)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 1,
        message: err.message
      }
    }
  }

  @ApiOperation({ summary: "Create a new role." })
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
      console.error("role.controller.ts - createRole: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message
      }
    }
  }

  @ApiOperation({ summary: "Update a role by Id." })
  @Patch()
  async updateRole(@Body() roleData: UpdateRole) {
    try {
      const role = await this.roleService.updateRole(roleData);
      if (role) {
        return {
          status: HttpStatus.OK,
          error: 0,
          message: "Update a role successfully.",
          role: role,
        }
      }
    } catch (err) {
      console.error("role.controller.ts - updateRole: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message
      }
    }
  }

  @ApiOperation({ summary: "Delete a role by Id." })
  @Delete(":id")
  async deleteRole(@Param("id") roleId: number) {
    try {
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
      console.error("role.controller.ts - deleteRole: ", err)
      return {
        status: err.status,
        error: 1,
        message: err.response.message
      }
    }
  }
}
