import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleController } from '../role/role.controller';
import { RoleService } from '../role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService]
})
export class UserModule { }
