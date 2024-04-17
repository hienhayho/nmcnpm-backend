import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegister } from './dto/user.register.dto';

@Controller('v1/user')
@ApiTags('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    addNewUser(@Body() userInfo: UserRegister) {
        return this.userService.addNewUser(userInfo)
    }
}
