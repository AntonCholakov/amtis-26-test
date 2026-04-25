import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileStorageService } from '../common/file-storage/file-storage.service';
import {
  Activity,
  ActivityComment,
  ActivityParticipant,
  ActivityDonation,
} from './activity.type';
import { ActivityResponseDto } from './dto/activity-response.dto';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ActivitiesService {
  private readonly fileName = 'activities.json';
  private readonly commentsFileName = 'activity-comments.json';
  private readonly participantsFileName = 'activity-participants.json';
  private readonly donationsFileName = 'activity-donations.json';

  constructor(private readonly fileStorageService: FileStorageService) {}

  async findAll(): Promise<ActivityResponseDto[]> {
    const activities = await this.fileStorageService.readJsonFile<Activity[]>(
      this.fileName,
    );
    const participants = await this.fileStorageService.readJsonFile<
      ActivityParticipant[]
    >(this.participantsFileName);
    const donations = await this.fileStorageService.readJsonFile<
      ActivityDonation[]
    >(this.donationsFileName);
    const allComments = await this.fileStorageService.readJsonFile<
      ActivityComment[]
    >(this.commentsFileName);

    return activities.map((activity) =>
      this.mapActivityToResponse(
        activity,
        participants,
        donations,
        allComments,
      ),
    );
  }

  async findOne(id: number): Promise<ActivityResponseDto> {
    const activities = await this.fileStorageService.readJsonFile<Activity[]>(
      this.fileName,
    );
    const activity = activities.find((item) => item.id === id);

    if (!activity) {
      throw new NotFoundException(`Activity with id ${id} was not found`);
    }

    const participants = await this.fileStorageService.readJsonFile<
      ActivityParticipant[]
    >(this.participantsFileName);

    const allComments = await this.fileStorageService.readJsonFile<
      ActivityComment[]
    >(this.commentsFileName);

    const donations = await this.fileStorageService.readJsonFile<
      ActivityDonation[]
    >(this.donationsFileName);

    return this.mapActivityToResponse(
      activity,
      participants,
      donations,
      allComments,
      true,
    );
  }

  async donate(id: number, createDonationDto: CreateDonationDto): Promise<void> {
    const activities = await this.fileStorageService.readJsonFile<Activity[]>(
      this.fileName,
    );
    if (!activities.some((a) => a.id === id)) {
      throw new NotFoundException(`Activity with id ${id} was not found`);
    }

    const donations = await this.fileStorageService.readJsonFile<
      ActivityDonation[]
    >(this.donationsFileName);

    const newDonation: ActivityDonation = {
      id:
        donations.length > 0 ? Math.max(...donations.map((d) => d.id)) + 1 : 1,
      activityId: id,
      amount: createDonationDto.amount,
      createdAt: new Date().toISOString(),
    };

    donations.push(newDonation);
    await this.fileStorageService.writeJsonFile(
      this.donationsFileName,
      donations,
    );
  }

  async participate(
    id: number,
    createParticipantDto: CreateParticipantDto,
  ): Promise<void> {
    const activities = await this.fileStorageService.readJsonFile<Activity[]>(
      this.fileName,
    );
    const activity = activities.find((a) => a.id === id);

    if (!activity) {
      throw new NotFoundException(`Activity with id ${id} was not found`);
    }

    const participants = await this.fileStorageService.readJsonFile<
      ActivityParticipant[]
    >(this.participantsFileName);

    const currentParticipantsCount = participants.filter(
      (p) => p.activityId === id,
    ).length;

    if (currentParticipantsCount >= activity.maxParticipants) {
      throw new BadRequestException('Инициативата е запълнена');
    }

    const newParticipant: ActivityParticipant = {
      id:
        participants.length > 0
          ? Math.max(...participants.map((p) => p.id)) + 1
          : 1,
      activityId: id,
      ...createParticipantDto,
      createdAt: new Date().toISOString(),
    };

    participants.push(newParticipant);
    await this.fileStorageService.writeJsonFile(
      this.participantsFileName,
      participants,
    );
  }

  async addComment(
    id: number,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const activities = await this.fileStorageService.readJsonFile<Activity[]>(
      this.fileName,
    );
    if (!activities.some((a) => a.id === id)) {
      throw new NotFoundException(`Activity with id ${id} was not found`);
    }

    const comments = await this.fileStorageService.readJsonFile<
      ActivityComment[]
    >(this.commentsFileName);

    const newComment: ActivityComment = {
      id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      activityId: id,
      author: createCommentDto.name,
      text: createCommentDto.opinion,
      role: 'Гост',
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    await this.fileStorageService.writeJsonFile(
      this.commentsFileName,
      comments,
    );
  }

  async upvoteComment(activityId: number, commentId: number): Promise<void> {
    const comments = await this.fileStorageService.readJsonFile<
      ActivityComment[]
    >(this.commentsFileName);

    const comment = comments.find(
      (c) => c.id === commentId && c.activityId === activityId,
    );

    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} was not found for activity ${activityId}`,
      );
    }

    comment.upvotes = (comment.upvotes || 0) + 1;
    await this.fileStorageService.writeJsonFile(
      this.commentsFileName,
      comments,
    );
  }

  async removeUpvoteComment(activityId: number, commentId: number): Promise<void> {
    const comments = await this.fileStorageService.readJsonFile<
      ActivityComment[]
    >(this.commentsFileName);

    const comment = comments.find(
      (c) => c.id === commentId && c.activityId === activityId,
    );

    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} was not found for activity ${activityId}`,
      );
    }

    if (comment.upvotes > 0) {
      comment.upvotes -= 1;
    }
    
    await this.fileStorageService.writeJsonFile(
      this.commentsFileName,
      comments,
    );
  }

  private mapActivityToResponse(
    activity: Activity,
    participants: ActivityParticipant[],
    donations: ActivityDonation[],
    allComments: ActivityComment[],
    includeDetails = false,
  ): ActivityResponseDto {
    const activityParticipants = participants.filter(
      (p) => p.activityId === activity.id,
    );

    const activityDonations = donations.filter(
      (d) => d.activityId === activity.id,
    );

    const activityComments = allComments.filter(
      (c) => c.activityId === activity.id,
    );

    const donatedAmount = activityDonations.reduce(
      (sum, d) => sum + d.amount,
      0,
    );

    const response: ActivityResponseDto = {
      ...activity,
      participantsCount: activityParticipants.length,
      donatedAmount: donatedAmount,
      commentsCount: activityComments.length,
    };

    if (includeDetails) {
      response.participants = activityParticipants;
      response.comments = activityComments.map((c) => ({
        ...c,
        upvotes: c.upvotes || 0,
      }));
    }

    return response;
  }
}