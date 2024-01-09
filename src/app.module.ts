import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './db/orm/orm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrmModule,
    UserModule,
    AuthModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
