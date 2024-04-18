import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { UserLogin } from "./dto/user.login.dto";
import { UserRegister } from "./dto/user.register.dto";

@Controller('v1/auth')
@ApiTags("v1/auth")
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly registerService: RegisterService
    ) { }

    @ApiOperation({ summary: "User login." })
    @Post("login")
    async login(@Res({ passthrough: true }) response: Response, @Body() userInfo: UserLogin) {
        try {
            const access_token = await this.loginService.login(userInfo)
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
            console.log("auth.controller.ts - login: ", err)
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

    @ApiOperation({ summary: "User register." })
    @Post("register")
    async register(@Body() userRegister: UserRegister) {
        try {
            const result = await this.registerService.register(userRegister)
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
            console.log("auth.controller.ts - register: ", err)
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

}