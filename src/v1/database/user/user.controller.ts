import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from "express";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddNewUserDto } from './dto/user.addNewUser.dto';
import { UserUpdate } from './dto/user.update.dto';

@Controller('v1/user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: "Get all users from database." })
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

    @ApiOperation({ summary: "Get user by condition, only allows userName, email, Id." })
    @Get("get-user-by-condition")
    async getUserByCondition(@Query("condition") condition: string, @Query("value") value: string) {
        try {
            const allUser = await this.userService.getUserByCondition(condition, value);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get users by condition successfully !",
                data: allUser
            }
        } catch (err) {
            console.error("user.controller.ts getUserByCondition: ", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

    @ApiOperation({ summary: "Add new user with user Id." })
    @Post("add-new-user-by-roleId/:roleId")
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
                message: err.response.message || err.message
            }
        }
    }

    @ApiOperation({ summary: "Update user with cookies authentication and user info." })
    @Patch("")
    async updateUser(@Body() userUpdateInfo: UserUpdate, @Req() request: Request) {
        const cookies = request.cookies
        try {
            const result = await this.userService.updateUserById(userUpdateInfo, cookies)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Update user successfully.",
                data: result
            }
        } catch (err) {
            console.error("user.controller.ts updateUser: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

    @ApiOperation({ summary: "Delete user by condition, only allow: userName, email, id." })
    @Delete('delete-user-by-condition')
    async deleteUser(@Query("condition") condition: string, @Query("value") value: string, @Req() request: Request) {
        const cookies = request.cookies;
        try {
            const result = await this.userService.deleteUser(cookies, condition, value)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Delete user successfully",
                data: result
            }
        } catch (err) {
            console.error("user.controller.ts deleteUser: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }
}