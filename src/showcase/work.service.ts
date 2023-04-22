import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Work } from 'src/typeorm/entities/Work.model';
import { CreateWorkDto } from './dtos/CreateWork.dto';
import { UpdateWorkDto } from './dtos/UpdateWork.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private workRepository: Repository<Work>,
  ) {}

  createWork(workDetails: CreateWorkDto) {
    const newWork = this.workRepository.create({ ...workDetails });
    return this.workRepository.save(newWork);
  }

  displayWork() {
    return this.workRepository.find({ select: ["id", "title", "link"] });
  }

  updateWork(id: number, workData: UpdateWorkDto) {
    return this.workRepository.update({ id }, { ...workData });
  }

  deleteWork(id: number) {
    return this.workRepository.delete({ id });
  }
}
