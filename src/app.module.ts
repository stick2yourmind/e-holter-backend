import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { OrmModule } from 'src/db/orm/orm.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/core/user/user.module';
import { RecordModule } from 'src/core/record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrmModule,
    UserModule,
    AuthModule,
    RecordModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
        playground: false,
        plugins: configService.getOrThrow('NODE_END') !== 'PROD' ? [ApolloServerPluginLandingPageLocalDefault()] : [],
        formatError: (error) => {
          const originalError = error.extensions?.originalError as { message: any; error: string };

          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions?.code,
            };
          }
          return {
            message: originalError.message,
            code: originalError.error,
          };
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
