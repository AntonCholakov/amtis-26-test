import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateSignalDto } from './create-signal.dto';

export class UpdateSignalDto extends PartialType(CreateSignalDto) {
  @ApiProperty({ example: 'in_progress', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
