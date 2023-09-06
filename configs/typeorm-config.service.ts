// typeorm-config.service.ts
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DBConfigService } from 'configs/dbconfig.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private dbConfigService: DBConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.dbConfigService.dbHost,
      port: this.dbConfigService.dbPort,
      username: this.dbConfigService.dbUsername,
      password: this.dbConfigService.dbPassword,
      database: this.dbConfigService.dbName,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
    };
  }
}
