import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRegister } from './dto/user.register.dto';
import { Role } from '../role/entities/role.entity';
import { UserLogin } from './dto/user.login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Role) private readonly roleService: Repository<Role>
  ) { }

  async addNewUser(userInfo: UserRegister) {
    const roleId = userInfo.roleId;
    const role = await this.roleService.findBy({
      id: roleId,
    });

    if (role.length == 0){
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

  async login(userInfo: UserLogin){
    const userName = userInfo.userName
    const user = await this.userService.findBy({
      userName:userName,
    })
    if (user.length === 0){
      throw new Error("invalid authentication credentials")
    }
    const isMatch = await bcrypt.compare(userInfo.password,user[0].password)
    if (!isMatch){
      throw new Error("invalid authentication credentials")
    }

    const userId = String(user[0].id)
    const saltOrRounds = parseInt(process.env.SALT)
    const access_token = await bcrypt.hash(userId,saltOrRounds)
    return access_token
  }
}


