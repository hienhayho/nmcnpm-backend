import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './v1/database/user/user.module';
import { RoleModule } from './v1/database/role/role.module';
import { AppLoggerMiddleware } from './middleware/request.logging';
import { AuthModule } from './v1/auth/auth.module';
import { RoomTypeModule } from './v1/database/room_type/room_type.module';
import { ServicesModule } from './v1/database/services/services.module';
import { AdminModule } from './v1/admin/admin.module';
import { RoomDetailModule } from './v1/database/room_detail/room_detail.module';
import { RoomModule } from './v1/database/room/room.module';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

const staticOption :ServeStaticModuleOptions[] = [
  {
    rootPath: join(__dirname, '../', 'images'),
    serveRoot: "/static"
  },
  {
    rootPath: join(__dirname, '../', 'default'),
    serveRoot: "/default"
  }
]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ServeStaticModule.forRoot(...staticOption),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    AdminModule,
    AuthModule,
    UserModule,
    RoleModule,
    ServicesModule,
    RoomTypeModule,
    RoomModule,
    RoomDetailModule,
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

