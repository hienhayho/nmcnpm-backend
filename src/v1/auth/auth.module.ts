import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { LoginService } from "./login/login.service";
import { RegisterService } from "./register/register.service";
import { Role } from "@/v1/database/role/entities/role.entity";
import { User } from "@/v1/database/user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get("JWT_KEY"),
                signOptions: { expiresIn: '300s' },
            })
        })
    ],
    controllers: [AuthController],
    providers: [LoginService, RegisterService, ConfigService]
})
export class AuthModule { }