import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User, $Enums } from '@prisma/client';
import { JwtGuard } from 'src/auth/decorator/jwt.decorator';
import { Roles, RolesGuard } from 'src/auth/decorator/role.decorator';
import { ReqUser } from 'src/auth/decorator/user.decorator';
import { UserMapper } from 'src/core/user/mapper/user-mapper';
import { UserOutput } from 'src/core/user/types/user-output';
import { UserService } from 'src/core/user/user.service';

@Resolver(() => UserOutput)
@UseGuards(JwtGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Roles($Enums.ROLE.ADMIN)
  @Query(() => UserOutput, { name: 'userById' })
  async findById(@Args('id', { type: () => Int }, ParseIntPipe) id: number): Promise<UserOutput> {
    const user = await this._userService.findById(id);
    return new UserMapper().mapEntityToDto(user);
  }

  @Roles($Enums.ROLE.ADMIN)
  @Query(() => [UserOutput], { name: 'users' })
  async findAll(): Promise<UserOutput[]> {
    const users = await this._userService.findAll();
    return new UserMapper().mapEntitiesToDto(users);
  }

  @Query(() => UserOutput, { name: 'myUser' })
  findMe(@ReqUser() user: User): UserOutput {
    return new UserMapper().mapEntityToDto(user);
  }
}
