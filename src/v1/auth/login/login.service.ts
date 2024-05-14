import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/v1/database/user/entities/user.entity';
import { UserLogin } from '@/v1/auth/dto/user.login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User) private readonly userService: Repository<User>,
        private jwtService: JwtService
    ) { }

    async login(userInfo: UserLogin) {
        const userName = userInfo.userName
        const user = await this.userService.find({
            where: {userName: userName},
            relations: {
                role: true
            }
        })
        if (user.length === 0) {
            throw new Error("invalid authentication credentials")
        }
        const isMatch = await bcrypt.compare(userInfo.password, user[0].password)
        if (!isMatch) {
            throw new Error("invalid authentication credentials")
        }

        const userId = String(user[0].id)
        const payload = { id: userId };
        return {
          access_token: await this.jwtService.signAsync(payload),
          roleId: user[0].role.id
        };
    }
}
