import { Module } from '@nestjs/common';
import { FileStorageModule } from '../common/file-storage/file-storage.module';
import { SignalCategoriesController } from './signal-categories.controller';
import { SignalCategoriesService } from './signal-categories.service';

@Module({
  imports: [FileStorageModule],
  controllers: [SignalCategoriesController],
  providers: [SignalCategoriesService],
})
export class SignalCategoriesModule {}