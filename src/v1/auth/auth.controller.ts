import { Body, Controller, Global, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { UserLogin } from "./dto/user.login.dto";
import { UserRegister } from "./dto/user.register.dto";
import { ConfigService } from "@nestjs/config";
import ms = require('ms')

@Controller('v1/auth')
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly registerService: RegisterService,
        private readonly configService: ConfigService
    ) { }

    @ApiOperation({ summary: "User login." })
    @Post("login")
    async login(@Res({ passthrough: true }) response: Response, @Body() userInfo: UserLogin) {
        try {
            const { access_token, roleId } = await this.loginService.login(userInfo)
            if (access_token) {
                const expires = new Date();
                expires.setMilliseconds(
                    expires.getMilliseconds() + ms(this.configService.getOrThrow<string>("EXPIRE_IN"))
                )
                response.cookie("access_token", access_token, {
                    secure: true,
                    httpOnly: true,
                    expires
                })
                response.cookie("role_id", roleId, {
                    secure: true,
                    httpOnly: true,
                    expires
                })
                return {
                    status: HttpStatus.OK,
                    error: 0,
                    access_token: access_token,
                    role_id: roleId
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
            console.error("auth.controller.ts - register: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message,
            }
        }
    }

}