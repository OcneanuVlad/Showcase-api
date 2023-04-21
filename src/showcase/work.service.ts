import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Work } from 'src/typeorm/entities/Work.model';
import { CreateWorkDto } from './dtos/CreateWork.dto';

@Injectable()
export class WorkService {
    constructor(@InjectRepository(Work) private workRepository: Repository<Work>) {}

    createWork(workDetails: CreateWorkDto) {
        const newWork = this.workRepository.create({...workDetails});
        return this.workRepository.save(newWork);
    }
    
    displayWork() {

    }
}
