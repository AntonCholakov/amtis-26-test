import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { SignalsService } from './signals.service';

@ApiTags('signals')
@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all signals' })
  findAll() {
    return this.signalsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get signal by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.signalsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create signal' })
  create(@Body() createSignalDto: CreateSignalDto) {
    return this.signalsService.create(createSignalDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update signal' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSignalDto: UpdateSignalDto,
  ) {
    return this.signalsService.update(id, updateSignalDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete signal' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.signalsService.remove(id);
    return { message: `Signal ${id} deleted successfully` };
  }
}