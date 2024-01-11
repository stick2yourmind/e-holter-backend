import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient<PrismaClientOptions, 'query' | 'error'> implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  constructor(private readonly _configService: ConfigService) {
    super({
      datasources: { db: { url: _configService.getOrThrow('DATABASE_URL') } },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      console.log('🚀 ~ PrismaService ~ this.$on ~ event:', event);
      this.logger.verbose(event.target);
    });

    this.$on('error', (event) => {
      this.logger.verbose(event.target);
    });
    await this.$connect();
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('error', async () => {
  //     await app.close();
  //   });
  // }
}
