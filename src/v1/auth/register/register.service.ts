import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Role } from '@/v1/database/role/entities/role.entity';
import { User } from '@/v1/database/user/entities/user.entity';
import { UserRegister } from '@/v1/auth/dto/user.register.dto';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User) private readonly userService: Repository<User>,
        @InjectRepository(Role) private readonly roleService: Repository<Role>
    ) { }

    async register(userInfo: UserRegister) {
        const roleId = userInfo.roleId;
        const role = await this.roleService.findBy({
            id: roleId,
        });

        if (role.length == 0) {
            throw new Error("bad request")
        }

        const password = userInfo.password;

        const saltOrRounds = parseInt(process.env.SALT)
        const hashPassword = await bcrypt.hash(password, saltOrRounds);


        const user = {
            ...userInfo,
            password: hashPassword,
            role: role[0]
        }

        return this.userService.save(user)
    }
}
