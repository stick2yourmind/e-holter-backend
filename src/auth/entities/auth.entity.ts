import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutput } from 'src/core/user/types/user-output';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'json web token' })
  token: string;

  @Field(() => UserOutput, { description: 'current user data' })
  user: UserOutput;
}
