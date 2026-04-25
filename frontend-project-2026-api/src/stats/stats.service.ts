import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage/file-storage.service';
import { AppStatsDto } from './dto/app-stats.dto';

@Injectable()
export class StatsService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async getStats(): Promise<AppStatsDto> {
    const participants = await this.fileStorageService.readJsonFile<any[]>(
      'activity-participants.json',
    );
    const activities = await this.fileStorageService.readJsonFile<any[]>(
      'activities.json',
    );
    const signals = await this.fileStorageService.readJsonFile<any[]>(
      'signals.json',
    );

    // Count unique participants by email
    const uniqueParticipantEmails = new Set(
      participants.map((p) => p.email).filter((email) => !!email),
    );

    return {
      totalParticipants: 100 + uniqueParticipantEmails.size,
      realizedInitiatives: 30 + (activities?.length || 0),
      resolvedSignals:
        20 + (signals?.filter((s) => s.status === 'Решен').length || 0),
    };
  }
}
