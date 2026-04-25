import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileStorageModule } from './common/file-storage/file-storage.module';
import { SignalsModule } from './signals/signals.module';
import { SignalCategoriesModule } from './signal-categories/signal-categories.module';
import { ActivitiesModule } from './activities/activities.module';
import { StatsModule } from './stats/stats.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    FileStorageModule,
    SignalsModule,
    SignalCategoriesModule,
    ActivitiesModule,
    StatsModule,
    NewsletterModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
