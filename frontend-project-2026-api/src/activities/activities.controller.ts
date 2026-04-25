import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { ActivityResponseDto } from './dto/activity-response.dto';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all activities',
    type: [ActivityResponseDto],
  })
  findAll(): Promise<ActivityResponseDto[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get activity by id',
    type: ActivityResponseDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ActivityResponseDto> {
    return this.activitiesService.findOne(id);
  }

  @Post(':id/donate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Donate to activity' })
  donate(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDonationDto: CreateDonationDto,
  ) {
    return this.activitiesService.donate(id, createDonationDto);
  }

  @Post(':id/participate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Take part in activity' })
  participate(
    @Param('id', ParseIntPipe) id: number,
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    return this.activitiesService.participate(id, createParticipantDto);
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Add comment to activity' })
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.activitiesService.addComment(id, createCommentDto);
  }

  @Post(':id/comments/:commentId/upvote')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Upvote a comment' })
  upvoteComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.activitiesService.upvoteComment(id, commentId);
  }

  @Post(':id/comments/:commentId/remove-upvote')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Remove upvote from a comment' })
  removeUpvoteComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.activitiesService.removeUpvoteComment(id, commentId);
  }
}