import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBConfigService } from 'src/configs/dbconfig.service';

@Module({
  imports: [ConfigModule],
  providers: [DBConfigService],
  exports: [DBConfigService],
})
export class DBConfigModule {}
