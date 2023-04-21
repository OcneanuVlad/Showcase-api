import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { WorkService } from './work.service';
import { CreateWorkDto } from './dtos/CreateWork.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  addWork(@Body() createWorkDto: CreateWorkDto): any {
    this.workService.createWork(createWorkDto);
  }
}
