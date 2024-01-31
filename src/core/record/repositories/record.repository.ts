import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { GetRecordsArg } from 'src/core/record/dto/get-records.argument';
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
    return await this._prismaService.record.findMany({
      orderBy: {
        date: 'desc',
      },
    });
  }

  async create(data: {
    minimumPressure: Decimal;
    maximumPressure: Decimal;
    heartRate: number;
    date: Date;
    userId: number;
    observations?: string;
  }): Promise<Record> {
    const user = await this._prismaService.record.create({ data });
    return user;
  }

  async update(
    id: number,
    data: {
      minimumPressure?: Decimal;
      maximumPressure?: Decimal;
      heartRate?: number;
      date?: Date;
      observations?: string;
    },
  ): Promise<Record> {
    return await this._prismaService.record.update({ where: { id }, data });
  }

  async removeById(id: number): Promise<Record> {
    return await this._prismaService.record.delete({ where: { id } });
  }

  async findAllByUserId(
    userId: number,
    { limit, offset }: GetRecordsArg,
  ): Promise<{ records: Record[]; count: number }> {
    const records = await this._prismaService.record.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      skip: offset,
      take: limit,
    });

    // Will be update when search by tag/commentary is included
    const count = await this._prismaService.record.count({
      where: { userId },
    });
    return { records, count };
  }
}
