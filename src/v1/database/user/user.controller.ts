import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/middleware/authenticate';
import { Response, Request } from 'express'
import { createReadStream } from 'fs';
import { getImagesById, getImagesFolder } from '@/utils';
import { UserService } from './user.service';
import { UserUpdate } from './dto/user.update.dto';
import { diskStorage } from 'multer';
import { UpdateImageDto } from './dto/user.update.image.dto';
import { v4 as uuidv4} from "uuid"
const path = require('path')

@Controller('v1/user')
@ApiTags('user')
@UseGuards(new AuthGuard())
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: "Get all bills." })
    @Get("bills")
    async getAllBills(@Req() request: Request) {
        try {
            const cookies = request.cookies
            const allUser = await this.userService.getAllBills(cookies);
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get all bills successfully !",
                data: allUser
            }
        } catch (err) {
            console.error("user.controller.ts getAllBills: ", err.message);
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

    @ApiOperation({ summary: "Get current user info." })
    @Get()
    async getUserInfo(@Req() request: Request) {
        const cookies = request.cookies
        try {
            const userId = await this.userService.getUserIdFromCookies(cookies)
            const result = await this.userService.getUserByCondition("id", userId)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get current user successfully.",
                data: result
            }
        } catch (err) {
            console.error("user.controller.ts getUserInfo: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message
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

    @ApiOperation({ summary: "Upload avatar for user" })
    @Post('user_avatar/upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: getImagesFolder(),
            filename: (req,file,cb) => {
              const fileName: string = path.parse(file.originalname).name.replace(/\s/g,'') + uuidv4();
              const extension: string = path.parse(file.originalname).ext;
  
              cb(null,`${fileName}${extension}`)
            }
        })
    }))
    async uploadUserAvatar(@Body() data: UpdateImageDto, @UploadedFile() file: Express.Multer.File, @Req() request: Request) {
        const cookies = request.cookies;
        try {
            const result = await this.userService.uploadUserAvatar(file, cookies)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Upload user successfully",
            }
        } catch (err) {
            console.error("user.controller.ts uploadUserAvatar: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }

    @Get('user_avatar')
    async getUserAvatarById(
        @Req() request: Request
    ){
        const cookies = request.cookies;
        try {
            const imagePath = await this.userService.getUserAvatarById(cookies)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get user image successfully",
                result: imagePath,
            }
        } catch (err) {
            console.error("user.controller.ts getUserAvatarById: ", err)
            return {
                status: err.status,
                error: 1,
                message: err.response.message
            }
        }
    }
}