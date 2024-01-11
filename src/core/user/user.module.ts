import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from 'src/core/user/user.resolver';
import { UserRecordsResolver } from 'src/core/user/user-record.resolver';
import { RecordRepository } from 'src/core/record/repositories/record.repository';
import { RecordService } from 'src/core/record/record.service';

@Module({
  providers: [UserResolver, UserRepository, UserService, UserRecordsResolver, RecordRepository, RecordService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
