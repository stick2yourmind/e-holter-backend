import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService,
    _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.getOrThrow('JWT_AUTH_SECRET'),
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    try {
      const user = await this._userService.findByEmail(payload);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
