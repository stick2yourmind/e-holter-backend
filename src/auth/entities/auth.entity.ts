import { UserOutput } from './../../user/types/user-output';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'json web token' })
  token: string;

  @Field(() => UserOutput, { description: 'current user data' })
  user: UserOutput;
}
