import { ApiProperty } from '@nestjs/swagger';

export class AppStatsDto {
  @ApiProperty({ example: 105, description: 'Общ брой участници' })
  totalParticipants: number;

  @ApiProperty({ example: 34, description: 'Реализирани инициативи' })
  realizedInitiatives: number;

  @ApiProperty({ example: 21, description: 'Решени сигнали' })
  resolvedSignals: number;
}
