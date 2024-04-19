import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RoleController } from '../role/role.controller';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get("JWT_KEY"),
        signOptions: { expiresIn: configService.get("EXPIRE_IN") },
      })
    })
  ],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService]
})
export class UserModule { }
