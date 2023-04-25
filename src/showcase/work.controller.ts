import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname, join } from 'path';

import { WorkService } from './work.service';
import { CreateWorkDto } from './dtos/CreateWork.dto';
import { UpdateWorkDto } from './dtos/UpdateWork.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addWork(
    @Body() createWorkData: CreateWorkDto,
    @UploadedFile() file: any,
    @Res() res: any,
  ) {
    const { title, link } = createWorkData;
    const filePath = file.path;

    await this.workService.createWork(title, link, filePath);

    return res.redirect('http://localhost:3001/');
  }

  @Get()
  getWork(): any {
    return this.workService.displayWork();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateWork(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkData: UpdateWorkDto,
    @UploadedFile() file: any,
    @Res() res: Response,
  ) {
    try {
      const { title, link, hidden } = updateWorkData;
      if (file) {
        var filePath: string = file.path;
      }
      await this.workService.deleteImage(id, filePath);
      const updatedWork = await this.workService.updateWork(
        id,
        title,
        link,
        hidden,
        filePath,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Work updated successfully',
        data: updatedWork,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update work',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async deleteWork(@Param('id', ParseIntPipe) id: number) {
    await this.workService.deleteWork(id);
  }

  @Get(':path')
  async serveFile(@Param('path') path: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', 'uploads', path);
    return res.sendFile(filePath);
  }
}
