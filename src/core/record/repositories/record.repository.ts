import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { PrismaService } from 'src/db/orm/orm.service';

@Injectable()
export class RecordRepository extends BaseRepository<Record> {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  async findById(id: number): Promise<Record> {
    return await this._prismaService.record.findFirstOrThrow({ where: { id } });
  }

  async findAll(): Promise<Record[]> {
    return await this._prismaService.record.findMany();
  }

  async create(data: {
    minimum_pressure: Decimal;
    maximum_pressure: Decimal;
    userId: number;
    observations?: string;
  }): Promise<Record> {
    const user = await this._prismaService.record.create({ data });
    return user;
  }

  async update(
    id: number,
    data: {
      minimum_pressure?: Decimal;
      maximum_pressure?: Decimal;
      observations?: string;
    },
  ): Promise<Record> {
    return await this._prismaService.record.update({ where: { id }, data });
  }

  async removeById(id: number): Promise<Record> {
    return await this._prismaService.record.delete({ where: { id } });
  }

  async findAllByUserId(userId: number): Promise<Record[]> {
    return await this._prismaService.record.findMany({ where: { userId } });
  }
}
