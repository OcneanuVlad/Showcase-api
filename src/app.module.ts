import { Module } from '@nestjs/common';
import { WorkModule } from './showcase/work.module';

@Module({
  imports: [WorkModule],
})
export class AppModule {}
