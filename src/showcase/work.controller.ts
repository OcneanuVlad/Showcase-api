import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { WorkService } from './work.service';
import { CreateWorkDto } from './dtos/CreateWork.dto';
import { UpdateWorkDto } from './dtos/UpdateWork.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  addWork(@Body() createWorkDto: CreateWorkDto): any {
    this.workService.createWork(createWorkDto);
  }

  @Get()
  getWork(): any {
    return this.workService.displayWork();
  }

  @Put(':id')
  async updateWork(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkData: UpdateWorkDto,
  ) {
    await this.workService.updateWork(id, updateWorkData);
  }

  @Delete(':id')
  async deleteWork(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.workService.deleteWork(id);
  }
}
