import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { FileStorageModule } from '../common/file-storage/file-storage.module';

@Module({
  imports: [FileStorageModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
