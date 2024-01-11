import { Injectable } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordRepository } from 'src/core/record/repositories/record.repository';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RecordService {
  constructor(private readonly _recordRepository: RecordRepository) {}

  async create(userId: number, { maxPressure, minPressure, heartRate, date, observations }: CreateRecordInput) {
    return await this._recordRepository.create({
      userId,
      maximumPressure: new Prisma.Decimal(maxPressure),
      minimumPressure: new Prisma.Decimal(minPressure),
      heartRate,
      date,
      observations,
    });
  }

  async findAll() {
    return await this._recordRepository.findAll();
  }

  async findById(id: number) {
    return await this._recordRepository.findById(id);
  }

  async update(recordId: number, { maxPressure, minPressure, heartRate, date, observations }: UpdateRecordInput) {
    const newData = {
      maximum_pressure: undefined,
      minimum_pressure: undefined,
      observations: undefined,
      heartRate: undefined,
      date: undefined,
    };

    if (maxPressure) {
      newData.maximum_pressure = new Decimal(maxPressure);
    }

    if (minPressure) {
      newData.minimum_pressure = new Decimal(minPressure);
    }

    if (observations) {
      newData.observations = observations;
    }

    if (heartRate) {
      newData.heartRate = heartRate;
    }

    if (date) {
      newData.date = date;
    }

    return await this._recordRepository.update(recordId, newData);
  }

  async remove(recordId: number) {
    return await this._recordRepository.removeById(recordId);
  }

  async findAllByUserId(userId: number) {
    return await this._recordRepository.findAllByUserId(userId);
  }
}
