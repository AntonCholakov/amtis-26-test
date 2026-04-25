import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Мартин Петров', description: 'Име на автора' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Чудесна инициатива!',
    description: 'Мнение на автора',
  })
  @IsString()
  @IsNotEmpty()
  opinion: string;
}
