import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateRecordInput {
  @Field(() => Float, { description: 'max pressure or systolic pressure' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  maxPressure: number;

  @Field(() => Float, { description: 'min pressure or diastolic pressure' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  minPressure: number;

  @Field(() => String, { description: 'record observations', nullable: true })
  @IsOptional()
  @IsString()
  observations?: string;
}
