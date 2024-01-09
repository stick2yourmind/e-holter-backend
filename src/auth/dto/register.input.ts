import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user password' })
  password: string;
}
