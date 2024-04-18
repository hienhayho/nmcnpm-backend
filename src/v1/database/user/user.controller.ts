import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddNewUserDto } from './dto/user.addNewUser.dto';
import { userInfo } from 'os';

@Controller('v1/user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({summary: "Get all users from database."})
    @Get()
    async getAllUser() {
        try {
            const allUser = await this.userService.getAllUser();
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get all users successfully !",
                data: allUser
            }
        } catch (err) {
            console.error("user.controller.ts getAllUser: ", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

    @ApiOperation({summary: "Add new user with user Id."})
    @Post()
    async addNewUser(@Param("roleId") roleId: number, @Body() userInfo: AddNewUserDto) {
        try {
            const userData = {
                ...userInfo,
                roleId: roleId
            }
            const result = await this.userService.addNewUser(userData)
            if (result) {
                return {
                    status: HttpStatus.CREATED,
                    error: 0,
                    message: "Add new user successfully.",
                    data: result
                }
            }
        } catch (err) {
            console.error("user.controller.ts addNewUser: ", err)
            return {
                status: err.status,
                error: 1, 
                message: err.response.message
            }
        }
    }
}