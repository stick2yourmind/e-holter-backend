import { Record } from '@prisma/client';
import { RecordOutput } from 'src/core/record/entities/record-ouput.entity';
import { EntityDtoMapper } from 'src/utils/mapper';

export class RecordOutputMapper extends EntityDtoMapper<Record, RecordOutput> {
  mapEntityToDto(record: Record): RecordOutput {
    return {
      id: record.id,
      createdAt: record.createdAt,
      maxPressure: Number(record.maximum_pressure),
      minPressure: Number(record.minimum_pressure),
      updatedAt: record.updatedAt,
      observations: record.observations,
    };
  }
}
