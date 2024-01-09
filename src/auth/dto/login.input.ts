import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'user email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'user password' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
