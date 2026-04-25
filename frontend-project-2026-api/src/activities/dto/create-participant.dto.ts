import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Иван Иванов', description: 'Три имена на участника' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'ivan.ivanov@email.com', description: 'Имейл адрес' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '0888 123 456', description: 'Телефон за връзка' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
