import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RecordOutput } from 'src/core/record/entities/record-ouput.entity';

@ObjectType({ description: 'record list model' })
export class RecordListOutput {
  @Field(() => [RecordOutput], { description: 'record list' })
  results: RecordOutput[];

  @Field(() => Int, { description: 'total records' })
  total: number;
}
