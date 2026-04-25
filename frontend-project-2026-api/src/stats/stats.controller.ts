import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { AppStatsDto } from './dto/app-stats.dto';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get global application statistics',
    type: AppStatsDto,
  })
  getStats(): Promise<AppStatsDto> {
    return this.statsService.getStats();
  }
}
