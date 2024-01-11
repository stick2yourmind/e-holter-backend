import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/decorator/jwt.decorator';
import { RolesGuard } from 'src/auth/decorator/role.decorator';
import { RecordOutput } from 'src/core/record/entities/record-ouput.entity';
import { RecordOutputMapper } from 'src/core/record/mapper/record-output-mapper';
import { RecordService } from 'src/core/record/record.service';
import { UserOutput } from 'src/core/user/types/user-output';

@Resolver(() => UserOutput)
@UseGuards(JwtGuard, RolesGuard)
export class UserRecordsResolver {
  constructor(private readonly _recordService: RecordService) {}

  @ResolveField('records', () => [RecordOutput])
  async findRecordsOfUser(@Parent() user: User): Promise<RecordOutput[]> {
    const records = await this._recordService.findAllByUserId(user.id);
    return new RecordOutputMapper().mapEntitiesToDto(records);
  }
}
