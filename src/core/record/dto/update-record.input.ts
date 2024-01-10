import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

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

  @Field(() => String, { description: 'record observations', nullable: true })
  @IsOptional()
  @IsString()
  observations?: string;
}
