import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRecordInput {
  @Field(() => Float, { description: 'max pressure or systolic pressure', nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  maxPressure: number;

  @Field(() => Float, { description: 'min pressure or diastolic pressure', nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  minPressure: number;

  @Field(() => Int, { description: 'heart rate per minute' })
  @IsNumber()
  @IsPositive()
  heartRate: number;

  @Field(() => Date, { description: 'date on which the measurement was taken' })
  @IsDate()
  date: Date;

  @Field(() => String, { description: 'record observations', nullable: true })
  @IsOptional()
  @IsString()
  observations?: string;
}
