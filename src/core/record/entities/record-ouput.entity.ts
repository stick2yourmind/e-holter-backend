import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType({ description: 'record model' })
export class RecordOutput {
  @Field(() => Int, { description: 'record id' })
  id: number;

  @Field(() => Float, { description: 'max pressure or systolic pressure' })
  maxPressure: number;

  @Field(() => Float, { description: 'min pressure or diastolic pressure' })
  minPressure: number;

  @Field(() => Int, { description: 'heart rate per minute' })
  heartRate: number;

  @Field(() => Date, { description: 'date on which the measurement was taken' })
  date: Date;

  @Field(() => String, { description: "record's observations", nullable: true })
  observations?: string;

  @Field(() => Date, { description: 'register date' })
  createdAt: Date;

  @Field(() => Date, { description: 'update date' })
  updatedAt: Date;
}
