import { Module } from '@nestjs/common';
import { FileStorageModule } from '../common/file-storage/file-storage.module';
import { SignalsController } from './signals.controller';
import { SignalsService } from './signals.service';

@Module({
  imports: [FileStorageModule],
  controllers: [SignalsController],
  providers: [SignalsService],
})
export class SignalsModule {}