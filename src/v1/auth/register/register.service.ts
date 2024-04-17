import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/v1/database/role/entities/role.entity';
import { User } from 'src/v1/database/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegister } from '../dto/user.register.dto';

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
