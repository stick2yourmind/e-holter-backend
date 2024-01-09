import { Catch, ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: PrismaClientKnownRequestError): any {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException('not unique resource');
      }
      case 'P2003': {
        throw new UnprocessableEntityException('entity does not exist');
      }
      case 'P2025': {
        throw new NotFoundException('resource not found');
      }
      default:
        break;
    }

    return exception;
  }
}
