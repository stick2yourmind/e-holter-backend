import { Field, Int, ObjectType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@ObjectType({ description: 'user data' })
export class UserOutput {
  @Field(() => Int, { description: 'user id' })
  id: number;

  @Field(() => String, { description: 'user alias' })
  username: string;

  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user role' })
  roles: $Enums.ROLE;

  @Field(() => Boolean, { description: 'represents if user has validated its email' })
  isValidated: boolean;

  @Field(() => Date, { description: 'register date' })
  createdAt: Date;

  @Field(() => Date, { description: 'update date' })
  updatedAt: Date;
}
