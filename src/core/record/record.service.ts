import { Injectable } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordRepository } from 'src/core/record/repositories/record.repository';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RecordService {
  constructor(private readonly _recordRepository: RecordRepository) {}
  async create(userId: number, { maxPressure, minPressure, observations }: CreateRecordInput) {
    return await this._recordRepository.create({
      userId,
      maximum_pressure: new Prisma.Decimal(maxPressure),
      minimum_pressure: new Prisma.Decimal(minPressure),
      observations,
    });
  }

  async findAll() {
    return await this._recordRepository.findAll();
  }

  async findById(id: number) {
    return await this._recordRepository.findById(id);
  }

  async update(recordId: number, { maxPressure, minPressure, observations }: UpdateRecordInput) {
    const newData = { maximum_pressure: undefined, minimum_pressure: undefined, observations: undefined };

    if (maxPressure) {
      newData.maximum_pressure = new Decimal(maxPressure);
    }

    if (minPressure) {
      newData.minimum_pressure = new Decimal(minPressure);
    }

    if (observations) {
      newData.observations = observations;
    }

    return await this._recordRepository.update(recordId, newData);
  }

  async remove(recordId: number) {
    return await this._recordRepository.removeById(recordId);
  }
}
