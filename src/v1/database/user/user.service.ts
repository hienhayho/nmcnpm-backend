import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { UserBackendDto } from './dto/user.backend.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Role) private readonly roleService: Repository<Role>
  ) { }

    async getAllUser(){
      try {
        const allUser = this.userService.findAndCount()
        return allUser
      } catch(err) {
        console.error("user.sevice.ts getAllUser: ", err.message)
        throw new InternalServerErrorException({message: "Something went wrong! Please try again later."})
      }
    }

    async addNewUser(userData: UserBackendDto) {
      const roldId = userData.roleId;
      const role = await this.roleService.findOne({where: {id: roldId}})
      
      const password = userData.password;
      if (password.length < 8) {
        throw new BadRequestException({message: "Password must contains at least 8 characters."})
      }

      if (!role) {
        throw new BadRequestException({mesage: "Role Id not exist in database."})
      }
      
      const userName = userData.userName;
      const user = await this.userService.findOne({where: {userName: userName}})
      if (user) {
        throw new BadRequestException({message: `userName = ${userName} has already exist in database.`})
      }

      const email = userData.email;
      const emails = await this.userService.findOne({where: {email: email}})
      if (emails) {
        throw new BadRequestException({message: `email = ${email} has already exist in database.`})
      }

      const salt = parseInt(process.env.SALT)
      const hashPassword = await bcrypt.hash(password, salt)
      
      delete userData["roleId"]
      userData.password = hashPassword
      const userBackendSave = {
        ... userData,
        role: role[0]
      }
      return await this.userService.save(userBackendSave)
    }
}


