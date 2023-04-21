import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/typeorm/entities/Work.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql972.main-hosting.eu',
      port: 3306,
      username: 'u956818894_admin',
      password: 'RIc!UY&V2f',
      database: 'u956818894_showcase',
      entities: [Work],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Work]),
  ],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
