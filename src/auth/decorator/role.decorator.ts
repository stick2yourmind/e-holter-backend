import { $Enums, User } from '@prisma/client';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  CustomDecorator,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: $Enums.ROLE[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<$Enums.ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const graphQLContext = GqlExecutionContext.create(context);
    const { user }: { user: User } = graphQLContext.getContext().req;

    const hasAccess = requiredRoles.includes(user.roles);
    if (!user || !hasAccess) {
      throw new UnauthorizedException('Your profile does not have the required permissions');
    }
    return true;
  }
}
