import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../database/user/entities/user.entity';
import { UserService } from '../database/user/user.service';
import { Role } from '../database/role/entities/role.entity';
import { Service } from '../database/services/entities/service.entity';
import { ServicesService } from '../database/services/services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Service]),
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
  controllers: [AdminController],
  providers: [AdminService, UserService, ServicesService]
})
export class AdminModule { }
