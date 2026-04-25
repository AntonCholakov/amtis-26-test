import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({ example: 10, description: 'The amount to donate' })
  @IsNumber()
  @Min(1)
  amount: number;
}
