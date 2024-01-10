import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from 'src/core/user/user.resolver';

@Module({
  providers: [UserResolver, UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
