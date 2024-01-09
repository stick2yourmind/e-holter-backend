import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('JWT_AUTH_SECRET'),
          signOptions: {
            expiresIn: configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'),
          },
        };
      },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, UserRepository, UserService],
  exports: [JwtStrategy],
})
export class AuthModule {}
