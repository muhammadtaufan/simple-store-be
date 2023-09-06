import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBConfigService } from 'configs/dbconfig.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigModule } from 'configs/dbconfig.module';

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
      inject: [DBConfigService],
      useFactory: (dbConfigService: DBConfigService) => ({
        type: 'postgres',
        host: dbConfigService.dbHost,
        port: dbConfigService.dbPort,
        username: dbConfigService.dbUsername,
        password: dbConfigService.dbPassword,
        database: dbConfigService.dbName,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
