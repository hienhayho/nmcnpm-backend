import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
@Controller('v1/user')
@ApiTags('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

}