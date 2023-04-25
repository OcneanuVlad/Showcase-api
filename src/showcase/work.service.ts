import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { resolve } from 'path';

import { Work } from 'src/typeorm/entities/Work.model';
import { CreateWorkDto } from './dtos/CreateWork.dto';
import { UpdateWorkDto } from './dtos/UpdateWork.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private workRepository: Repository<Work>,
  ) {}

  createWork(title: string, link: string, file: string) {
    const newWork = this.workRepository.create({
      title: title,
      link: link,
      file: file,
    });
    return this.workRepository.save(newWork);
  }

  displayWork() {
    return this.workRepository.find({
      select: ['id', 'title', 'link', 'hidden', 'file'],
    });
  }

  async updateWork(id: number, title: string, link: string, file: string) {
    const result = await this.workRepository.update(
      { id },
      {
        title: title,
        link: link,
        file: file,
      },
    );
    return result;
  }

  async deleteWork(id: number) {
    const work = await this.workRepository.findOne({ where: { id } });
    this.deleteFile(work);
    return this.workRepository.delete({ id });
  }

  async deleteImage(id: number, filePath: string) {
    const work = await this.workRepository.findOne({ where: { id } });
    if (filePath) {
      this.deleteFile(work);
    }
    resolve();
  }

  deleteFile(el: Work) {
    fs.unlink(el.file, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File deleted successfully');
    });
  }
}
