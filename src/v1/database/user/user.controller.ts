import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from "express";
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegister } from './dto/user.register.dto';
import { UserLogin } from './dto/user.login.dto';

@Controller('v1/user')
@ApiTags('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async addNewUser(@Body() userInfo: UserRegister) {
        try {
            const result =  await this.userService.addNewUser(userInfo)
            if (result) {
                return {
                    status: HttpStatus.CREATED,
                    message: "Created user successfully.",
                    data: result
                }
            } 
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error.",
            }
            
        }
        catch (err) {
            console.log("user.controller.ts addNewUser: ",err.message)
            if (err.message == "bad request"){
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: err.message,
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            }
        }        
    }

    @Post("login")
    async login(@Res({ passthrough: true }) response: Response,@Body() userInfo: UserLogin) {
        try {
            const access_token = await this.userService.login(userInfo)
            if (access_token) {
                response.cookie("access_token", access_token)
                return {
                    status: HttpStatus.OK,
                    authentication_token: access_token
                }
            } 
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error.",
            }
            
        } catch (err) {
            console.log(err.message)
            if (err.message == "invalid authentication credentials"){
                return {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: err.message,
                }
            }
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error.",
            }
        }
    }
}

