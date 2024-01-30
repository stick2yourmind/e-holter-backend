import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
// only to success response, errors are thrown via exceptions
export class GenericResponse {
  @Field(() => String, { description: 'json web token' })
  success: string;
}
