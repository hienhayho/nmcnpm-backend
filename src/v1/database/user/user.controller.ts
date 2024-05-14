import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserUpdate } from './dto/user.update.dto';
import { AuthGuard } from '@/middleware/authenticate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateImageDto } from './dto/user.update.image.dto';
import { Response, Request } from 'express'
import { createReadStream } from 'fs';
import { getImagesById, getImagesFolder } from '@/utils';

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

    @ApiOperation({ summary: "Get all bills." })
    @Post("bills/:id")
    async payBill(@Req() request: Request, @Param("id") id: string) {
        try {
            const billId = parseInt(id)
            const cookies = request.cookies;
            const result = await this.userService.payBill(billId)
            return {
                status: HttpStatus.OK,
                error: 0,
                message: "Get all users successfully !",
                data: result
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
    @Get("get_user_by_condition")
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
            destination: getImagesFolder()
        })
    }))
    async uploadUserAvatar(@Body() data: UpdateImageDto, @UploadedFile() file: Express.Multer.File, @Req() request: Request) {
        const cookies = request.cookies;
        try {
            const result = await this.userService.uploadUserAvatar(file.filename, cookies)
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
        @Res({ passthrough: true }) res: Response,
        @Req() request: Request
    ): Promise<StreamableFile> {
        const cookies = request.cookies;
        try {
            const imageId = await this.userService.getUserAvatarById(cookies)
            res.set({ 'Content-Type': 'image/jpg' });
            const imageLocation = getImagesById(imageId)
            const file = createReadStream(imageLocation);
            return new StreamableFile(file);
        } catch (err) {
            console.error("user.controller.ts uploadUserAvatar: ", err)
        }
    }
}