import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSignalDto {
  @ApiProperty({ example: 'Счупена лампа на улицата' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({ example: 'София, Младост' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Уличната лампа не работи от няколко дни.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Иван Иванов' })
  @IsString()
  @IsNotEmpty()
  reporterName: string;

  @ApiProperty({ example: 'ivan@email.com' })
  @IsEmail()
  reporterEmail: string;
}