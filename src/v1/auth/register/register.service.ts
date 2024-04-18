import { BadRequestException, Injectable } from '@nestjs/common';
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
        const roleId = 4; //Check if user role id exist in database
        const role = await this.roleService.findBy({
            id: roleId,
        });

        if (role.length == 0) {
            throw new BadRequestException({message: "Rold Id not exist in database."}) 
        }
        
        const userName = userInfo.userName
        const users = await this.userService.findOne({where: {userName: userName}})
        if (users) {
            throw new BadRequestException({
                message: `userName = ${userName} has already existed in database.`
            })
        }

        const email = userInfo.email
        const emails = await this.userService.findOne({where: {email: email}})
        if (emails) {
            throw new BadRequestException({
                message: `email = ${email} has already existed in database.`
            })
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
