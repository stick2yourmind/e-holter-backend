import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user password' })
  password: string;
}
