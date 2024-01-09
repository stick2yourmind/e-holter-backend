import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly _configService: ConfigService) {
    super({ datasources: { db: { url: _configService.getOrThrow('DATABASE_URL') } } });
  }
}
