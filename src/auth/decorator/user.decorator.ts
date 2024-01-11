import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const graphQLContext = GqlExecutionContext.create(ctx);
  const { user } = graphQLContext.getContext().req;

  if (!user) {
    throw new UnauthorizedException('Credentials are required');
  }
  return user;
});
