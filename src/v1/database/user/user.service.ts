import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Role) private readonly roleService: Repository<Role>
  ) { }

}


