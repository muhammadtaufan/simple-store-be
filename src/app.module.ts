import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigModule } from 'configs/dbconfig.module';
import { TypeOrmConfigService } from 'configs/typeorm-config.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {}
