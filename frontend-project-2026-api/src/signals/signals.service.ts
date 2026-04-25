import { Injectable, NotFoundException } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage/file-storage.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';

type Signal = {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  status: string;
  location: string;
  createdAt: string;
  reporterName: string;
  reporterEmail: string;
};

type SignalCategory = {
  id: number;
  label: string;
  value: string;
};

type SignalResponse = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  createdAt: string;
  reporterName: string;
  reporterEmail: string;
};

@Injectable()
export class SignalsService {
  private readonly signalsFileName = 'signals.json';
  private readonly categoriesFileName = 'signal-categories.json';

  constructor(private readonly fileStorageService: FileStorageService) {}

  private async getSignals(): Promise<Signal[]> {
    return this.fileStorageService.readJsonFile<Signal[]>(this.signalsFileName);
  }

  private async getCategories(): Promise<SignalCategory[]> {
    return this.fileStorageService.readJsonFile<SignalCategory[]>(
      this.categoriesFileName,
    );
  }

  private mapSignalToResponse(
    signal: Signal,
    categories: SignalCategory[],
  ): SignalResponse {
    const matchedCategory = categories.find(
      (category) => category.id === signal.categoryId,
    );

    return {
      id: signal.id,
      title: signal.title,
      description: signal.description,
      category: matchedCategory?.label ?? '',
      status: signal.status,
      location: signal.location,
      createdAt: signal.createdAt,
      reporterName: signal.reporterName,
      reporterEmail: signal.reporterEmail,
    };
  }

  async findAll(): Promise<SignalResponse[]> {
    const signals = await this.getSignals();
    const categories = await this.getCategories();

    return signals.map((signal) =>
      this.mapSignalToResponse(signal, categories),
    );
  }

  async findOne(id: number): Promise<SignalResponse> {
    const signals = await this.getSignals();
    const signal = signals.find((item) => item.id === id);

    if (!signal) {
      throw new NotFoundException(`Signal with id ${id} was not found`);
    }

    const categories = await this.getCategories();

    return this.mapSignalToResponse(signal, categories);
  }

  async create(createSignalDto: CreateSignalDto): Promise<SignalResponse> {
    const signals = await this.getSignals();

    const newSignal: Signal = {
      id: signals.length > 0 ? Math.max(...signals.map((s) => s.id)) + 1 : 1,
      status: 'Отворен',
      createdAt: new Date().toISOString(),
      ...createSignalDto,
    };

    signals.push(newSignal);
    await this.fileStorageService.writeJsonFile(this.signalsFileName, signals);

    const categories = await this.getCategories();

    return this.mapSignalToResponse(newSignal, categories);
  }

  async update(
    id: number,
    updateSignalDto: UpdateSignalDto,
  ): Promise<SignalResponse> {
    const signals = await this.getSignals();
    const index = signals.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Signal with id ${id} was not found`);
    }

    const updatedSignal: Signal = {
      ...signals[index],
      ...updateSignalDto,
    };

    signals[index] = updatedSignal;
    await this.fileStorageService.writeJsonFile(this.signalsFileName, signals);

    const categories = await this.getCategories();

    return this.mapSignalToResponse(updatedSignal, categories);
  }

  async remove(id: number): Promise<void> {
    const signals = await this.getSignals();
    const exists = signals.some((item) => item.id === id);

    if (!exists) {
      throw new NotFoundException(`Signal with id ${id} was not found`);
    }

    const filteredSignals = signals.filter((item) => item.id !== id);
    await this.fileStorageService.writeJsonFile(
      this.signalsFileName,
      filteredSignals,
    );
  }
}