import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/v1/database/user/entities/user.entity';
import { UserLogin } from '@/v1/auth/dto/user.login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User) private readonly userService: Repository<User>,
    ) { }

    async login(userInfo: UserLogin) {
        const userName = userInfo.userName
        const user = await this.userService.findBy({
            userName: userName,
        })
        if (user.length === 0) {
            throw new Error("invalid authentication credentials")
        }
        const isMatch = await bcrypt.compare(userInfo.password, user[0].password)
        if (!isMatch) {
            throw new Error("invalid authentication credentials")
        }

        const userId = String(user[0].id)
        const saltOrRounds = parseInt(process.env.SALT)
        const access_token = await bcrypt.hash(userId, saltOrRounds)
        return access_token
    }
}
