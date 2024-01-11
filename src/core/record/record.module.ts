import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';
import { RecordRepository } from 'src/core/record/repositories/record.repository';

@Module({
  providers: [RecordRepository, RecordService, RecordResolver],
})
export class RecordModule {}
