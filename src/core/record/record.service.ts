import { Injectable } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordRepository } from 'src/core/record/repositories/record.repository';
import { Prisma } from '@prisma/client';

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

  async update(recordId: number, updateRecordInput: UpdateRecordInput) {
    return await this._recordRepository.update(recordId, updateRecordInput);
  }

  async remove(recordId: number) {
    return await this._recordRepository.removeById(recordId);
  }
}
