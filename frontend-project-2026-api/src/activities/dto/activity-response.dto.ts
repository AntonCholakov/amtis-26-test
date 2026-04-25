import { ApiProperty } from '@nestjs/swagger';

export class ActivityCommentDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  activityId: number;

  @ApiProperty({ example: 'Иван Иванов' })
  author: string;

  @ApiProperty({ example: 'Гост' })
  role: string;

  @ApiProperty({ example: 'Много добра инициатива!' })
  text: string;

  @ApiProperty({ example: '2026-04-12T10:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: 5 })
  upvotes: number;
}

export class ActivityParticipantDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  activityId: number;

  @ApiProperty({ example: 'Мария Петрова' })
  fullName: string;

  @ApiProperty({ example: 'maria@example.com' })
  email: string;

  @ApiProperty({ example: '0888123456' })
  phone: string;

  @ApiProperty({ example: '2026-04-12T11:00:00Z' })
  createdAt: string;
}

export class ActivityResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Почистване на парка' })
  title: string;

  @ApiProperty({ example: 'Кратко описание' })
  shortDescription: string;

  @ApiProperty({ example: 'Отворен' })
  status: string;

  @ApiProperty({ example: 'Доброволчество' })
  type: string;

  @ApiProperty({ example: 'Екология' })
  category: string;

  @ApiProperty({ example: 'Градска среда' })
  subcategory: string;

  @ApiProperty({ example: '2026-04-12' })
  date: string;

  @ApiProperty({ example: '10:00' })
  startTime: string;

  @ApiProperty({ example: '14:00' })
  endTime: string;

  @ApiProperty()
  location: {
    name: string;
    district: string;
    city: string;
    fullAddress: string;
  };

  @ApiProperty()
  organizer: {
    name: string;
    partner: string;
  };

  @ApiProperty({ example: '/hero.jpg' })
  heroImage: string;

  @ApiProperty({ example: '/card.jpg' })
  cardImage: string;

  @ApiProperty({ example: ['Описание ред 1'] })
  longDescription: string[];

  @ApiProperty({ example: ['Акцент 1'] })
  highlights: string[];

  @ApiProperty({ example: 50 })
  maxParticipants: number;

  @ApiProperty({ example: 5 })
  participantsCount: number;

  @ApiProperty({ example: 12, description: 'Общ брой коментари' })
  commentsCount: number;

  @ApiProperty({ example: 60 })
  donatedAmount: number;

  @ApiProperty({ 
    type: [ActivityCommentDto], 
    required: false,
    description: 'Списък с коментари (само при детайлен изглед)'
  })
  comments?: ActivityCommentDto[];

  @ApiProperty({ 
    type: [ActivityParticipantDto], 
    required: false,
    description: 'Списък с участници (само при детайлен изглед)'
  })
  participants?: ActivityParticipantDto[];
}
