import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigModule } from 'src/configs/dbconfig.module';
import { TypeOrmConfigService } from 'src/configs/typeorm-config.service';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    DBConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DBConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TypeOrmConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
