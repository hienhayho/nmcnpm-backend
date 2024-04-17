import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { LoginService } from "./login/login.service";
import { RegisterService } from "./register/register.service";
import { Role } from "@/v1/database/role/entities/role.entity";
import { User } from "@/v1/database/user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [AuthController],
    providers: [LoginService, RegisterService]
})
export class AuthModule { }