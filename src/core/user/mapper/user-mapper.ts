import { User } from '@prisma/client';
import { EntityDtoMapper } from 'src/utils/mapper';
import { UserOutput } from '../types/user-output';

export class UserMapper extends EntityDtoMapper<User, UserOutput> {
  mapEntityToDto(user: User): UserOutput {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      isValidated: user.isValidated,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
