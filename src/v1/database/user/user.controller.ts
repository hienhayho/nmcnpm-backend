import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { UserService } from './user.service';
import { UserRegister } from './dto/user.register.dto';
import { UserLogin } from './dto/user.login.dto';

@Controller('v1/user')
@ApiTags('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async addNewUser(@Body() userInfo: UserRegister) {
        try {
            const result = await this.userService.addNewUser(userInfo)
            if (result) {
                return {
                    status: HttpStatus.CREATED,
                    error: 0,
                    message: "Created user successfully.",
                    data: result
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 1,
                message: "Internal Server Error.",
            }

        }
        catch (err) {
            console.log("user.controller.ts addNewUser: ", err.message)
            if (err.message == "bad request") {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    error: 1,
                    message: err.message,
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 1,
                message: err.message,
            }
        }
    }

    @Post("login")
    async login(@Res({ passthrough: true }) response: Response, @Body() userInfo: UserLogin) {
        try {
            const access_token = await this.userService.login(userInfo)
            if (access_token) {
                response.cookie("access_token", access_token)
                return {
                    status: HttpStatus.OK,
                    error: 0,
                    authentication_token: access_token
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 1,
                message: "Internal Server Error.",
            }

        } catch (err) {
            console.log(err.message)
            if (err.message == "invalid authentication credentials") {
                return {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 1,
                    message: err.message,
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 1,
                message: "Internal Server Error.",
            }
        }
    }
}

