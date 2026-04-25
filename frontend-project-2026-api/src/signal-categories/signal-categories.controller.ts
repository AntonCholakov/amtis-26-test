import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignalCategoriesService } from './signal-categories.service';

@ApiTags('signal-categories')
@Controller('signal-categories')
export class SignalCategoriesController {
  constructor(
    private readonly signalCategoriesService: SignalCategoriesService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Get all signal categories' })
  findAll() {
    return this.signalCategoriesService.findAll();
  }
}