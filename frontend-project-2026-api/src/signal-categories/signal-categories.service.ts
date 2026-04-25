import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage/file-storage.service';

export type SignalCategory = {
  id: number;
  label: string;
  value: string;
};

@Injectable()
export class SignalCategoriesService {
  private readonly fileName = 'signal-categories.json';

  constructor(private readonly fileStorageService: FileStorageService) {}

  async findAll(): Promise<SignalCategory[]> {
    return this.fileStorageService.readJsonFile<SignalCategory[]>(this.fileName);
  }
}