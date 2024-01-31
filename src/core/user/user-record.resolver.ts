import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/decorator/jwt.decorator';
import { RolesGuard } from 'src/auth/decorator/role.decorator';
import { GetRecordsArg } from 'src/core/record/dto/get-records.argument';
import { RecordListOutput } from 'src/core/record/entities/record-list-ouput.entity';
import { RecordOutputMapper } from 'src/core/record/mapper/record-output-mapper';
import { RecordService } from 'src/core/record/record.service';
import { UserOutput } from 'src/core/user/types/user-output';

@Resolver(() => UserOutput)
@UseGuards(JwtGuard, RolesGuard)
export class UserRecordsResolver {
  constructor(private readonly _recordService: RecordService) {}

  @ResolveField('records', () => RecordListOutput)
  async findRecordsOfUser(@Parent() user: User, @Args() recordsArg: GetRecordsArg): Promise<RecordListOutput> {
    const { records, count } = await this._recordService.findAllByUserId(user.id, recordsArg);

    return { results: new RecordOutputMapper().mapEntitiesToDto(records), total: count };
  }
}
