import { $Enums, User } from '@prisma/client';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { RecordOutput } from './entities/record-ouput.entity';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/decorator/jwt.decorator';
import { Roles, RolesGuard } from 'src/auth/decorator/role.decorator';
import { ReqUser } from 'src/auth/decorator/user.decorator';
import { RecordOutputMapper } from 'src/core/record/mapper/record-output-mapper';

@Resolver(() => RecordOutput)
@UseGuards(JwtGuard, RolesGuard)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Mutation(() => RecordOutput, { name: 'createRecord' })
  async createRecord(
    @ReqUser() user: User,
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ): Promise<RecordOutput> {
    const record = await this.recordService.create(user.id, createRecordInput);
    return new RecordOutputMapper().mapEntityToDto(record);
  }

  @Roles($Enums.ROLE.ADMIN)
  @Query(() => [RecordOutput], { name: 'records' })
  async findAll(): Promise<RecordOutput[]> {
    const records = await this.recordService.findAll();
    return new RecordOutputMapper().mapEntitiesToDto(records);
  }

  @Roles($Enums.ROLE.ADMIN)
  @Query(() => RecordOutput, { name: 'record' })
  async findById(@Args('id', { type: () => Int }, ParseIntPipe) id: number): Promise<RecordOutput> {
    const record = await this.recordService.findById(id);
    return new RecordOutputMapper().mapEntityToDto(record);
  }

  @Roles($Enums.ROLE.ADMIN)
  @Mutation(() => RecordOutput, { name: 'updateRecord' })
  async updateRecord(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
  ): Promise<RecordOutput> {
    const record = await this.recordService.update(id, updateRecordInput);
    return new RecordOutputMapper().mapEntityToDto(record);
  }

  @Roles($Enums.ROLE.ADMIN)
  @Mutation(() => RecordOutput, { name: 'removeRecord' })
  async removeRecord(@Args('id', { type: () => Int }) id: number): Promise<RecordOutput> {
    const record = await this.recordService.remove(id);
    return new RecordOutputMapper().mapEntityToDto(record);
  }
}
