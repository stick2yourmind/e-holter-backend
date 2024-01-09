import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
