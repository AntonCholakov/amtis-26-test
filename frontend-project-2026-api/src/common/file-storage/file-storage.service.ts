import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileStorageService {
  private getFilePath(fileName: string): string {
    return path.join(process.cwd(), 'data', fileName);
  }

  async readJsonFile<T>(fileName: string): Promise<T> {
    const filePath = this.getFilePath(fileName);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  async writeJsonFile<T>(fileName: string, data: T): Promise<void> {
    const filePath = this.getFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}